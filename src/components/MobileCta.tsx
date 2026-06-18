"use client";

import { useEffect, useState } from "react";

/**
 * CTA fixo no rodapé da versão mobile. Some quando o formulário (#lead-form)
 * ou o footer entram em vista — para não cobrir o form na última seção.
 */
export default function MobileCta({ label }: { label: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = ["#lead-form", "footer"]
      .map((s) => document.querySelector(s))
      .filter((el): el is Element => el !== null);
    if (!targets.length) return;

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(visible.size > 0);
      },
      { threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#04141a]/90 backdrop-blur-md transition-all duration-300 ${
        hidden
          ? "pointer-events-none translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="mx-auto w-full max-w-[460px] px-5 py-3">
        <a href="#lead-form" className="btn-primary w-full">
          {label}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
