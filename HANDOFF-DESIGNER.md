# Handoff — Landing Verus (Google Event)

Projeto **Next.js 16 + TypeScript + Tailwind CSS**. Página única em `/verus-google-event`.

## Rodar localmente
```bash
npm install
npm run dev      # abre em http://localhost:3000/verus-google-event
```
(Precisa de Node 18+.)

## Onde mexer na identidade visual

| O quê | Arquivo |
|---|---|
| **Cores / tokens** (magenta, roxo, mint, amarelo, creme, texto) | `tailwind.config.ts` → `theme.extend.colors` |
| **Estilos globais**: caixas brancas, sombra dura, botões, eyebrows, inputs | `src/app/globals.css` (bloco `@layer components`) |
| **Fundo de ondas** (contornos topográficos) | `public/bg-waves.svg` — gerado por `node scripts/generate-waves.mjs` (ajuste o campo de altura/opacidade lá dentro e rode de novo) |
| **Fonte** | Aconchego Text em `src/fonts/aconchego/` (carregada em `src/app/layout.tsx`) |
| **Seções** (conteúdo + layout) | `src/components/*.tsx` |

### Seções (ordem na página)
`Hero` → `ValueSection` → `ArchitectureSection` → `AudienceSection` → formulário (em `src/app/verus-google-event/page.tsx`) → `Footer`.

### Tema atual
Fundo **creme** + ondas magenta · **caixas brancas** com borda escura e **sombra dura** (`box-shadow: 6px 6px 0 #0e0a2e`) · eyebrows em magenta · palavras-chave em gradiente roxo→magenta (`.text-gradient`).

## ⚠️ Importante
- A fonte Aconchego aqui são os arquivos **"Test" (trial)**. Para produção, substituir pelos arquivos **licenciados** (mesmos nomes, em `src/fonts/aconchego/`).
- **Não** commitar `.env` / chaves. As variáveis necessárias (HubSpot) estão em `.env.example`.
- A integração HubSpot + deploy serão feitos depois (ver `README.md`).

## Build de produção (quando for o caso)
```bash
npm run build && npm start
```
