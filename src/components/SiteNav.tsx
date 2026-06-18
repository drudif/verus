"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Por quê", href: "#por-que" },
  { label: "Arquitetura", href: "#arquitetura" },
  { label: "Para quem", href: "#para-quem" },
];

/**
 * Nav fixa com estado "scrolled" (ganha fundo + hairline ao rolar) e CTA
 * persistente. Inspirada na nav do VERUS, na linguagem do nosso design system.
 */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#04141a]/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-px flex h-16 items-center justify-between">
        <a href="#" aria-label="Convert">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/convert-logo.svg" alt="Convert" className="h-7 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cloud-muted transition-colors hover:text-cloud"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#lead-form" className="btn-primary !px-5 !py-2.5 !text-xs">
          Quero saber mais
        </a>
      </div>
    </header>
  );
}
