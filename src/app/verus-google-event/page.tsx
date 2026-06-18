import Hero from "@/components/Hero";
import SiteNav from "@/components/SiteNav";
import Reveal from "@/components/Reveal";
import Highlight from "@/components/Highlight";
import ValueSection from "@/components/ValueSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import AudienceSection from "@/components/AudienceSection";
import HubSpotForm from "@/components/HubSpotForm";
import Footer from "@/components/Footer";
import { content } from "@/content";

const f = content.formulario;

export default function VerusGoogleEventPage() {
  return (
    <>
      {/* Fundo mesh animado (brand-tuned) — camada fixa atrás de todo o conteúdo */}
      <iframe
        src="/mesh-bg.html"
        title=""
        aria-hidden="true"
        tabIndex={-1}
        className="mesh-frame"
      />

      <SiteNav />

      <main>
        <Hero />
        <ValueSection />
        <ArchitectureSection />
        <AudienceSection />

        {/* Formulário — conversão */}
        <section id="lead-form" className="scroll-mt-20 py-24 sm:py-32">
          <div className="container-px">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <span className="eyebrow">
                  <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
                  {f.eyebrow}
                </span>
                <h2 className="mt-4 text-balance font-display text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                  <Highlight text={f.titulo} mark={f.destaque} />
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-cloud-muted">
                  {f.paragrafo}
                </p>
              </div>

              <Reveal>
                <HubSpotForm />
              </Reveal>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
