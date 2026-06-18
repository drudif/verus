import Reveal from "./Reveal";
import AiConsole from "./AiConsole";

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="container-px relative pt-28 pb-16 sm:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* texto */}
          <Reveal>
            <span className="eyebrow mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
              Apresentado no Google Event
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/verus-logo.png"
              alt="Verus"
              className="h-auto w-full max-w-[500px]"
            />
            <h1 className="mt-7 text-balance font-display text-[clamp(1.9rem,4.6vw,3.05rem)] font-bold leading-[1.08] tracking-[-0.02em]">
              Inteligência de dados e IA conversacional para decisões de
              marketing <span className="text-gradient">mais assertivas.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-cloud-muted">
              A Convert apresentou o Verus como case no evento do Google. A
              plataforma conecta dados, mídia e IA para transformar performance
              em decisão.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#lead-form" className="btn-primary">
                Quero saber mais sobre o Verus
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#arquitetura" className="btn-ghost">Como funciona</a>
            </div>
            <p className="mt-6 text-xs text-cloud-faint">
              Conversa consultiva · demonstração sob medida · sem compromisso.
            </p>
          </Reveal>

          {/* card — console dos quatro analistas com pergunta → IA */}
          <Reveal delay={140} className="relative">
            <AiConsole className="mx-auto max-w-md" />
          </Reveal>
        </div>
      </div>
    </header>
  );
}
