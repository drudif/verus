import Reveal from "./Reveal";

const audiences = [
  {
    title: "CMOs e lideranças de marketing",
    desc: "Visão executiva consolidada para decidir com base em contexto.",
  },
  {
    title: "Heads de growth e performance",
    desc: "Leitura rápida do que move o resultado em cada canal e iniciativa.",
  },
  {
    title: "Times de mídia e CRM",
    desc: "Da alocação de budget à jornada do cliente, sob a mesma linguagem de dados.",
  },
  {
    title: "Áreas de BI, dados e analytics",
    desc: "Uma camada semântica governada que reduz retrabalho e pedidos manuais.",
  },
  {
    title: "Empresas que decidem com recorrência",
    desc: "Para quem transforma dados em decisões recorrentes e consistentes.",
  },
];

export default function AudienceSection() {
  return (
    <section id="para-quem" className="container-px py-20 sm:py-28">
      <Reveal className="max-w-2xl">
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
          Para quem é?
        </span>
        <h2 className="mt-4 text-balance font-display text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
          Feito para quem decide com{" "}
          <span className="text-gradient">dados e responsabilidade.</span>
        </h2>
      </Reveal>

      <Reveal as="div" delay={100} className="mt-14 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
        {audiences.map((a, i) => (
          <div
            key={i}
            className="flex gap-5 border-t border-white/10 py-6 transition-colors hover:bg-white/[0.02]"
          >
            <span className="flex-none pt-0.5 font-mono text-xs font-bold tabular-nums text-magenta">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-[17px] font-bold leading-snug text-cloud">
                {a.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cloud-muted">{a.desc}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
