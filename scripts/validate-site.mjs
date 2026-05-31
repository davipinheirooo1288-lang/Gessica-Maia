import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const publicDir = "public";
const publicPath = (path) => join(publicDir, path);
const canonicalUrl = "https://gessica-maia.vercel.app/";
const whatsappUrl = "https://wa.me/5585988681475?text=Ol%C3%A1%2C%20Dra.%20Gessica.%20Vi%20seu%20site%20e%20gostaria%20de%20receber%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica.";

const html = readFileSync(publicPath("index.html"), "utf8");
const css = readFileSync(publicPath("styles.css"), "utf8");
const js = readFileSync(publicPath("script.js"), "utf8");
const robots = readFileSync(publicPath("robots.txt"), "utf8");
const sitemap = readFileSync(publicPath("sitemap.xml"), "utf8");

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const requiredAssets = [
  "assets/template-hero.webp",
  "assets/section-processo.webp",
  "assets/section-metodologia.webp",
  "assets/section-sobre.webp",
  "assets/section-direcionamento.webp",
  "assets/section-areas.webp",
  "assets/section-casos.webp",
  "assets/section-atendimento.webp",
  "assets/section-cuidado.webp",
  "assets/section-contato.webp",
  "assets/section-agendamento.webp",
  "assets/template-hero-mobile.webp",
  "assets/section-processo-mobile.webp",
  "assets/section-metodologia-mobile.webp",
  "assets/section-sobre-mobile.webp",
  "assets/section-direcionamento-mobile.webp",
  "assets/section-areas-mobile.webp",
  "assets/section-casos-mobile.webp",
  "assets/section-atendimento-mobile.webp",
  "assets/section-cuidado-mobile.webp",
  "assets/section-contato-mobile.webp",
  "assets/section-agendamento-mobile.webp",
  "assets/og-gessica-maia-advocacia.jpg",
  "assets/favicon.svg"
];

const requiredText = [
  "Gessica Maia Advocacia",
  "Gessica Maia Dantas",
  "OAB/CE nº 33.949",
  "Família, Sucessões e Imobiliário",
  "Advocacia humanizada para família, herança e patrimônio",
  "Sucessões e Inventários",
  "Direito Imobiliário",
  "Usucapião",
  "Planejamento Patrimonial Familiar e Sucessório",
  "Previdenciário/INSS",
  "Como funciona o atendimento",
  "Nossa metodologia de atuação",
  "Áreas de atuação",
  "Casos em que podemos ajudar",
  "Atendimento humanizado, estratégico e personalizado",
  "Cada caso exige escuta, estratégia e cuidado real",
  "Perguntas frequentes",
  "juridico@gessicamaiaadvocacia.com.br",
  "(85) 9 8868-1475",
  "www.gessicamaiaadvocacia.com.br",
  "Avenida Desembargador Moreira",
  "Segunda a sexta, das 8h às 18h"
];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]);
const parsedJsonLd = jsonLdBlocks.map((block) => JSON.parse(block));
const graphTypes = parsedJsonLd
  .flatMap((entry) => entry["@graph"] || [entry])
  .flatMap((node) => node["@type"] || []);

expect(html.includes(`<title>Gessica Maia Advocacia | Família, Sucessões e Imobiliário em Fortaleza</title>`), "Title SEO principal incorreto.");
expect(
  html.includes('content="Escritório de advocacia em Fortaleza/CE com atuação em Direito de Família, Sucessões, Inventários, Usucapião e Direito Imobiliário. Atendimento humanizado, estratégico e personalizado."'),
  "Meta description principal incorreta."
);
expect(html.includes(`<link rel="canonical" href="${canonicalUrl}">`), "Canonical deve apontar para a URL publicada.");
expect(html.includes('<meta name="robots" content="index, follow, max-image-preview:large">'), "Robots index/follow ausente.");
expect(html.includes('<meta property="og:url" content="https://gessica-maia.vercel.app/">'), "OG URL ausente.");
expect(html.includes('<meta property="og:image" content="https://gessica-maia.vercel.app/assets/og-gessica-maia-advocacia.jpg">'), "OG image absoluta ausente.");
expect(html.includes('<meta name="twitter:card" content="summary_large_image">'), "Twitter Card ausente.");
expect((html.match(/<h1\b/gi) || []).length === 1, "A página deve ter exatamente 1 H1 semântico.");
expect(html.includes('lang="pt-BR"'), "Idioma principal pt-BR ausente.");
expect(graphTypes.includes("LegalService"), "Schema LegalService ausente.");
expect(graphTypes.includes("Attorney"), "Schema Attorney ausente.");
expect(graphTypes.includes("LocalBusiness"), "Schema LocalBusiness ausente.");
expect(graphTypes.includes("FAQPage"), "Schema FAQPage ausente.");
expect(html.includes('"addressCountry": "BR"'), "Schema deve indicar Brasil.");
expect(html.includes('"legalName": "Gessica Maia Sociedade Individual de Advocacia"'), "Nome jurídico da sociedade ausente no schema.");
expect(html.includes('"value": "64.258.998/0001-01"'), "CNPJ da sociedade ausente no schema.");
expect(html.includes('"propertyID": "OAB/CE Sociedade"'), "OAB da sociedade ausente no schema.");
expect(html.includes('"latitude": -3.7374635'), "Latitude ausente no schema.");
expect(html.includes('"longitude": -38.4993171'), "Longitude ausente no schema.");

requiredText.forEach((text) => {
  expect(html.includes(text), `Texto obrigatório ausente: ${text}`);
});

requiredAssets.forEach((asset) => {
  expect(existsSync(publicPath(asset)), `Asset ausente: ${asset}`);
  expect(html.includes(asset) || asset.endsWith("favicon.svg") || asset.endsWith(".jpg"), `Asset não referenciado no HTML: ${asset}`);
});

const referencedAssets = [...html.matchAll(/assets\/[^"',\s]+/g)].map((match) => match[0]);
referencedAssets.forEach((asset) => {
  expect(existsSync(publicPath(asset)), `Asset referenciado no HTML não existe: ${asset}`);
});

expect((html.match(/class="template-section/g) || []).length === 11, "As 11 telas do template devem estar presentes.");
expect((html.match(/class="template-image"/g) || []).length === 11, "As 11 imagens do template devem estar presentes.");
expect((html.match(/class="[^"]*semantic-layer/g) || []).length >= 12, "Camadas semânticas principais e FAQ devem estar presentes.");
expect((html.match(new RegExp(escapeRegex(whatsappUrl), "g")) || []).length >= 20, "Todos os links de WhatsApp devem usar a mensagem aprovada.");
expect(!html.match(/href="https:\/\/wa\.me\/5585988681475\?text=(?!Ol%C3%A1%2C%20Dra\.%20Gessica\.)/), "Existe link de WhatsApp com mensagem antiga.");
expect(html.includes("instagram.com/gessicamaia.advocacia"), "Link de Instagram ausente.");
expect(html.includes("mailto:juridico@gessicamaiaadvocacia.com.br"), "Link de e-mail ausente.");
expect(html.includes("google.com/maps/place/Gessica+Maia+Advocacia"), "Link oficial do Google Maps ausente.");
expect(html.includes('decoding="async"'), "Imagens devem usar decoding async.");
expect((html.match(/<img[^>]+srcset="/g) || []).length === 11, "Imagens devem usar srcset responsivo.");
expect(html.includes('imagesrcset="assets/template-hero-mobile.webp 900w, assets/template-hero.webp 1491w"'), "Preload responsivo do hero ausente.");
expect((html.match(/loading="lazy"/g) || []).length === 10, "Imagens abaixo da primeira dobra devem usar lazy loading.");
expect(css.includes(".template-section"), "CSS deve preservar estrutura visual dos templates.");
expect(css.includes(".tap"), "CSS deve conter áreas clicáveis funcionais.");
expect(!css.includes("position: sticky"), "Não deve haver hero/header sticky.");
expect(css.includes(".motion-ready .template-section"), "Animações de entrada por seção ausentes.");
expect(css.includes("@keyframes tap-sheen"), "Animação premium de hover ausente.");
expect(css.includes("@media (prefers-reduced-motion: reduce)"), "Fallback de redução de movimento ausente.");
expect(!css.includes("100vw"), "CSS contém 100vw, risco de overflow horizontal.");
expect(!css.includes("::-webkit-scrollbar"), "Não deve haver customização de scrollbar.");
expect(html.includes('src="script.js" defer'), "Script de animação precisa estar carregado com defer.");
expect(js.includes("IntersectionObserver"), "Script deve usar IntersectionObserver para entrada sem bug.");
expect(js.includes("motion-ready"), "Script deve ativar classe motion-ready.");
expect(robots.includes("Sitemap: https://gessica-maia.vercel.app/sitemap.xml"), "robots.txt deve apontar para o sitemap.");
expect(sitemap.includes("<loc>https://gessica-maia.vercel.app/</loc>"), "sitemap.xml deve conter a URL canônica.");

if (failures.length) {
  console.error("Validação do site falhou:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Validação do site concluída com sucesso.");
