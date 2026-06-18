const links = [
  { label: "Site da Convert", href: "https://convert.com.br" },
  { label: "Política de Privacidade", href: "https://convert.com.br/politica-de-privacidade" },
  { label: "Contato", href: "#lead-form" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-white/10">
      <div className="container-px flex flex-col items-start justify-between gap-8 py-12 sm:flex-row sm:items-center">
        <div className="max-w-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/convert-logo.svg" alt="Convert" className="h-6 w-auto" />
          <p className="mt-3 text-sm leading-relaxed text-cloud-muted">
            Verus é uma plataforma de inteligência de dados e IA conversacional da
            Convert.
          </p>
        </div>

        <nav className="flex flex-col gap-3 sm:items-end">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-cloud-muted transition-colors hover:text-cloud"
            >
              {l.label}
            </a>
          ))}
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-cloud-faint">
            © 2026 Convert · Human Digital Business
          </p>
        </nav>
      </div>
    </footer>
  );
}
