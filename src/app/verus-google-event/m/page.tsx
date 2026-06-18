import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Highlight from "@/components/Highlight";
import HubSpotForm from "@/components/HubSpotForm";
import MobileCta from "@/components/MobileCta";
import { content } from "@/content";

export const metadata: Metadata = {
  title: "Verus | Case Google Event | Convert",
};

const COL = "mx-auto w-full max-w-[460px] px-5";
const EYE = "h-1.5 w-1.5 rounded-full bg-magenta";
const H2 =
  "mt-3 text-balance font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-0.02em]";

export default function MobilePage() {
  const c = content;
  return (
    <>
      {/* fundo mesh SEM marcadores (markers=0) — só as curvas de contorno */}
      <iframe
        src="/mesh-bg.html?v=9&markers=0&perf=low&lineop=0.5"
        title=""
        aria-hidden="true"
        tabIndex={-1}
        className="mesh-frame"
      />

      {/* header fixo: logo Convert (opaco — não deixa o conteúdo vazar por trás) */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#04141a]">
        <div className={`${COL} flex h-14 items-center justify-center`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/convert-logo.svg" alt="Convert" className="h-6 w-auto" />
        </div>
      </header>

      <main className="pb-28 pt-20">
        {/* HERO */}
        <section className={COL}>
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/verus-logo.png"
              alt="Verus"
              className="h-auto w-[72%] max-w-[300px]"
            />
            <h1 className="mt-6 text-balance font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-0.02em]">
              <Highlight text={c.hero.titulo} mark={c.hero.destaque} />
            </h1>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-cloud-muted">
              {c.hero.paragrafo}
            </p>
          </Reveal>
        </section>

        {/* ARQUITETURA (subiu para a posição 2) — steps em flash cards */}
        <section id="arquitetura" className="pt-16">
          <div className={COL}>
            <Reveal>
              <span className="eyebrow">
                <span className={EYE} />
                {c.arquitetura.eyebrow}
              </span>
              <h2 className={H2}>
                <Highlight
                  text={c.arquitetura.titulo}
                  mark={c.arquitetura.destaque}
                />
              </h2>
            </Reveal>
          </div>

          {/* deck horizontal de flash cards */}
          <Reveal
            className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {c.arquitetura.blocos.map((b) => (
              <article
                key={b.step}
                className="glass flex w-[84%] max-w-[360px] shrink-0 snap-start flex-col p-5"
              >
                <span className="font-mono text-[11px] font-bold tabular-nums text-cloud-faint">
                  {b.step}
                </span>
                <h3 className="mt-3 text-balance font-display text-[2.52rem] font-bold leading-[1.04] tracking-[-0.02em] text-cloud [overflow-wrap:break-word]">
                  {b.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cloud-muted">
                  {b.desc}
                </p>
              </article>
            ))}
          </Reveal>

          <Reveal as="p" className={`${COL} mt-8 text-pretty text-base leading-relaxed text-cloud-muted`}>
            <Highlight
              text={c.arquitetura.fecho}
              mark={c.arquitetura.fechoDestaque}
              className="text-cloud"
            />
          </Reveal>
        </section>

        {/* VALUE (desceu para a posição 3) */}
        <section id="por-que" className={`${COL} pt-20`}>
          <Reveal>
            <span className="eyebrow">
              <span className={EYE} />
              {c.valor.eyebrow}
            </span>
            <h2 className={H2}>
              <Highlight text={c.valor.titulo} mark={c.valor.destaque} />
            </h2>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-cloud-muted">
              {c.valor.paragrafo}
            </p>
          </Reveal>
          <Reveal as="ul" delay={100} className="mt-7 border-t border-white/10">
            {c.valor.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-baseline gap-4 border-b border-white/10 py-4"
              >
                <span className="flex-none font-mono text-sm font-bold tabular-nums text-magenta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-relaxed text-cloud">{b}</span>
              </li>
            ))}
          </Reveal>
        </section>

        {/* AUDIENCE — faixa diurna, só os títulos (sem subs) */}
        <section id="para-quem" className="day-band relative mt-20 overflow-hidden py-16">
          <div className={COL}>
            <Reveal>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-[#121c20]" />
                {c.audiencia.eyebrow}
              </span>
              <h2 className={`${H2} text-[#121c20]`}>
                <Highlight text={c.audiencia.titulo} mark={c.audiencia.destaque} />
              </h2>
            </Reveal>
            <Reveal as="ul" delay={100} className="mt-7 border-t border-black/10">
              {c.audiencia.itens.map((a, i) => (
                <li key={i} className="flex items-baseline gap-4 border-b border-black/10 py-4">
                  <span className="flex-none font-mono text-xs font-bold tabular-nums text-[#121c20]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-bold leading-snug text-[#121c20]">
                    {a.titulo}
                  </span>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* FORM */}
        <section id="lead-form" className={`${COL} scroll-mt-16 pt-20`}>
          <Reveal>
            <span className="eyebrow">
              <span className={EYE} />
              {c.formulario.eyebrow}
            </span>
            <h2 className={H2}>
              <Highlight text={c.formulario.titulo} mark={c.formulario.destaque} />
            </h2>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-cloud-muted">
              {c.formulario.paragrafo}
            </p>
          </Reveal>
          <Reveal className="mt-7">
            <HubSpotForm />
          </Reveal>
        </section>

        {/* FOOTER */}
        <footer className={`${COL} mt-16 border-t border-white/10 pt-8`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/convert-logo.svg" alt="Convert" className="h-6 w-auto" />
          <p className="mt-3 text-sm leading-relaxed text-cloud-muted">
            {c.footer.descricao}
          </p>
          <nav className="mt-5 flex flex-col gap-2.5">
            {c.footer.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-cloud-muted"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-cloud-faint">
            {c.footer.copy}
          </p>
        </footer>
      </main>

      {/* CTA fixo no rodapé — some na última seção (form/footer) */}
      <MobileCta label={c.hero.ctaPrimario} />
    </>
  );
}
