# Verus · Landing Google Event — Convert

Landing page de captação de leads para o **Verus** (apresentado como case no evento do Google). Página executiva, escura e premium, otimizada para mobile (a maioria dos acessos vem do QR Code no telão) e integrada ao **HubSpot**.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS
- **Página:** `/verus-google-event` (a raiz `/` redireciona para lá)
- **Preview do QR:** `/qr-preview`
- **Rota server-side do lead:** `/api/hubspot-lead`

---

## 1. Rodar localmente

```bash
# 1. instalar dependências
npm install

# 2. configurar variáveis
cp .env.example .env.local
#    edite .env.local com seus dados do HubSpot (passo 2)

# 3. subir em desenvolvimento
npm run dev
# abre http://localhost:3000  → redireciona para /verus-google-event
```

Outros comandos:

```bash
npm run build      # build de produção
npm start          # sobe o build
npm run typecheck  # checagem de tipos
npm run qr         # gera o QR Code (PNG + SVG)
```

---

## 2. Configurar HubSpot (Portal ID e Form ID)

No `.env.local`:

```bash
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=12345678
NEXT_PUBLIC_HUBSPOT_FORM_ID=00000000-0000-0000-0000-000000000000
NEXT_PUBLIC_HUBSPOT_REGION=na1        # na1 (EUA) ou eu1 (Europa)
NEXT_PUBLIC_HUBSPOT_TRACKING_ID=12345678   # geralmente = Portal ID
NEXT_PUBLIC_LANDING_PAGE_URL=https://seu-dominio.com.br/verus-google-event
```

**Onde achar:**

- **Portal ID** — canto inferior do HubSpot, ou na URL `app.hubspot.com/contacts/<PORTAL_ID>/`.
- **Form ID (GUID)** — **Marketing → Forms**, crie/abra o formulário, em **Share → Embed** o GUID aparece no código (`formId: "..."`).
- **Region** — `na1` para contas padrão; `eu1` se sua conta é hospedada na Europa.

### Como os leads chegam no CRM

O formulário **customizado** (visual premium, padrão) envia para a rota segura `/api/hubspot-lead`, que por sua vez chama a **Forms Submissions API** do HubSpot (`/submissions/v3/integration/submit/{portalId}/{formId}`). Esse endpoint é vinculado ao par portal/form e **não exige token** — por isso nenhum segredo trafega no front-end. O lead cria/enriquece o contato, dispara workflows do form e associa o tracking (cookie `hubspotutk`).

### Propriedades de contato necessárias no HubSpot

Os campos padrão já existem (`firstname`, `lastname`, `email`, `company`, `jobtitle`, `phone`, `website`, `lifecyclestage`). **Crie estas propriedades de contato** (Settings → Properties → Create property) para que todos os campos sejam aceitos:

| Propriedade (internal name) | Tipo sugerido | Uso |
|---|---|---|
| `area_de_interesse` | Dropdown / texto | Área de interesse escolhida |
| `desafio_dados_ia` | Texto multilinha | Campo aberto opcional |
| `lead_source` | Texto / dropdown | `Evento Google` |
| `conversion_event` | Texto | `Google Event - Verus Case` |
| `product_interest` | Texto / dropdown | `Verus` |
| `campaign_name` | Texto | `verus_google_event` |
| `page_origin` | Texto | URL de origem |
| `utm_source` `utm_medium` `utm_campaign` `utm_term` `utm_content` | Texto | UTMs preservadas |

> Se uma propriedade não existir, a Submissions API rejeita o envio com uma mensagem indicando o campo. Crie as que faltarem (ou remova o campo do `getHiddenFields()` / do form se não quiser usar). Os UTMs também são captados nativamente pelo HubSpot via tracking code, mas gravá-los como propriedades facilita filtrar os contatos do evento.

### Filtrar os contatos do evento depois

Crie uma lista/visão filtrando por `conversion_event = "Google Event - Verus Case"` (ou `campaign_name = verus_google_event`). Todos os leads do evento cairão lá.

### Alternativa: embed oficial do HubSpot

Se preferir o formulário renderizado pelo próprio HubSpot (configurado lá dentro), defina:

```bash
NEXT_PUBLIC_HUBSPOT_USE_EMBED=true
```

A página passa a renderizar o embed v2 oficial (componente `HubSpotEmbedForm`), com um tema escuro aproximado (`.hs-themed`). Os campos ocultos/UTMs são injetados via `onFormReady` — eles **precisam existir como campos ocultos no form configurado no HubSpot**. Trade-off: menos controle visual que o formulário customizado (recomendado para a estética premium).

### (Opcional) CRM API com token privado

Só é necessário se você quiser criar contatos direto pela CRM API em vez da Forms API. Crie uma **Private App** (Settings → Integrations → Private Apps) com escopo `crm.objects.contacts.write`, e defina **somente server-side**:

```bash
HUBSPOT_PRIVATE_APP_TOKEN=pat-xxxx   # NUNCA com prefixo NEXT_PUBLIC
```

A rota `/api/hubspot-lead` já isola qualquer segredo no servidor. O fluxo padrão (Forms API) não precisa disso.

---

## 3. Gerar o QR Code

O QR aponta para `NEXT_PUBLIC_LANDING_PAGE_URL`.

```bash
# usando a URL do .env.local
npm run qr

# ou passando a URL final diretamente
node scripts/generate-qr.mjs https://seu-dominio.com.br/verus-google-event
```

Saída:

- `public/qr/verus-google-event-qr.png` (1024px, alta correção de erro)
- `public/qr/verus-google-event-qr.svg` (vetorial, para impressão/telão)

Preview navegável em **`/qr-preview`** (com botões de download).

---

## 4. Publicar a página

Estático/SSR em Next.js — recomendado **Vercel** (a Convert já usa) ou Netlify.

**Vercel:**
1. Suba o repositório no GitHub e importe em vercel.com, **ou** `npx vercel` na pasta.
2. Em **Project → Settings → Environment Variables**, replique as variáveis do `.env.local`.
3. Deploy. Configure o domínio final (ex.: `assessment.convert.com.br` ou um path no domínio de vocês).
4. **Importante:** após saber a URL final, atualize `NEXT_PUBLIC_LANDING_PAGE_URL` e rode `npm run qr` de novo para o QR apontar para o endereço definitivo.

---

## 5. Testar o envio do formulário

1. `npm run dev` com `.env.local` preenchido.
2. Acesse `http://localhost:3000/verus-google-event?utm_source=teste&utm_medium=qr&utm_campaign=verus_google_event`.
3. Preencha e envie. Deve aparecer a tela de sucesso ("Recebemos seu contato").
4. Se der erro, a mensagem do HubSpot aparece no formulário (ex.: propriedade inexistente) — crie a propriedade indicada.

---

## 6. Validar se o lead entrou no HubSpot

1. **Contacts → Contacts**: o contato deve aparecer/atualizar com nome, e-mail, empresa, cargo etc.
2. Abra o contato e confira as propriedades `area_de_interesse`, `lead_source`, `conversion_event`, `campaign_name`, `page_origin` e os `utm_*`.
3. **Marketing → Forms → [seu form] → Submissions**: o envio deve constar na lista.
4. Para o tracking de origem (UTMs nativos), confirme que `NEXT_PUBLIC_HUBSPOT_TRACKING_ID` está setado — o script de analytics grava a sessão com as UTMs.

---

## Estrutura

```
src/
  app/
    layout.tsx                 # metadata/SEO/OG, fontes, tracking code
    page.tsx                   # redireciona / → /verus-google-event
    globals.css                # design system (dark premium, azul/magenta)
    icon.svg                   # favicon
    verus-google-event/page.tsx
    qr-preview/page.tsx
    api/hubspot-lead/route.ts  # envio server-side → HubSpot Forms API
  components/
    Hero.tsx
    ValueSection.tsx
    ArchitectureSection.tsx
    AudienceSection.tsx
    HubSpotForm.tsx            # form customizado (padrão)
    HubSpotEmbedForm.tsx       # embed oficial (toggle)
    NodeGraph.tsx              # abstração visual de dados
    Footer.tsx
  lib/
    utm.ts                     # UTMs, cookie hutk, campos ocultos
    hubspot.ts                 # helpers de endpoint/região
scripts/
  generate-qr.mjs              # gera PNG + SVG do QR
public/
  og.svg                       # imagem de compartilhamento social
  qr/                          # QR gerado (após npm run qr)
```

---

## Critérios de aceite — checklist

- [x] Página abre sem erros e é 100% responsiva (mobile-first).
- [x] CTA visível no primeiro fold (hero) levando ao formulário.
- [x] Formulário simples, objetivo e com validação.
- [x] Envio cria/enriquece contato no HubSpot (Forms Submissions API).
- [x] UTMs e campos ocultos preservados e enviados.
- [x] QR Code (PNG + SVG) aponta para a URL final.
- [x] Meta tags de SEO + Open Graph/Twitter + favicon.
- [x] Nenhum token privado exposto no front-end.
