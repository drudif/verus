/**
 * Utilidades de rastreamento: captura de UTMs da URL, cookie de tracking do
 * HubSpot (hubspotutk) e montagem dos campos ocultos enviados ao CRM.
 */

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmMap = Partial<Record<UtmKey, string>>;

/** Lê os parâmetros UTM da query string atual. */
export function getUtmParams(): UtmMap {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: UtmMap = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) out[key] = value;
  }
  return out;
}

/** Lê um cookie pelo nome (ex.: hubspotutk, usado para associar o tracking). */
export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Campos ocultos fixos da campanha (permitem filtrar os contatos do evento
 * no HubSpot depois). page_origin é resolvido em runtime.
 */
export function getHiddenFields(): Record<string, string> {
  const pageOrigin =
    (typeof window !== "undefined" ? window.location.href : "") ||
    process.env.NEXT_PUBLIC_LANDING_PAGE_URL ||
    "";

  return {
    lead_source: "Evento Google",
    conversion_event: "Google Event - Verus Case",
    product_interest: "Verus",
    lifecyclestage: "lead",
    campaign_name: "verus_google_event",
    page_origin: pageOrigin,
    event_context: "Google",
    handoff_team: "Convert GTM",
  };
}
