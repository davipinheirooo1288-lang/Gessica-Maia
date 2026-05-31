import { existsSync, readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const js = readFileSync("script.js", "utf8");

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
  "assets/og-gessica-maia-advocacia.jpg",
  "assets/favicon.svg"
];

const requiredText = [
  "Gessica Maia Advocacia",
  "Gessica Maia Dantas",
  "OAB/CE nº 33.949",
  "Família, Sucessões e Imobiliário",
  "Como funciona o atendimento",
  "Nossa metodologia de atuação",
  "Áreas de atuação",
  "Casos em que podemos ajudar",
  "Atendimento humanizado, estratégico e personalizado",
  "Cada caso exige escuta, estratégia e cuidado real",
  "juridico@gessicamaiaadvocacia.com.br",
  "(85) 9 8868-1475",
  "www.gessicamaiaadvocacia.com.br",
  "Avenida Desembargador Moreira",
  "Segunda a sexta, das 8h às 18h"
];

expect((html.match(/<h1\b/gi) || []).length === 1, "A página deve ter exatamente 1 H1 semântico.");
expect(html.includes('lang="pt-BR"'), "Idioma principal pt-BR ausente.");
expect(html.includes('"@type": "LegalService"'), "Schema LegalService ausente.");
expect(html.includes('"addressCountry": "BR"'), "Schema deve indicar Brasil.");
expect(html.includes('"legalName": "Gessica Maia Sociedade Individual de Advocacia"'), "Nome jurídico da sociedade ausente no schema.");
expect(html.includes('"value": "64.258.998/0001-01"'), "CNPJ da sociedade ausente no schema.");
expect(html.includes('"propertyID": "OAB/CE Sociedade"'), "OAB da sociedade ausente no schema.");

requiredText.forEach((text) => {
  expect(html.includes(text), `Texto obrigatório ausente: ${text}`);
});

requiredAssets.forEach((asset) => {
  expect(existsSync(asset), `Asset ausente: ${asset}`);
  expect(html.includes(asset) || asset.endsWith("favicon.svg") || asset.endsWith(".jpg"), `Asset não referenciado no HTML: ${asset}`);
});

const referencedAssets = [...html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map((match) => match[1]);
referencedAssets.forEach((asset) => {
  expect(existsSync(asset), `Asset referenciado no HTML não existe: ${asset}`);
});

expect((html.match(/class="template-section/g) || []).length === 11, "As 11 telas do template devem estar presentes.");
expect((html.match(/class="template-image"/g) || []).length === 11, "As 11 imagens do template devem estar presentes.");
expect((html.match(/class="semantic-layer"/g) || []).length === 11, "Cada tela precisa de camada semântica.");
expect((html.match(/https:\/\/wa\.me\/5585988681475/g) || []).length >= 20, "Links de WhatsApp insuficientes.");
expect(html.includes("instagram.com/gessicamaia.advocacia"), "Link de Instagram ausente.");
expect(html.includes("mailto:juridico@gessicamaiaadvocacia.com.br"), "Link de e-mail ausente.");
expect(html.includes("google.com/maps/place/Gessica+Maia+Advocacia"), "Link oficial do Google Maps ausente.");
expect(css.includes(".template-section"), "CSS deve preservar estrutura visual dos templates.");
expect(css.includes(".tap"), "CSS deve conter áreas clicáveis funcionais.");
expect(!css.includes("position: sticky"), "Não deve haver hero/header sticky.");
expect(css.includes(".motion-ready .template-section"), "Animações de entrada por seção ausentes.");
expect(css.includes("@keyframes tap-sheen"), "Animação premium de hover ausente.");
expect(css.includes("@media (prefers-reduced-motion: reduce)"), "Fallback de redução de movimento ausente.");
expect(!css.includes("100vw"), "CSS contém 100vw, risco de overflow horizontal.");
expect(html.includes('src="script.js" defer'), "Script de animação precisa estar carregado com defer.");
expect(js.includes("IntersectionObserver"), "Script deve usar IntersectionObserver para entrada sem bug.");
expect(js.includes("motion-ready"), "Script deve ativar classe motion-ready.");

if (failures.length) {
  console.error("Validação do site falhou:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Validação do site concluída com sucesso.");
