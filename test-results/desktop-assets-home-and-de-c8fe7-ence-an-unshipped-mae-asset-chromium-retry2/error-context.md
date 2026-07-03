# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: desktop-assets.spec.js >> home and desktop do not reference an unshipped mae asset
- Location: tests/desktop-assets.spec.js:3:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('a.icon[href="/assets/mae.jpg"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('a.icon[href="/assets/mae.jpg"]')
    24 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - dialog "Abertura" [ref=e2]:
    - paragraph [ref=e3]: Martírios e Delírios
    - generic [ref=e4]: ANA VANZIN
    - paragraph [ref=e5]: Iconocracia · Mesa
    - button "Entrar" [ref=e8] [cursor=pointer]
  - banner [ref=e9]:
    - generic [ref=e10]: ANA VANZIN
    - navigation "Navegação" [ref=e11]:
      - link "Sobre" [ref=e12]:
        - /url: /sobre.html
      - link "Tese" [ref=e13]:
        - /url: /iconocracia/
      - link "Conceitos" [ref=e14]:
        - /url: /conceitos.html
      - link "Perfis" [ref=e15]:
        - /url: /publicacoes/
      - link "Manifesto" [ref=e16]:
        - /url: /manifesto/
      - link "Contato" [ref=e17]:
        - /url: mailto:anavvanzin@outlook.com
    - group "Idioma / Language" [ref=e18]:
      - button "PT" [pressed] [ref=e19] [cursor=pointer]
      - button "EN" [ref=e20] [cursor=pointer]
    - generic [ref=e21]: 17:46
  - img "ana vanzin.com" [ref=e24]
  - generic [ref=e25]:
    - generic [ref=e26]: ❧
    - paragraph [ref=e27]:
      - generic [ref=e28]:
        - generic [ref=e29]: verdade
        - generic [ref=e30]: no direito e no vinho
      - generic [ref=e31]:
        - generic [ref=e32]: liberdade
        - generic [ref=e33]: na vida e na escrita
    - paragraph [ref=e34]: truth in law and in wine · liberty in life and in writing
  - main [ref=e35]:
    - generic [ref=e36]:
      - generic [ref=e37]:
        - heading "Identidade" [level=2] [ref=e38]
        - generic [ref=e39]:
          - link "sobre.txt" [ref=e40]:
            - /url: /sobre.html
            - generic [ref=e42]: sobre.txt
          - link "perfil.card" [ref=e43]:
            - /url: /perfil.html
            - generic [ref=e45]: perfil.card
          - link "currículo" [ref=e46]:
            - /url: /readme.html
            - generic [ref=e48]: currículo
      - generic [ref=e49]:
        - heading "Pesquisa" [level=2] [ref=e50]
        - generic [ref=e51]:
          - link "iconocracia" [ref=e52]:
            - /url: /iconocracia/
            - generic [ref=e54]: iconocracia
          - link "atlas" [ref=e55]:
            - /url: /atlas/
            - generic [ref=e57]: atlas
          - link "radiografia" [ref=e58]:
            - /url: /iconocracia/radiografia/
            - generic [ref=e60]: radiografia
          - link "marginália" [ref=e61]:
            - /url: /marginalia/
            - generic [ref=e63]: marginália
          - link "publicações" [ref=e64]:
            - /url: /publicacoes/
            - generic [ref=e66]: publicações
          - link "sala de leitura" [ref=e67]:
            - /url: /sala-de-leitura/
            - generic [ref=e69]: sala de leitura
          - link "conceitos" [ref=e70]:
            - /url: /conceitos.html
            - generic [ref=e72]: conceitos
          - link "metodologia" [ref=e73]:
            - /url: /metodologia/
            - generic [ref=e75]: metodologia
          - link "pôsteres" [ref=e76]:
            - /url: /poster.html
            - generic [ref=e78]: pôsteres
      - generic [ref=e79]:
        - heading "Outros" [level=2] [ref=e80]
        - generic [ref=e81]:
          - link "trabalhos" [ref=e82]:
            - /url: /trabalhos.html
            - generic [ref=e84]: trabalhos
          - link "citações" [ref=e85]:
            - /url: /quotes/
            - generic [ref=e87]: citações
          - link "advocacia" [ref=e88]:
            - /url: /advocacia.html
            - generic [ref=e90]: advocacia
          - link "desktop.app" [ref=e91]:
            - /url: /mesa/
            - generic [ref=e93]: desktop.app
          - link "ampulheta.app" [ref=e94]:
            - /url: /ampulheta.html
            - img [ref=e96]
            - generic [ref=e106]: ampulheta.app
          - link "justitia.png" [ref=e107]:
            - /url: /assets/pixel-justitia-sky.png
            - generic [ref=e109]: justitia.png
          - link "mãe.jpg" [ref=e110]:
            - /url: /assets/mae.jpg
            - generic [ref=e112]: mãe.jpg
      - generic [ref=e113]:
        - heading "Novos" [level=2] [ref=e114]
        - generic [ref=e115]:
          - link "manifesto" [ref=e116]:
            - /url: /manifesto/
            - generic [ref=e118]: manifesto
          - link "apresentação" [ref=e119]:
            - /url: /apresentacao/
            - generic [ref=e121]: apresentação
          - link "vídeo" [ref=e122]:
            - /url: /video/
            - generic [ref=e124]: vídeo
      - paragraph [ref=e125]: clique num ícone para abrir · ou explore a tese no painel ao lado
    - complementary "Justitia — manuscrito iluminado" [ref=e126]:
      - paragraph [ref=e127]: Iustitia · iluminura
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test('home and desktop do not reference an unshipped mae asset', async ({ page }) => {
  4  |   await page.goto('/');
> 5  |   await expect(page.locator('a.icon[href="/assets/mae.jpg"]')).toHaveCount(0);
     |                                                                ^ Error: expect(locator).toHaveCount(expected) failed
  6  |   await expect(page.locator('img[src="/assets/mae.jpg"]')).toHaveCount(0);
  7  | 
  8  |   await page.goto('/landing/');
  9  |   await expect(page.locator('a.icon[href="/assets/mae.jpg"]')).toHaveCount(0);
  10 | 
  11 |   await page.addInitScript(() => { localStorage.setItem('av_booted', '1'); });
  12 |   await page.goto('/mesa/');
  13 |   const enterBtn = page.locator('button', { hasText: /entrar/i });
  14 |   if (await enterBtn.isVisible()) {
  15 |     await enterBtn.click();
  16 |   }
  17 |   await expect(page.locator('button', { hasText: /^mãe\.jpg$/i })).toHaveCount(0);
  18 | });
  19 | 
```