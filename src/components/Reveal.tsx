"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Revela o conteúdo ao entrar na viewport (fade + rise, curva exponencial).
 * Inspirado no scroll-reveal do VERUS. Respeita prefers-reduced-motion via CSS.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let io: IntersectionObserver | undefined;

    const inView = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    // defere ao próximo frame para o layout já estar resolvido — assim o que
    // está na viewport revela na hora (robusto contra quirks de IO/headless).
    const raf = requestAnimationFrame(() => {
      if (inView() || typeof IntersectionObserver === "undefined") {
        setVisible(true);
        return;
      }
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io?.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(el);
    });

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
