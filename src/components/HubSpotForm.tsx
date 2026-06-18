"use client";

import { useEffect, useMemo, useState } from "react";
import { getUtmParams, getCookie, getHiddenFields } from "@/lib/utm";
import type { HubSpotField } from "@/lib/hubspot";
import HubSpotEmbedForm from "./HubSpotEmbedForm";

const CONSENT_TEXT =
  "Autorizo a Convert a entrar em contato comigo sobre o Verus e outras soluções relacionadas.";

const AREAS = [
  "IA aplicada a marketing",
  "Inteligência de dados",
  "Mídia e performance",
  "Criatividade e performance criativa",
  "CRM e jornada do cliente",
  "Busca, demanda e intenção",
  "Demonstração do Verus",
  "Outro",
];

type FormState = {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  jobtitle: string;
  phone: string;
  website: string;
  area_de_interesse: string;
  desafio_dados_ia: string;
  consent: boolean;
};

const EMPTY: FormState = {
  firstname: "",
  lastname: "",
  email: "",
  company: "",
  jobtitle: "",
  phone: "",
  website: "",
  area_de_interesse: "",
  desafio_dados_ia: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function HubSpotForm() {
  const useEmbed = process.env.NEXT_PUBLIC_HUBSPOT_USE_EMBED === "true";
  if (useEmbed) {
    return (
      <div className="glass p-6 sm:p-8">
        <HubSpotEmbedForm />
      </div>
    );
  }
  return <CustomForm />;
}

function CustomForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");

  // captura UTMs uma vez (cliente)
  const utms = useMemo(getUtmParams, []);
  const [hutk, setHutk] = useState<string>();
  useEffect(() => {
    setHutk(getCookie("hubspotutk"));
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstname.trim()) e.firstname = "Informe seu nome.";
    if (!form.lastname.trim()) e.lastname = "Informe seu sobrenome.";
    if (!form.email.trim()) e.email = "Informe seu e-mail corporativo.";
    else if (!EMAIL_RE.test(form.email)) e.email = "E-mail inválido.";
    if (!form.company.trim()) e.company = "Informe a empresa.";
    if (!form.jobtitle.trim()) e.jobtitle = "Informe seu cargo.";
    if (!form.consent) e.consent = "É necessário autorizar o contato.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (status === "loading") return;
    if (!validate()) {
      document.querySelector("[data-error='true']")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setStatus("loading");
    setServerError("");

    const fields: HubSpotField[] = [
      { name: "firstname", value: form.firstname.trim() },
      { name: "lastname", value: form.lastname.trim() },
      { name: "email", value: form.email.trim() },
      { name: "company", value: form.company.trim() },
      { name: "jobtitle", value: form.jobtitle.trim() },
      { name: "phone", value: form.phone.trim() },
      { name: "website", value: form.website.trim() },
      { name: "area_de_interesse", value: form.area_de_interesse },
      { name: "desafio_dados_ia", value: form.desafio_dados_ia.trim() },
      ...Object.entries(getHiddenFields()).map(([name, value]) => ({ name, value })),
      ...Object.entries(utms).map(([name, value]) => ({ name, value: value as string })),
    ];

    try {
      const res = await fetch("/api/hubspot-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: {
            hutk,
            pageUri: typeof window !== "undefined" ? window.location.href : "",
            pageName: "Verus | Case Google Event",
          },
          consent: { given: form.consent, text: CONSENT_TEXT },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Não foi possível enviar agora.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Falha no envio.");
    }
  }

  if (status === "success") {
    return (
      <div className="glass p-8 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[4px] bg-magenta">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="#0a1417" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-xl font-bold">Obrigado pelo interesse.</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cloud-muted">
          O time da Convert entrará em contato para entender o seu contexto e
          compartilhar próximos passos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nome" required error={errors.firstname}>
          <input
            className="field-input"
            value={form.firstname}
            onChange={(e) => update("firstname", e.target.value)}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Sobrenome" required error={errors.lastname}>
          <input
            className="field-input"
            value={form.lastname}
            onChange={(e) => update("lastname", e.target.value)}
            autoComplete="family-name"
          />
        </Field>
        <Field label="E-mail corporativo" required error={errors.email} className="sm:col-span-2">
          <input
            type="email"
            className="field-input"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
            placeholder="voce@empresa.com.br"
          />
        </Field>
        <Field label="Empresa" required error={errors.company}>
          <input
            className="field-input"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            autoComplete="organization"
          />
        </Field>
        <Field label="Cargo" required error={errors.jobtitle}>
          <input
            className="field-input"
            value={form.jobtitle}
            onChange={(e) => update("jobtitle", e.target.value)}
            autoComplete="organization-title"
          />
        </Field>
        <Field label="Telefone / WhatsApp">
          <input
            type="tel"
            className="field-input"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
            placeholder="(11) 90000-0000"
          />
        </Field>
        <Field label="Site da empresa">
          <input
            className="field-input"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="empresa.com.br"
          />
        </Field>
        <Field label="Área de interesse" className="sm:col-span-2">
          <select
            className="field-select"
            value={form.area_de_interesse}
            onChange={(e) => update("area_de_interesse", e.target.value)}
          >
            <option value="">Selecione uma opção</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Qual desafio você gostaria de resolver com dados e IA?"
          className="sm:col-span-2"
        >
          <textarea
            className="field-textarea min-h-[88px] resize-y"
            value={form.desafio_dados_ia}
            onChange={(e) => update("desafio_dados_ia", e.target.value)}
            placeholder="Opcional. Conte o contexto do seu time."
          />
        </Field>
      </div>

      {/* LGPD */}
      <label
        className="mt-5 flex cursor-pointer items-start gap-3"
        data-error={errors.consent ? "true" : undefined}
      >
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-none accent-magenta"
        />
        <span className="text-xs leading-relaxed text-cloud-muted">
          {CONSENT_TEXT}
        </span>
      </label>
      {errors.consent && (
        <p className="mt-1.5 text-xs text-[#ff8a96]">{errors.consent}</p>
      )}

      {status === "error" && (
        <div className="mt-5 rounded-[4px] border border-[#7a2230] bg-[#2a1218] px-4 py-3 text-sm text-[#ffb4bd]">
          {serverError} Se persistir, fale com o time da Convert pelo e-mail do evento.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Enviando…" : "Quero conversar sobre o Verus"}
        {status !== "loading" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <p className="mt-3 text-center text-[11px] text-cloud-faint">
        Seus dados são tratados conforme a LGPD e usados apenas para este contato.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className} data-error={error ? "true" : undefined}>
      <label className="field-label">
        {label}
        {required && <span className="ml-0.5 text-magenta">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-[#ff8a96]">{error}</p>}
    </div>
  );
}
