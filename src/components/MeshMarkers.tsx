"use client";

import { useEffect } from "react";

/**
 * Mostra os marcadores do shader (pontos + códigos topográficos) apenas quando
 * a seção 2 (#por-que) ou a última (#lead-form) estão em vista. As linhas de
 * contorno do mesh continuam sempre visíveis — só os marcadores são gated.
 *
 * Não edita o mesh-bg.html: injeta um CSS de controle dentro do iframe e
 * alterna a classe `markers-on` no body dele conforme o scroll.
 */
export default function MeshMarkers() {
  useEffect(() => {
    const iframe = document.querySelector(
      "iframe.mesh-frame"
    ) as HTMLIFrameElement | null;
    if (!iframe) return;

    let io: IntersectionObserver | null = null;
    let pollId: number | undefined;
    let cancelled = false;
    const inView = new Set<Element>();

    function setup(): boolean {
      let doc: Document | null = null;
      try {
        doc = iframe?.contentDocument ?? null;
      } catch {
        return true; // cross-origin: desiste silenciosamente
      }
      if (!doc || !doc.body || !doc.head) return false;

      if (!doc.getElementById("markers-gate")) {
        const style = doc.createElement("style");
        style.id = "markers-gate";
        style.textContent =
          "#mesh-markers,#mesh-links{opacity:0;transition:opacity .6s ease}" +
          "body.markers-on #mesh-markers,body.markers-on #mesh-links{opacity:1}";
        doc.head.appendChild(style);
      }

      const body = doc.body;
      const targets = ["#por-que", "#lead-form"]
        .map((s) => document.querySelector(s))
        .filter((el): el is Element => el !== null);
      if (!targets.length) return false;

      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) inView.add(e.target);
            else inView.delete(e.target);
          }
          body.classList.toggle("markers-on", inView.size > 0);
        },
        { threshold: 0, rootMargin: "-20% 0px -20% 0px" }
      );
      targets.forEach((t) => io!.observe(t));
      return true;
    }

    if (!setup()) {
      iframe.addEventListener("load", () => setup(), { once: true });
      pollId = window.setInterval(() => {
        if (cancelled || setup()) window.clearInterval(pollId);
      }, 300);
      window.setTimeout(() => window.clearInterval(pollId), 6000);
    }

    return () => {
      cancelled = true;
      io?.disconnect();
      if (pollId) window.clearInterval(pollId);
    };
  }, []);

  return null;
}
