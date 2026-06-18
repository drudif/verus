"use client";

import { useEffect, useRef } from "react";
import { getUtmParams, getHiddenFields } from "@/lib/utm";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (opts: Record<string, unknown>) => void;
      };
    };
  }
}

/**
 * Embed OFICIAL do HubSpot (forms v2). Ativado quando
 * NEXT_PUBLIC_HUBSPOT_USE_EMBED=true.
 *
 * Os campos ocultos e UTMs são injetados via onFormReady, preenchendo
 * inputs hidden que precisam existir no form configurado no HubSpot.
 * O visual é aproximado ao tema escuro pela classe .hs-themed (globals.css),
 * mas o controle fino do layout é menor que no formulário customizado.
 */
export default function HubSpotEmbedForm() {
  const ref = useRef<HTMLDivElement>(null);
  const created = useRef(false);

  useEffect(() => {
    const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
    const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;
    const region = process.env.NEXT_PUBLIC_HUBSPOT_REGION || "na1";
    if (!portalId || !formId || created.current) return;

    const scriptId = "hs-forms-embed";
    const ensureScript = () =>
      new Promise<void>((resolve) => {
        if (window.hbspt) return resolve();
        const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
        if (existing) {
          existing.addEventListener("load", () => resolve());
          return;
        }
        const s = document.createElement("script");
        s.id = scriptId;
        s.src = "//js.hsforms.net/forms/embed/v2.js";
        s.async = true;
        s.addEventListener("load", () => resolve());
        document.body.appendChild(s);
      });

    ensureScript().then(() => {
      if (!window.hbspt || created.current) return;
      created.current = true;
      window.hbspt.forms.create({
        region,
        portalId,
        formId,
        target: "#hs-embed-target",
        cssClass: "hs-themed",
        onFormReady: (formEl: HTMLFormElement) => {
          const hidden = { ...getHiddenFields(), ...getUtmParams() };
          for (const [name, value] of Object.entries(hidden)) {
            const input = formEl.querySelector<HTMLInputElement>(
              `input[name="${name}"]`
            );
            if (input) {
              input.value = String(value);
              input.dispatchEvent(new Event("input", { bubbles: true }));
            }
          }
        },
      });
    });
  }, []);

  return <div id="hs-embed-target" ref={ref} className="hs-themed min-h-[200px]" />;
}
