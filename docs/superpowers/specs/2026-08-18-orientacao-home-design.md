# Ficha de orientação na home

## Decisão

A home apresenta a orientação acadêmica como uma janela média de arquivo,
`orientação.txt`, e não como uma página institucional resumida. A rota
`/orientador/` permanece independente e não é alterada por esta decisão.

## Conteúdo e hierarquia

No desktop, a janela mede aproximadamente 470 px, abre à esquerda/centro acima
do dock e permanece menor que `projetos-vivos.app`. Seu conteúdo é fixo:

1. `ORIENTADOR · PPGD/UFSC`;
2. `Arno Dal Ri Júnior`;
3. “Orientador responsável pela pesquisa de doutorado Iconocracia.”;
4. uma única ação, `↗ conhecer o orientador`, para
   `https://anavanzin.com/arno-dal-ri-site/` na mesma aba;
5. `VÍNCULO ACADÊMICO · PPGD/UFSC`.

Não há CV, PDF, Lattes, foto, biografia paralela ou segunda chamada para ação.

## Comportamento

No desktop, a janela usa o gerenciador existente: abre ou vem para frente pelo
atalho, arrasta somente pela barra, minimiza para o dock e fecha por botão ou
Escape, com retorno de foco ao atalho. No mobile, o mesmo conteúdo é uma folha
de uma coluna, sem arraste nem sobreposição.

## Publicação e DNS

GitHub Pages é a origem canônica de `anavanzin.com`; o Worker permanece técnico.
Os subdomínios legados deverão ser Redirect Rules, não CNAMEs com caminhos:
`arnodalri.anavanzin.com` para `/arno-dal-ri-site/` e
`atlas.anavanzin.com` para `https://iconocracia.com/`. Essa operação só ocorre
após a rotação do segredo de Access exposto e a criação de um API Token restrito
no Chaveiro do macOS. O WAF não é alterado.
