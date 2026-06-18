import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

// Família principal — Satoshi (self-hosted). Títulos usam o peso Bold;
// textos corridos, o Regular. O mesmo --font-display alimenta sans e display.
const satoshi = localFont({
  src: [
    { path: "../fonts/satoshi/Satoshi-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/satoshi/Satoshi-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/satoshi/Satoshi-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/satoshi/Satoshi-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

// Mono — JetBrains Mono, para rótulos/eyebrows e textos menores técnicos.
const jetbrainsMono = localFont({
  src: [
    { path: "../fonts/jetbrains-mono/JetBrainsMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/jetbrains-mono/JetBrainsMono-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/jetbrains-mono/JetBrainsMono-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_LANDING_PAGE_URL ||
  "https://convert.com.br/verus-google-event";

export const metadata: Metadata = {
  metadataBase: new URL(safeOrigin(SITE_URL)),
  title: "Verus | Case Google Event | Convert",
  description:
    "Conheça o Verus, plataforma de inteligência de dados e IA conversacional da Convert apresentada como case em evento do Google.",
  keywords: [
    "Verus",
    "Convert",
    "inteligência de dados",
    "IA conversacional",
    "marketing",
    "growth",
    "mídia",
    "CRM",
    "Google Event",
  ],
  authors: [{ name: "Convert" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Convert",
    title: "Verus | Inteligência de dados e IA conversacional",
    description:
      "A plataforma da Convert apresentada como case no evento do Google. Dados, mídia e IA conectados para transformar performance em decisão.",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Verus · Convert" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verus | Case Google Event | Convert",
    description:
      "Inteligência de dados e IA conversacional para decisões de marketing mais assertivas.",
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04141A",
  width: "device-width",
  initialScale: 1,
};

function safeOrigin(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return "https://convert.com.br";
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const trackingId = process.env.NEXT_PUBLIC_HUBSPOT_TRACKING_ID;
  const region = process.env.NEXT_PUBLIC_HUBSPOT_REGION || "na1";
  const trackingHost = region.startsWith("eu") ? "js-eu1.hs-scripts.com" : "js.hs-scripts.com";

  return (
    <html lang="pt-BR" className={`${satoshi.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        {children}

        {/* HubSpot Tracking Code — carregado apenas se houver ID configurado.
            Nenhum token privado é exposto: este é o script público de analytics. */}
        {trackingId ? (
          <Script
            id="hs-script-loader"
            strategy="afterInteractive"
            src={`//${trackingHost}/${trackingId}.js`}
          />
        ) : null}
      </body>
    </html>
  );
}
