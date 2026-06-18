import Reveal from "./Reveal";

type Block = {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const blocks: Block[] = [
  {
    step: "01",
    title: "Dados de mídia e performance",
    desc: "Investimento, entregas e resultados de cada canal, normalizados em um modelo comum.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
        <path d="M4 19V5M9 19v-6M14 19V9M19 19v-9" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Indicadores de negócio",
    desc: "Receita, pipeline, CAC, LTV e metas conectados ao contexto de marketing.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
        <path d="M3 17l5-5 4 4 8-8" />
        <path d="M16 4h5v5" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Camada semântica proprietária",
    desc: "O dicionário que dá significado, governança e relação entre as métricas.",
    highlight: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="3" />
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="M6.7 7.2 10 10.5M17.3 7.2 14 10.5M6.7 16.8 10 13.5M17.3 16.8 14 13.5" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Agentes de IA conversacionais",
    desc: "Perguntas em linguagem natural com respostas contextualizadas e acionáveis.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
        <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-5.5A8 8 0 1 1 21 12Z" />
        <path d="M8.5 11h7M8.5 14h4" />
      </svg>
    ),
  },
];

export default function ArchitectureSection() {
  return (
    <section id="arquitetura" className="py-24 sm:py-32">
      <div className="container-px">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
            O que o Verus conecta
          </span>
          <h2 className="mt-4 text-balance font-display text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
            O Verus é uma{" "}
            <span className="text-gradient">arquitetura de inteligência</span>{" "}
            construída sobre contexto, governança e dados organizados.
          </h2>
        </Reveal>

        {/* fluxo conectado — lê como um pipeline de dados, não como 4 cards iguais */}
        <Reveal className="relative mt-16">
          {/* trilho conector */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10 lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto" />

          <ol className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {blocks.map((b) => (
              <li key={b.step} className="relative pl-16 lg:pl-0">
                {/* nó numerado, assenta sobre o trilho */}
                <span
                  className={`absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border font-mono text-[13px] font-bold lg:relative ${
                    b.highlight
                      ? "border-transparent bg-magenta text-graphite-950 shadow-[0_0_0_4px_rgba(137,214,188,0.2)]"
                      : "border-white/12 bg-graphite-950 text-cloud-muted"
                  }`}
                >
                  {b.step}
                </span>

                <span
                  className={`mt-0 flex h-11 w-11 items-center justify-center rounded-[4px] lg:mt-6 ${
                    b.highlight
                      ? "bg-magenta/15 text-magenta"
                      : "bg-royal-bright/12 text-royal-bright"
                  }`}
                >
                  {b.icon}
                </span>

                <h3
                  className={`mt-4 text-base font-bold leading-snug ${
                    b.highlight ? "text-cloud" : "text-cloud"
                  }`}
                >
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cloud-muted">{b.desc}</p>
                {b.highlight && (
                  <span className="mt-3 inline-flex w-fit rounded-full border border-magenta/40 bg-magenta/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-magenta">
                    Núcleo proprietário
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal as="p" className="mt-16 max-w-2xl text-lg leading-relaxed text-cloud-muted">
          O Verus faz o trabalho antes da resposta:{" "}
          <span className="text-cloud">organiza, contextualiza e governa os dados.</span>
        </Reveal>
      </div>
    </section>
  );
}
