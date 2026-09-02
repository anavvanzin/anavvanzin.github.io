#!/usr/bin/env python3
"""
Importador ProBoards → Flarum
Usa apenas stdlib (urllib) — não precisa instalar nada.

Fluxo:
  1. Carrega forum-data.json extraído do ProBoards
  2. Cria usuários no Flarum (ou reutiliza existentes)
  3. Cria discussão com primeiro post
  4. Importa todos os posts restantes como replies
  5. Loga progresso e erros

Uso:
  python3 import_to_flarum.py --url https://forum.anavanzin.com \
    --token SEU_API_KEY --data ../scrape/output/forum-data.json \
    [--delay 1.5] [--tag-id 1]
"""

import argparse
import json
import sys
import time
import urllib.request
import urllib.error
import urllib.parse
from pathlib import Path
from datetime import datetime, timezone


def parse_args():
    p = argparse.ArgumentParser(description="Importa JSON do ProBoards para Flarum")
    p.add_argument("--url", required=True, help="URL base do fórum Flarum (ex: https://forum.anavanzin.com)")
    p.add_argument("--token", required=True, help="Token de API (API Key ou Access Token)")
    p.add_argument("--data", required=True, help="Caminho para forum-data.json")
    p.add_argument("--delay", type=float, default=1.5, help="Segundos entre requisições (padrão: 1.5)")
    p.add_argument("--tag-id", type=int, default=1, help="ID da tag/categoria no Flarum (padrão: 1)")
    p.add_argument("--user-id", type=int, default=1, help="userId para impersonação via API Key (padrão: 1 = Admin)")
    p.add_argument("--start-from", type=int, default=0, help="Índice do post para retomar (0 = do início)")
    p.add_argument("--dry-run", action="store_true", help="Simula sem enviar requisições")
    return p.parse_args()


class FlarumClient:
    def __init__(self, base_url: str, token: str, user_id: int, delay: float, dry_run: bool):
        self.base_url = base_url.rstrip("/")
        self.token = token
        self.user_id = user_id
        self.delay = delay
        self.dry_run = dry_run
        self.headers = {
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json",
            "Authorization": f"Token {token}; userId={user_id}",
        }
        self._last_request_time = 0

    def _request(self, method: str, endpoint: str, data: dict = None) -> dict:
        if self.dry_run:
            print(f"[DRY-RUN] {method} {endpoint} | payload keys: {list(data.keys()) if data else None}")
            return {"data": {"id": "dry-run", "attributes": {}}}

        # Rate limit simples
        elapsed = time.time() - self._last_request_time
        if elapsed < self.delay:
            time.sleep(self.delay - elapsed)

        url = f"{self.base_url}/api/{endpoint}"
        payload = json.dumps(data).encode("utf-8") if data else None
        req = urllib.request.Request(url, data=payload, headers=self.headers, method=method)

        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                self._last_request_time = time.time()
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            self._last_request_time = time.time()
            body = e.read().decode("utf-8")
            print(f"  ⚠️  HTTP {e.code}: {body[:200]}")
            raise
        except Exception as e:
            self._last_request_time = time.time()
            print(f"  ⚠️  Erro: {e}")
            raise

    def create_user(self, username: str, email: str, password: str = None, original_id: int = None) -> dict:
        """Cria usuário. Se já existir (409), retorna o existente."""
        if not password:
            password = f"changeme_{original_id or 0}_{int(time.time())}"

        payload = {
            "data": {
                "type": "users",
                "attributes": {
                    "username": username,
                    "email": email,
                    "password": password,
                }
            }
        }
        try:
            return self._request("POST", "users", payload)
        except urllib.error.HTTPError as e:
            if e.code == 409:
                # Usuário já existe — buscar
                print(f"  Usuário '{username}' já existe, buscando ID...")
                return self.find_user(username)
            raise

    def find_user(self, username: str) -> dict:
        """Busca usuário por username via endpoint /api/users."""
        # Tentativa via GET /api/users?filter[q]=username
        url = f"{self.base_url}/api/users?filter[q]={urllib.parse.quote(username)}"
        req = urllib.request.Request(url, headers={k: v for k, v in self.headers.items() if k != "Content-Type"})
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                if data.get("data"):
                    return {"data": data["data"][0]}
        except Exception as e:
            print(f"  Não foi possível buscar usuário '{username}': {e}")
        return {"data": {"id": str(self.user_id), "attributes": {"username": username}}}

    def create_discussion(self, title: str, content: str, tag_id: int, user_id: int = None) -> dict:
        payload = {
            "data": {
                "type": "discussions",
                "attributes": {
                    "title": title,
                    "content": content,
                },
                "relationships": {
                    "tags": {
                        "data": [{"type": "tags", "id": str(tag_id)}]
                    }
                }
            }
        }
        # Se a API Key não tem user_id fixo, usamos o header userId para impersonar
        # O payload de discussion não precisa de autor explícito — é inferido do auth
        return self._request("POST", "discussions", payload)

    def create_post(self, discussion_id: str, content: str, user_id: int = None) -> dict:
        payload = {
            "data": {
                "type": "posts",
                "attributes": {
                    "content": content,
                },
                "relationships": {
                    "discussion": {
                        "data": {"type": "discussions", "id": str(discussion_id)}
                    }
                }
            }
        }
        return self._request("POST", "posts", payload)


def timestamp_to_iso(ts_ms: int) -> str:
    if not ts_ms:
        return None
    return datetime.fromtimestamp(ts_ms / 1000, tz=timezone.utc).isoformat()


def normalize_username(name: str, seen: set, counter: dict) -> str:
    """Normaliza username para Flarum (a-z, 0-9, _, -). Garante unicidade."""
    if not name:
        name = "imported_user"
    # Remove acentos e caracteres inválidos
    import unicodedata
    name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode("ascii")
    name = "".join(c for c in name if c.isalnum() or c in "_-")
    name = name.strip("_-").lower()
    if not name:
        name = "user"
    if len(name) < 3:
        name = name + "_01"
    if len(name) > 25:
        name = name[:25]

    base = name
    suffix = 1
    while name in seen:
        suffix += 1
        name = f"{base}_{suffix}"
    seen.add(name)
    return name


def main():
    args = parse_args()

    # Carrega dados
    data_path = Path(args.data)
    if not data_path.exists():
        print(f"Erro: arquivo não encontrado: {data_path}")
        sys.exit(1)

    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    posts = data.get("posts", [])
    users_src = data.get("users", {})
    print(f"Dados carregados: {len(posts)} posts, {len(users_src)} usuários originais")

    # Cliente Flarum
    client = FlarumClient(args.url, args.token, args.user_id, args.delay, args.dry_run)

    # ── 1. Criar/mapear usuários ──
    print("\n=== CRIANDO USUÁRIOS ===")
    user_map = {}  # original_id → flarum_user_id
    seen_usernames = set()
    email_counter = {}

    for orig_id, uinfo in users_src.items():
        orig_id_int = int(orig_id)
        raw_name = uinfo.get("name") or f"user_{orig_id}"
        username = normalize_username(raw_name, seen_usernames, email_counter)
        email = f"{username}@imported.anavanzin.com"

        print(f"  Usuário orig={orig_id_int} → flarum='{username}' email={email}")
        try:
            resp = client.create_user(username, email, original_id=orig_id_int)
            flarum_id = resp.get("data", {}).get("id")
            user_map[orig_id_int] = flarum_id
            print(f"    ✅ Criado/Encontrado ID={flarum_id}")
        except Exception as e:
            print(f"    ❌ Falha: {e}")
            user_map[orig_id_int] = str(args.user_id)  # fallback para admin

    # Fallback para usuários não mapeados explicitamente nos posts
    for post in posts:
        aid = post.get("authorId")
        if aid and aid not in user_map:
            username = normalize_username(post.get("author") or f"user_{aid}", seen_usernames, email_counter)
            email = f"{username}@imported.anavanzin.com"
            print(f"  Usuário (do post) orig={aid} → flarum='{username}'")
            try:
                resp = client.create_user(username, email, original_id=aid)
                user_map[aid] = resp.get("data", {}).get("id", str(args.user_id))
            except Exception:
                user_map[aid] = str(args.user_id)

    # ── 2. Criar discussão ──
    print("\n=== CRIANDO DISCUSSÃO ===")
    thread_title = data.get("thread", {}).get("title", "Tópico Importado")
    first_post_content = posts[0]["bodyHtml"] if posts else "(importado)"

    try:
        disc_resp = client.create_discussion(thread_title, first_post_content, args.tag_id)
        discussion_id = disc_resp.get("data", {}).get("id")
        print(f"  ✅ Discussão criada: ID={discussion_id}")
    except Exception as e:
        print(f"  ❌ Falha ao criar discussão: {e}")
        sys.exit(1)

    # ── 3. Importar posts restantes ──
    print(f"\n=== IMPORTANDO POSTS ({args.start_from} → {len(posts)-1}) ===")
    log_path = Path(args.data).parent / "import-log.json"
    log = {
        "started_at": datetime.now(timezone.utc).isoformat(),
        "flarum_url": args.url,
        "discussion_id": discussion_id,
        "posts_total": len(posts),
        "posts_imported": 0,
        "posts_failed": [],
        "user_map": user_map,
    }

    for idx, post in enumerate(posts):
        if idx < args.start_from:
            continue

        # Primeiro post já é a discussão
        if idx == 0:
            log["posts_imported"] += 1
            continue

        content = post.get("bodyHtml") or post.get("bodyText") or ""
        if not content.strip():
            content = "(post vazio)"

        author_id = post.get("authorId")
        flarum_user = user_map.get(author_id, str(args.user_id))

        # Ajusta auth para o usuário correto
        client.user_id = int(flarum_user)
        client.headers["Authorization"] = f"Token {client.token}; userId={flarum_user}"

        print(f"  [{idx+1}/{len(posts)}] postId={post.get('postId')} author={post.get('author')} → ", end="", flush=True)
        try:
            resp = client.create_post(discussion_id, content)
            post_flarum_id = resp.get("data", {}).get("id")
            print(f"OK (flarum_id={post_flarum_id})")
            log["posts_imported"] += 1
        except Exception as e:
            print(f"FALHA: {e}")
            log["posts_failed"].append({
                "index": idx,
                "post_id": post.get("postId"),
                "error": str(e),
                "content_preview": content[:80],
            })

        # Salva log a cada 50 posts
        if idx % 50 == 0:
            with open(log_path, "w", encoding="utf-8") as f:
                json.dump(log, f, indent=2, ensure_ascii=False)

    # Log final
    log["finished_at"] = datetime.now(timezone.utc).isoformat()
    with open(log_path, "w", encoding="utf-8") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    print(f"\n=== IMPORTAÇÃO CONCLUÍDA ===")
    print(f"  Posts importados: {log['posts_imported']}/{len(posts)}")
    print(f"  Falhas: {len(log['posts_failed'])}")
    print(f"  Discussão: {args.url}/d/{discussion_id}")
    print(f"  Log: {log_path}")

    # Alerta sobre timestamps
    print("\n⚠️  NOTA SOBRE DATAS:")
    print("   Flarum registra a data de criação automaticamente no momento do import.")
    print("   Para preservar as datas originais do ProBoards, execute o SQL gerado em:")
    print(f"   {Path(args.data).parent / 'fix-timestamps.sql'}")


if __name__ == "__main__":
    # Garante que urllib.parse está disponível (stdlib)
    import urllib.parse
    main()
