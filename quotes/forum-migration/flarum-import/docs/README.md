# Guia de Deploy — Fórum Flarum em anavanzin.com

## O que você tem agora

- `forum-data.json` — todos os 1.636 posts extraídos do ProBoards
- `images/` — 36 imagens baixadas (7 falhas logadas)
- `import_to_flarum.py` — script de importação
- `fix_timestamps.py` — gera SQL para restaurar datas originais
- `docker-compose.yml` — ambiente de teste local (opcional)

---

## Passo 1: Escolher e contratar hospedagem

Requisitos mínimos do Flarum:
- PHP 8.1+
- MySQL 5.7+ ou MariaDB 10.2+
- Composer (CLI)
- SSH / terminal (para rodar o importador)

### Recomendações (junho 2026, preços aproximados)

| Provedor | Plano | Custo/mês | SSH/Composer? |
|---|---|---|---|
| **Hostinger** (Business) | Shared cPanel | ~R$ 25-35 | ✅ SSH + Composer |
| **UOL Host** | Cloud Sites | ~R$ 30-40 | ✅ SSH |
| **DigitalOcean** | VPS Droplet | ~$6 (R$30) | ✅ Full root |
| **Hetzner** | CX21 VPS | ~€4,51 (R$25) | ✅ Full root |

**Recomendação pessoal:** Hostinger Business Shared. Para 1 thread e postagem ocasional, shared hosting é suficiente, tem painel simples, e você não precisa ser sysadmin.

### O que fazer
1. Acesse hostinger.com.br (ou seu provedor de escolha)
2. Contrate plano com SSH + MySQL + PHP 8.1+
3. Anote: IP do servidor, usuário SSH, senha

---

## Passo 2: Instalar Flarum

### Via Hostinger (cPanel + Softaculous)
1. Login no cPanel → Softaculous Apps Installer
2. Procure "Flarum" → Install
3. Configure:
   - **URL:** `https://forum.anavanzin.com` (ou subdomínio que preferir)
   - **Admin user:** escolha username/senha (guarde!)
   - **Email admin:** use um email real seu
4. Clique Install
5. Anote: URL de admin, credenciais

### Via VPS (DigitalOcean/Hetzner) — se escolheu VPS
```bash
# SSH no servidor
ssh root@SEU_IP

# Instale Docker + Docker Compose (guia rápido)
curl -fsSL https://get.docker.com | sh

# Copie o docker-compose.yml deste projeto
# Edite FORUM_URL para https://forum.anavanzin.com
# Rode:
docker compose up -d
```

---

## Passo 3: Criar API Key no Flarum

O importador precisa de uma **API Key** (não de login/senha).

### Como criar (obrigatório — não há UI):

1. Acesse o banco de dados do Flarum (phpMyAdmin, Adminer, ou CLI):
   ```bash
   mysql -u USUARIO -p -e "USE flarum_db;"
   ```

2. Gere um token seguro:
   ```bash
   openssl rand -hex 32
   ```

3. Insira na tabela `api_keys`:
   ```sql
   INSERT INTO api_keys (`key`, user_id, created_at)
   VALUES ('TOKEN_GERADO_NO_PASSO_2', 1, NOW());
   ```
   - `user_id = 1` é geralmente o Admin.
   - Guarde esse token — ele é a "senha" do importador.

---

## Passo 4: Preparar os arquivos no servidor

1. **Upload do JSON e imagens:**
   ```bash
   # Do seu Mac, via scp
   scp -r ~/Projects/forum-migration/scrape/output forum@SEU_SERVIDOR:/home/forum/
   scp -r ~/Projects/forum-migration/flarum-import/scripts forum@SEU_SERVIDOR:/home/forum/
   ```

2. **Verifique estrutura no servidor:**
   ```
   /home/forum/
   ├── output/
   │   ├── forum-data.json
   │   ├── images/
   │   └── ...
   └── scripts/
       ├── import_to_flarum.py
       └── fix_timestamps.py
   ```

3. **Se necessário, instale Python 3** (geralmente já vem no servidor):
   ```bash
   python3 --version
   ```

---

## Passo 5: Rodar a importação

```bash
ssh forum@SEU_SERVIDOR
cd /home/forum/scripts

# DRY-RUN primeiro (simulação, não envia nada)
python3 import_to_flarum.py \
  --url https://forum.anavanzin.com \
  --token SEU_API_KEY \
  --data ../output/forum-data.json \
  --tag-id 1 \
  --user-id 1 \
  --delay 1.5 \
  --dry-run

# Se tudo parecer OK, rode de verdade:
python3 import_to_flarum.py \
  --url https://forum.anavanzin.com \
  --token SEU_API_KEY \
  --data ../output/forum-data.json \
  --tag-id 1 \
  --user-id 1 \
  --delay 1.5
```

**Tempo estimado:** ~40-60 minutos para 1.636 posts (com delay de 1.5s).

Se cair/falhar, retome com `--start-from N` onde N = último índice logado no `import-log.json`.

---

## Passo 6: Restaurar datas originais (SQL)

O Flarum grava `created_at` no momento da importação. Para preservar as datas originais do ProBoards:

```bash
# Gere o SQL
python3 fix_timestamps.py \
  --log ../output/import-log.json \
  --output ../output/fix-timestamps.sql

# Execute no banco (substitua credenciais)
mysql -h localhost -u USUARIO_FLARUM -p flarum_db < ../output/fix-timestamps.sql
```

---

## Passo 7: Configurar anavanzin.com no Cloudflare

### No painel Cloudflare (você faz):

1. **Crie um subdomínio** para o fórum (recomendado):
   - A Record: `forum` → aponta para IP do servidor
   - Ou CNAME: `forum` → aponta para domínio do servidor

2. **SSL/TLS:**
   - Mode: **Full (strict)**
   - Ative "Always Use HTTPS"

3. **Se quiser fórum na raiz** (`anavanzin.com` em vez de `forum.anavanzin.com`):
   - A Record: `@` → IP do servidor
   - Mas atenção: isso sobrescreve qualquer site atual na raiz.

### No servidor (via SSH):

1. Configure SSL/HTTPS no servidor (Let's Encrypt via Certbot):
   ```bash
   sudo certbot --nginx -d forum.anavanzin.com
   ```
   (ou configure no painel da hospedagem se usar shared)

2. No Flarum Admin → **Configurações Básicas**:
   - Forum Title: `Quotes` (ou nome que preferir)
   - Welcome Banner: opcional
   - Homepage: "All Discussions"

---

## Passo 8: Pós-importação

1. **Verifique a discussão:**
   Acesse `https://forum.anavanzin.com` e confira se a thread "Trechos" está com todos os posts.

2. **Atualize avatares (opcional):**
   Os avatares do ProBoards não foram baixados (CDN bloqueia). Você pode fazer upload manual no Flarum Admin → Users.

3. **Configure regras do fórum:**
   - Admin → Permissions: quem pode postar?
   - Admin → Tags: crie tags se quiser organizar futuro

4. **Backup:**
   Configure backup automático do banco na hospedagem (ou script cron).

---

## Troubleshooting

| Problema | Solução |
|---|---|
| "HTTP 401" no importador | Token de API incorreto ou API Key não criada no banco |
| "HTTP 429" (rate limit) | Aumente `--delay` para 2.0 ou 3.0 |
| Posts vazios no meio da thread | São reais do ProBoards (apagados/placeholder). O importador os preserva como "(post vazio)" |
| Imagens quebradas | 7 imagens do Facebook/Twitter expiraram. Re-upload manual ou deixe como está |
| Timestamps não restauraram | Verifique se o SQL foi executado no banco correto e se `discussion_id` bate com o log |

---

## Arquivos do projeto

```
~/Projects/forum-migration/
├── scrape/output/
│   ├── forum-data.json          ← dados extraídos
│   ├── images/                  ← imagens baixadas
│   ├── image-manifest.json      ← log de falhas
│   └── page-NNN.json            ← backups parciais (66 arquivos)
└── flarum-import/
    ├── scripts/
    │   ├── import_to_flarum.py  ← importador
    │   └── fix_timestamps.py    ← gera SQL de datas
    ├── docker/
    │   └── docker-compose.yml   ← teste local
    └── docs/
        └── README.md            ← este arquivo
```

---

## Resumo: checklist de ações SÓ SUA

- [ ] Contratar hospedagem PHP/MySQL
- [ ] Instalar Flarum (Softaculous ou Docker)
- [ ] Criar API Key no banco de dados
- [ ] Upload dos arquivos para o servidor
- [ ] Rodar importador + SQL de timestamps
- [ ] Configurar DNS no Cloudflare
- [ ] Configurar SSL (Let's Encrypt)
- [ ] Verificar fórum e ajustar permissões

**Eu fiz o resto.** 💜
