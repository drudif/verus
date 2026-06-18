"use client";

import { useEffect, useRef, useState } from "react";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const AIS = [
  {
    name: "Ada",
    role: "Investimento em mídia",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...stroke}>
        <polyline points="2,18 8,12 13,16 22,6" />
        <polyline points="17,6 22,6 22,11" />
      </svg>
    ),
  },
  {
    name: "Parisa",
    role: "Efetividade criativa",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...stroke}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: "Grace",
    role: "Comportamento de audiência",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...stroke}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    ),
  },
  {
    name: "Radia",
    role: "Previsão de performance",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" {...stroke}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

// Perguntas direcionadas a cada analista (índice casa com AIS).
const QUESTIONS = [
  "Onde estou desperdiçando budget de mídia agora?",
  "Qual criativo está puxando mais conversão esta semana?",
  "Quais segmentos de audiência têm maior risco de churn?",
  "Qual a projeção de performance da campanha no próximo mês?",
];

export default function AiConsole({ className = "" }: { className?: string }) {
  const [text, setText] = useState("");
  const [active, setActive] = useState<number | null>(null);
  const [pressed, setPressed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const travelerRef = useRef<HTMLSpanElement>(null);
  const aiRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    function fly(aiIndex: number) {
      const c = containerRef.current;
      const b = boxRef.current;
      const a = aiRefs.current[aiIndex];
      const t = travelerRef.current;
      if (!c || !b || !a || !t) return;
      // mira o centro exato do ícone da IA (primeiro filho do <li>)
      const iconEl = (a.firstElementChild as HTMLElement) ?? a;
      const cr = c.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const ir = iconEl.getBoundingClientRect();
      const sx = br.left + br.width / 2 - cr.left;
      const sy = br.top + 8 - cr.top;
      const ex = ir.left + ir.width / 2 - cr.left;
      const ey = ir.top + ir.height / 2 - cr.top;

      t.style.transition = "none";
      t.style.left = `${sx}px`;
      t.style.top = `${sy}px`;
      t.style.opacity = "1";
      t.style.transform = "translate(-50%,-50%) scale(1)";
      void t.offsetWidth; // reflow
      t.style.transition =
        "left .5s var(--ease-out-expo), top .5s var(--ease-out-expo), transform .5s var(--ease-out-expo), opacity .5s ease";
      t.style.left = `${ex}px`;
      t.style.top = `${ey}px`;
      t.style.transform = "translate(-50%,-50%) scale(0.6)";
      window.setTimeout(() => {
        if (travelerRef.current) travelerRef.current.style.opacity = "0";
      }, 430);
    }

    async function run() {
      let q = 0;
      while (alive) {
        const full = QUESTIONS[q];

        // digita um caractere por vez (rápido)
        for (let i = 1; i <= full.length && alive; i += 1) {
          setText(full.slice(0, i));
          await sleep(reduce ? 0 : 14);
        }
        if (!alive) return;
        setText(full);
        await sleep(reduce ? 400 : 700);

        // box "aperta" (envio)
        setPressed(true);
        await sleep(170);
        setPressed(false);

        // conteúdo viaja até a IA da vez
        if (!reduce) {
          fly(q);
          await sleep(480);
        }

        // a IA acende
        setActive(q);
        await sleep(900);
        setActive(null);
        await sleep(120);

        // apaga rápido e segue para a próxima
        for (let i = full.length; i >= 0 && alive; i -= 6) {
          setText(full.slice(0, Math.max(0, i)));
          await sleep(reduce ? 0 : 10);
        }
        q = (q + 1) % QUESTIONS.length;
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div ref={containerRef} className={`glass relative p-7 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="eyebrow">Os quatro analistas</span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-magenta opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-magenta" />
        </span>
      </div>

      <ul className="mt-5 space-y-1">
        {AIS.map((ai, i) => {
          const lit = active === i;
          return (
            <li
              key={ai.name}
              ref={(el) => {
                aiRefs.current[i] = el;
              }}
              className={`-mx-2 flex items-center gap-3.5 rounded-[4px] px-2 py-1.5 transition-all duration-300 ${
                lit ? "bg-magenta/10 shadow-[0_0_0_1px_rgba(137,214,188,0.45)]" : ""
              }`}
            >
              <span
                className={`flex h-9 w-9 flex-none items-center justify-center rounded-[4px] transition-all duration-300 ${
                  lit
                    ? "scale-110 bg-magenta text-graphite-950 shadow-[0_0_18px_2px_rgba(137,214,188,0.55)]"
                    : "bg-magenta/12 text-magenta"
                }`}
              >
                {ai.icon}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight text-cloud">
                  {ai.name}
                </p>
                <p className="truncate font-mono text-[11px] text-cloud-muted">
                  {ai.role}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="hairline my-4" />

      <div
        ref={boxRef}
        className={`rounded-[4px] border bg-cream/60 p-3.5 transition-all duration-150 ${
          pressed
            ? "scale-[0.97] border-magenta/70 shadow-[0_0_0_3px_rgba(137,214,188,0.18)]"
            : "border-white/10"
        }`}
      >
        <p className="font-mono text-[10px] uppercase tracking-wider text-magenta-bright">
          Pergunta em linguagem natural
        </p>
        <p
          aria-live="polite"
          className="mt-1.5 min-h-[2.5rem] text-sm leading-snug text-cloud"
        >
          &ldquo;{text}
          <span className="type-caret" aria-hidden="true">
            |
          </span>
          &rdquo;
        </p>
      </div>

      {/* pulso que viaja do box até a IA */}
      <span ref={travelerRef} className="travel-dot" aria-hidden="true" />
    </div>
  );
}
