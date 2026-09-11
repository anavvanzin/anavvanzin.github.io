# Configuração DNS — Cloudflare → Flarum

## Cenário

- Domínio: `anavanzin.com` (já gerenciado no Cloudflare)
- Destino: fórum Flarum hospedado em um servidor com IP fixo
- Subdomínio recomendado: `forum.anavanzin.com`

---

## Passo 1: Obter o IP do servidor

Depois de contratar a hospedagem/VPS, o provedor te dará um **IP fixo**.

Exemplo: `192.0.2.100` (substitua pelo seu IP real)

---

## Passo 2: Registros DNS no Cloudflare

Acesse [dash.cloudflare.com](https://dash.cloudflare.com) → Domínio `anavanzin.com` → DNS → Records.

### Opção A: Fórum em subdomínio (RECOMENDADO)

Isso mantém `anavanzin.com` livre para site/blog futuro.

| Type | Name | Content | Proxy status | TTL |
|---|---|---|---|---|
| A | `forum` | `192.0.2.100` | Proxied | Auto |

Resultado: `forum.anavanzin.com` aponta para seu servidor, passando pelo proxy/CDN do Cloudflare.

### Opção B: Fórum na raiz (se não tiver outro site)

| Type | Name | Content | Proxy status | TTL |
|---|---|---|---|---|
| A | `@` | `192.0.2.100` | Proxied | Auto |

Resultado: `anavanzin.com` vai direto pro fórum.

⚠️ **Aviso:** se você já tem algo na raiz (GitHub Pages, etc.), ele vai parar de funcionar.

---

## Passo 3: SSL/TLS no Cloudflare

1. Cloudflare → `anavanzin.com` → SSL/TLS → Overview
2. Selecione mode: **Full (strict)**
   - Isso garante criptografia entre Cloudflare ↔ seu servidor
3. Ative:
   - ✅ Always Use HTTPS
   - ✅ Automatic HTTPS Rewrites

---

## Passo 4: Configurar SSL no servidor

### Shared hosting (Hostinger, etc.)

O painel já oferece SSL gratuito (Let's Encrypt) via um clique:
- cPanel → SSL/TLS → Let's Encrypt → selecione `forum.anavanzin.com` → Issue

### VPS (DigitalOcean, Hetzner)

```bash
# Instale Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Gere certificado
sudo certbot --nginx -d forum.anavanzin.com

# Teste renovação automática
sudo certbot renew --dry-run
```

---

## Passo 5: Configurar URL base no Flarum

No Admin do Flarum:
- Admin → Configurações Básicas → **Forum URL**
- Defina: `https://forum.anavanzin.com`

Ou via CLI no servidor:
```bash
cd /caminho/do/flarum
php flarum config:set forum_title "Quotes"
php flarum config:set base_url https://forum.anavanzin.com
php flarum cache:clear
```

---

## Passo 6: Regras úteis do Cloudflare (opcional)

### Page Rules (se plano permitir)

Crie regras para melhorar performance:

1. `forum.anavanzin.com/*`
   - Cache Level: Cache Everything
   - Edge Cache TTL: 2 hours
   - (Não aplique em /api/* — a API não deve ser cacheada)

2. `forum.anavanzin.com/api/*`
   - Cache Level: Bypass

### Firewall Rules

- Rate Limiting em `/api/token` (login) — 5 tentativas/minuto
- Desafio (JS Challenge) para países suspeitos (opcional)

---

## Verificação final

```bash
# Teste DNS
dig forum.anavanzin.com +short
# Deve retornar um IP do Cloudflare (não o IP raw do servidor)

# Teste HTTPS
curl -I https://forum.anavanzin.com
# Deve retornar HTTP 200 + headers Cloudflare
```

---

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| "DNS_PROBE_FINISHED_NXDOMAIN" | Registro A não propagou | Aguarde 5 min–2h; verifique se o record está orange-cloud (Proxied) |
| "SSL handshake failed" | Cloudflare em "Full" mas servidor sem certificado | Instale Let's Encrypt no servidor; mude Cloudflare para "Full (strict)" apenas depois |
| "Too many redirects" | Loop HTTP↔HTTPS | Certifique-se que o servidor redireciona HTTP→HTTPS e Cloudflare "Always Use HTTPS" está ativo |
| Fórum carrega sem CSS/JS | URL base do Flarum ainda em HTTP | Atualize `base_url` para `https://...` e limpe cache |
