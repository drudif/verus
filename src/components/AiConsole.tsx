"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/content";

// Estrela de 4 pontas (a marca) — usada inteira ao lado do título do card.
const STAR_FULL =
  "M12 1.9 C 12.6 9 15 11.4 22.1 12 C 15 12.6 12.6 15 12 22.1 C 11.4 15 9 12.6 1.9 12 C 9 11.4 11.4 9 12 1.9 Z";

// Ícone por analista: um "V" (Satoshi) rotacionado — começa de cabeça pra
// baixo na Ada (180°) e segue a rotação nas demais.
const ICONS = [180, 270, 0, 90].map((deg) => (
  <span
    aria-hidden
    className="font-display text-[17px] font-bold leading-none"
    style={{ display: "inline-block", transform: `rotate(${deg}deg)` }}
  >
    V
  </span>
));

const AIS = content.console.analistas;
const QUESTIONS = content.console.perguntas;

export default function AiConsole({ className = "" }: { className?: string }) {
  const [text, setText] = useState("");
  const [active, setActive] = useState<number | null>(null);
  const [pressed, setPressed] = useState(false);
  const [shown, setShown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const aiRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    async function run() {
      let q = 0;
      while (alive) {
        // o texto inteiro entra em fade
        setText(QUESTIONS[q]);
        setShown(true);
        await sleep(2500); // fica visível ~2,5s
        if (!alive) return;

        // animação do click; a IA da vez acende
        setPressed(true);
        await sleep(180);
        setPressed(false);
        setActive(q);
        await sleep(reduce ? 300 : 520);
        setActive(null);

        // o texto sai em fade; entra o próximo na sequência
        setShown(false);
        await sleep(reduce ? 0 : 420);
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
        <span className="eyebrow">
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden>
            <path
              d={STAR_FULL}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          {content.console.eyebrow}
        </span>
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
              key={ai.nome}
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
                {ICONS[i]}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight text-cloud">
                  {ai.nome}
                </p>
                <p className="truncate font-mono text-[11px] text-cloud-muted">
                  {ai.papel}
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
          {content.console.label}
        </p>
        <p
          aria-live="polite"
          className={`mt-1.5 min-h-[2.5rem] text-sm leading-snug text-cloud transition-opacity duration-500 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
        >
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </div>
  );
}
