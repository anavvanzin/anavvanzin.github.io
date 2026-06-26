# Design Spec: Perfil · Dossiê · Sobre — diferenciação de papéis e malha de navegação

**Date:** 2026-06-26
**Status:** Draft → Pending User Approval
**Project:** anavvanzin.com

## Overview

O site tem hoje **três páginas de "pessoa"** que se sobrepõem em propósito e se ignoram em navegação:

- `sobre.html` — bio narrativa (sistema editorial/Cabinet)
- `perfil.html` — cartão pessoal arrastável (sistema desktop, `vista`/`avnav`)
- `readme.html` — dossiê estilo GitHub-README (mesmo sistema desktop)

Dois problemas concretos:

1. **Colisão de identidade (SEO + unfurl).** `perfil.html` e `readme.html` enviam `<title>`, `description`, `og:title`, `og:description`, `twitter:title` e `twitter:description` **idênticos** (só `og:url` difere). Para buscadores e cards de link (WhatsApp, Telegram, Twitter) as duas páginas parecem a mesma — uma pode ser deduplicada para fora dos resultados.
2. **Malha quebrada.** `sobre.html` está órfã: nenhuma das três aponta para ela (só ela aponta para si mesma), e ela não aponta para `perfil` nem `readme`. As três foram *construídas* como pares, mas *navegam* como estranhas.

Este spec **não redesenha** nenhuma das páginas. Mantém os dois sistemas de design (editorial e desktop) e a prosa existente intactos. Resolve papel + metadados + cross-link.

## Decisão de modelo

**"Três pares iguais (desktop-OS)"** (escolha da Ana).

As três páginas são **peers de mesma hierarquia** na metáfora desktop-OS — três "faces" da mesma pessoa, cada uma um app/janela distinto, navegáveis como um conjunto. Nenhuma é "a principal"; o que muda é a *intenção* de cada uma e uma tira de cross-link consistente que as costura.

Rejeitado: fundir as duas páginas desktop (`perfil`+`readme`) numa só — a Ana quer manter os dois designs. Rejeitado: hierarquia (uma página "mãe" + sub-páginas) — contraria o modelo de pares iguais.

## Papéis (confirmados — já batem com o conteúdo existente)

| Página | Papel | Sistema de design | Conteúdo-âncora (já existe) |
|--------|-------|-------------------|------------------------------|
| `sobre.html` | **Bio narrativa** — quem é a Ana, em prosa | editorial / Cabinet (`ed-bar`) | 4 parágrafos bilíngues, retrato, formação/idiomas/canais |
| `readme.html` | **Dossiê acadêmico** — currículo, linhas de pesquisa, comunicações | desktop (file-tree) | linhas de pesquisa, formação, comunicações & traduções, links |
| `perfil.html` | **Cartão pessoal** — o "rosto" rápido + canais | desktop (card arrastável) | hero card, 3 linhas de pesquisa em resumo, dock Lattes/Instagram/Tumblr/email |

A reorganização é **só de nomenclatura + metadados + cross-link**. O conteúdo de cada página já corresponde ao seu papel; nada de prosa é reescrito.

## As 4 edições

### 1. `readme.html` → identidade "Dossiê"

- `<title>`: `Perfil · ana vanzin` → **`Dossiê · ana vanzin`**
- `meta name="description"`: foco dossiê acadêmico, ex.:
  `Dossiê acadêmico — linhas de pesquisa, formação e comunicações de Ana Vanzin (PPGD/UFSC).`
- `og:title` / `twitter:title`: `Dossiê · ana vanzin`
- `og:description` / `twitter:description`: mesma descrição de dossiê
- `og:url` já correto (`…/readme.html`) — sem mudança

A descrição atual ("linhas de pesquisa e canais") na verdade descreve **melhor** o readme do que o perfil — então o readme herda o foco "linhas de pesquisa", e o perfil migra para "canais/contato".

### 2. `perfil.html` → identidade "Cartão pessoal"

- `<title>`: **mantém** `Perfil · ana vanzin`
- `meta name="description"`: foco cartão pessoal/canais, ex.:
  `Ana Vanzin — advogada e historiadora do direito (PPGD/UFSC). Canais: Lattes, Instagram, Tumblr, e-mail.`
- `og:title` / `twitter:title`: `Perfil · ana vanzin` (mantém)
- `og:description` / `twitter:description`: nova descrição de canais
- `og:url` já correto (`…/perfil.html`)

Resultado: depois de (1)+(2), as três páginas têm `<title>` e `description` únicos. Colisão resolvida.

### 3. `sobre.html` → entra na malha (sem tocar a prosa)

- **Nenhuma mudança de conteúdo/prosa.** (Preservar a voz.)
- Única mudança: adicionar a tira de cross-link "perfis" (item 4) ao chrome editorial.

### 4. Tira de cross-link "perfis" nas três

Uma faixa curta e consistente, com o item atual em destaque:

```
sobre · perfil · dossiê
```

- `sobre` → `sobre.html`
- `perfil` → `perfil.html`
- `dossiê` → `readme.html`
- O item da página corrente é renderizado como **`<span>` não-clicável** (não como `<a>`), com classe de "ativo" e atributo `aria-current="page"`. Os outros dois são `<a href>`.

Posição por sistema de design (respeitando cada chrome, sem importar CSS de um para o outro):

- **`sobre.html`** (editorial/`ed-bar`): adicionar a tira no chrome editorial existente, estilo editorial.
- **`perfil.html`** e **`readme.html`** (desktop): substituir/estender o toggle atual `janela · readme` pela tira de três `sobre · perfil · dossiê`, estilo desktop.

> O markup é o mesmo conjunto de 3 links nas três páginas, mas **estilizado conforme o sistema local** (classes próprias de cada página). Não se cria um componente compartilhado novo nem se cruza CSS entre os dois sistemas — isso manteria o acoplamento baixo e respeitaria a decisão de "manter os dois designs".

## Estado atual vs. alvo (metadados)

| Tag | sobre.html | perfil.html (hoje) | readme.html (hoje) | perfil (alvo) | readme (alvo) |
|-----|-----------|--------------------|--------------------|---------------|---------------|
| `<title>` | `Sobre · …` ✓ | `Perfil · …` | `Perfil · …` ✗ | `Perfil · …` | **`Dossiê · …`** |
| `description` | distinta ✓ | "linhas de pesquisa e canais" | idêntica ✗ | **canais/contato** | **dossiê/linhas** |
| `og/twitter` | (ausentes) | conjunto = readme ✗ | conjunto = perfil ✗ | único | único |

## Cross-link: estado atual

- `sobre.html`: aponta só para si mesma (nav editorial). → órfã.
- `perfil.html`: `avnav` tem `perfil` (self) + `.more` → `readme.html`. Sem link p/ sobre.
- `readme.html`: toggle `janela`(→perfil) / `readme`(self) + file-tree `contato.md` → perfil. Sem link p/ sobre.

Depois das edições: as três se alcançam mutuamente pela tira "perfis".

## Out of scope (notas, não-edições)

- **`sobre.html` não tem tags `og:`/`twitter:`.** É uma lacuna de SEO menor, mas mexer nisso vai além de "só entrar na malha de cross-link". Fica registrado como melhoria opcional futura, **não** incluída neste PR salvo pedido explícito.
- Nenhuma reescrita de prosa em nenhuma das três páginas.
- Nenhuma mudança nos sistemas de design (editorial e desktop permanecem distintos e intactos).

## Scope & workflow

- **Scope:** PROJECT — clone canônico `~/Documents/GitHub/anavvanzin` (verificado: sincronizado com `origin/main`, divergência `0 0`).
- **Entrega:** branch → PR → merge → ff-sync (push direto no `main` é negado). Sem force-push, sem `Co-Authored-By`.
- **Render gate:** Playwright in-browser (desktop + mobile) nas três páginas antes do merge — confirmar que a tira renderiza, links resolvem, item corrente em destaque, sem overflow horizontal, console limpo.

## Success criteria

- [ ] `perfil.html` e `readme.html` têm `<title>`, `description`, `og:*`, `twitter:*` **únicos** (colisão resolvida)
- [ ] `readme.html` se apresenta como "Dossiê"; `perfil.html` como "Perfil/cartão"
- [ ] A tira `sobre · perfil · dossiê` aparece nas três, item corrente em destaque (`aria-current="page"`)
- [ ] As três se alcançam mutuamente; `sobre.html` não é mais órfã
- [ ] Prosa intacta nas três (voz preservada)
- [ ] Dois sistemas de design intactos (sem cruzar CSS)
- [ ] Render gate passa (desktop + mobile, 3 páginas)
