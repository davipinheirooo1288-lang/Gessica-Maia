# Gessica Maia Advocacia

Landing page estatica da Gessica Maia Advocacia, montada para preservar a identidade visual dos templates originais e deixar os CTAs funcionais.

## Estrutura

- `index.html`: pagina principal com as 11 secoes do template, SEO semantico e links funcionais.
- `styles.css`: responsividade, areas clicaveis, animacoes de entrada e hover.
- `script.js`: controle das animacoes de entrada com `IntersectionObserver`.
- `assets/`: imagens finais otimizadas usadas pela landing page, favicon e imagem Open Graph.
- `docs/template-original/`: PNGs originais usados como referencia visual.
- `scripts/validate-site.mjs`: validacao local do site.

## Validar

```bash
npm run lint
```

## Publicacao

Projeto estatico. Na Vercel, use a configuracao padrao:

- Framework Preset: `Other`
- Build Command: `npm run build`
- Output Directory: `.`
