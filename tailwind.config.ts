import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // base escura (roxo profundo, alinhada ao assessment)
        graphite: {
          950: "#080615",
          900: "#0E0A24",
          800: "#140E2E",
          700: "#1C1440",
          600: "#241357",
        },
        ink: "#0A0720",
        // accent primário — índigo (#2E2BC6). Mantém as chaves royal/purple
        // usadas pelos componentes; bright/deep são tints derivados.
        royal: {
          DEFAULT: "#2E2BC6",
          bright: "#6360EC",
          deep: "#211F9E",
        },
        purple: {
          DEFAULT: "#2E2BC6",
          bright: "#6360EC",
          deep: "#211F9E",
        },
        // accent de texto/UI — turquesa (#89D6BC). Mantém a chave "magenta"
        // usada pelos componentes (eyebrows, dots, highlights, focus, numerais).
        // O amarelo fica reservado exclusivamente aos botões (ver .btn-primary).
        magenta: {
          DEFAULT: "#89D6BC",
          bright: "#A6E5D2",
          deep: "#5FB89A",
        },
        mint: {
          DEFAULT: "#00E0A8",
          deep: "#00B488",
        },
        yellow: {
          DEFAULT: "#ECF44B",
        },
        orange: {
          DEFAULT: "#F39E2A",
        },
        // tema ESCURO: "cloud" é a cor de texto claro sobre o fundo escuro.
        cloud: {
          DEFAULT: "#ECE9E1",
          muted: "#A7AEB0",
          faint: "#6E7679",
        },
        // "cream" passa a ser a família de SUPERFÍCIES escuras (cards, insets,
        // inputs) — mantém a chave usada nos componentes, agora em tom escuro.
        cream: {
          DEFAULT: "#121C20",
          deep: "#0C1417",
        },
      },
      fontFamily: {
        // Satoshi: títulos em Bold, textos corridos em Regular.
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        // Textos menores / rótulos técnicos → JetBrains Mono.
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1440px",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-node": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease both",
        "pulse-node": "pulse-node 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
