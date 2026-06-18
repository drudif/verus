import Reveal from "./Reveal";
import Highlight from "./Highlight";
import { content } from "@/content";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Ícones por bloco — casam com os títulos de content.arquitetura.blocos:
// 01 Dados de performance · 02 Investimento em mídia · 03 Eficiência criativa ·
// 04 Comportamento da audiência
const ICONS = [
  (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <path d="M4 19V5M9 19v-6M14 19V9M19 19v-9" />
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  ),
];

const { eyebrow, titulo, destaque, blocos, fecho, fechoDestaque } =
  content.arquitetura;

export default function ArchitectureSection() {
  return (
    <section id="arquitetura" className="py-24 sm:py-32">
      <div className="container-px">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
            {eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-display text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
            <Highlight text={titulo} mark={destaque} />
          </h2>
        </Reveal>

        {/* fluxo conectado — lê como um pipeline de dados, não como 4 cards iguais */}
        <Reveal className="relative mt-16">
          {/* trilho conector */}
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-white/10 lg:left-0 lg:right-0 lg:top-[23px] lg:bottom-auto lg:h-px lg:w-auto" />

          <ol className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {blocos.map((b, i) => (
              <li key={b.step} className="relative pl-16 lg:pl-0">
                {/* círculo com o ícone, assenta sobre o trilho */}
                <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-graphite-950 text-[#ededea] lg:relative">
                  {ICONS[i]}
                </span>

                <div className="lg:mt-5">
                  <span className="font-mono text-[11px] font-bold tabular-nums text-cloud-faint">
                    {b.step}
                  </span>
                  <h3 className="mt-1 text-base font-bold leading-snug text-cloud">
                    {b.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cloud-muted">
                    {b.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal as="p" className="mt-16 max-w-2xl text-pretty text-lg leading-relaxed text-cloud-muted">
          <Highlight text={fecho} mark={fechoDestaque} className="text-cloud" />
        </Reveal>
      </div>
    </section>
  );
}
