import Reveal from "./Reveal";
import Highlight from "./Highlight";
import { content } from "@/content";

const { eyebrow, titulo, destaque, itens } = content.audiencia;

export default function AudienceSection() {
  return (
    <section
      id="para-quem"
      className="day-band relative overflow-hidden py-20 sm:py-28"
    >
      <div className="container-px relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-[#121c20]" />
            {eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-display text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#121c20]">
            <Highlight text={titulo} mark={destaque} />
          </h2>
        </Reveal>

        <Reveal
          as="div"
          delay={100}
          className="mt-14 grid grid-cols-1 gap-x-12 sm:grid-cols-2"
        >
          {itens.map((a, i) => (
            <div
              key={i}
              className="flex gap-5 border-t border-black/10 py-6 transition-colors hover:bg-black/[0.03]"
            >
              <span className="flex-none pt-0.5 font-mono text-xs font-bold tabular-nums text-[#121c20]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[17px] font-bold leading-snug text-[#121c20]">
                  {a.titulo}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#3a4a4e]">
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
