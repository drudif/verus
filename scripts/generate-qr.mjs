/**
 * Gera o QR Code da landing em PNG e SVG.
 *
 * Uso:
 *   node scripts/generate-qr.mjs                      # usa NEXT_PUBLIC_LANDING_PAGE_URL (.env.local) ou fallback
 *   node scripts/generate-qr.mjs https://url-final    # passa a URL diretamente
 *
 * Saída:
 *   public/qr/verus-google-event-qr.png
 *   public/qr/verus-google-event-qr.svg
 */
import QRCode from "qrcode";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "qr");
const PNG = join(OUT_DIR, "verus-google-event-qr.png");
const SVG = join(OUT_DIR, "verus-google-event-qr.svg");

const FALLBACK = "https://convert.com.br/verus-google-event";

async function readEnvUrl() {
  for (const file of [".env.local", ".env"]) {
    const p = join(ROOT, file);
    if (!existsSync(p)) continue;
    const txt = await readFile(p, "utf8");
    const m = txt.match(/^\s*NEXT_PUBLIC_LANDING_PAGE_URL\s*=\s*(.+)\s*$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  return undefined;
}

async function main() {
  const url =
    process.argv[2] ||
    process.env.NEXT_PUBLIC_LANDING_PAGE_URL ||
    (await readEnvUrl()) ||
    FALLBACK;

  if (url === FALLBACK) {
    console.warn(
      "⚠  Usando URL de fallback. Defina NEXT_PUBLIC_LANDING_PAGE_URL no .env.local " +
        "ou passe a URL: node scripts/generate-qr.mjs https://sua-url-final"
    );
  }

  await mkdir(OUT_DIR, { recursive: true });

  const opts = {
    errorCorrectionLevel: "H", // alta correção — robusto pra impressão/telão
    margin: 2,
    color: { dark: "#0A0A12", light: "#FFFFFF" },
  };

  await QRCode.toFile(PNG, url, { ...opts, type: "png", width: 1024 });
  const svg = await QRCode.toString(url, { ...opts, type: "svg", width: 1024 });
  await writeFile(SVG, svg, "utf8");

  console.log("✓ QR Code gerado para:", url);
  console.log("  •", PNG);
  console.log("  •", SVG);
}

main().catch((err) => {
  console.error("Erro ao gerar QR Code:", err);
  process.exit(1);
});
