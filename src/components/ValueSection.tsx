import Reveal from "./Reveal";

const bullets = [
  "Unifica dados dispersos em uma visão acionável.",
  "Reduz a dependência de análises manuais e leituras fragmentadas.",
  "Permite perguntas em linguagem natural.",
  "Entrega respostas mais contextualizadas para marketing, mídia e negócio.",
  "Ajuda times a decidirem com mais velocidade e precisão.",
];

export default function ValueSection() {
  return (
    <section id="por-que" className="container-px py-20 sm:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
            Por que o Verus existe
          </span>
          <h2 className="mt-4 text-balance font-display text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
            Empresas já têm dados. O desafio é transformar dados em{" "}
            <span className="text-gradient">contexto, decisão e ação.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cloud-muted">
            O Verus organiza a camada de inteligência entre plataformas,
            dashboards, times e lideranças. Encurta a distância entre o dado e a
            decisão.
          </p>
        </Reveal>

        <Reveal as="ul" delay={120} className="self-center border-t border-white/10">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="group flex items-baseline gap-5 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.02]"
            >
              <span className="flex-none font-mono text-sm font-bold tabular-nums text-magenta">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[17px] leading-relaxed text-cloud">{b}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
