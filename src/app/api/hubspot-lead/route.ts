import { NextResponse } from "next/server";
import { submissionUrl, type LeadPayload } from "@/lib/hubspot";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Recebe o lead do formulário customizado e envia ao HubSpot via
 * Forms Submissions API. Esse endpoint do HubSpot é vinculado ao par
 * portalId/formId e NÃO exige token — portanto nenhum segredo trafega aqui.
 *
 * Caso você precise criar/enriquecer contatos diretamente pela CRM API,
 * use HUBSPOT_PRIVATE_APP_TOKEN (somente server-side) — veja README.
 */
export async function POST(req: Request) {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;
  const region = process.env.NEXT_PUBLIC_HUBSPOT_REGION;

  if (!portalId || !formId) {
    return NextResponse.json(
      { ok: false, error: "HubSpot Portal ID/Form ID não configurados no servidor." },
      { status: 500 }
    );
  }

  let payload: LeadPayload;
  try {
    payload = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const fields = (payload.fields || []).filter(
    (f) => f && f.name && typeof f.value === "string" && f.value.trim() !== ""
  );

  if (!fields.some((f) => f.name === "email")) {
    return NextResponse.json(
      { ok: false, error: "E-mail é obrigatório." },
      { status: 400 }
    );
  }

  const body: Record<string, unknown> = {
    fields,
    context: {
      ...(payload.context?.hutk ? { hutk: payload.context.hutk } : {}),
      pageUri: payload.context?.pageUri || "",
      pageName: payload.context?.pageName || "Verus | Case Google Event",
    },
  };

  if (payload.consent?.given) {
    body.legalConsentOptions = {
      consent: {
        consentToProcess: true,
        text: payload.consent.text,
      },
    };
  }

  try {
    const hsRes = await fetch(submissionUrl(portalId, formId, region), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await hsRes.json().catch(() => ({}));

    if (!hsRes.ok) {
      // HubSpot devolve detalhes úteis em data.errors / data.message
      const message =
        (data && (data.message || (data.errors && data.errors[0]?.message))) ||
        `HubSpot respondeu ${hsRes.status}`;
      return NextResponse.json(
        { ok: false, error: message, status: hsRes.status },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, inlineMessage: data?.inlineMessage ?? null });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Falha ao contatar o HubSpot.",
      },
      { status: 502 }
    );
  }
}
