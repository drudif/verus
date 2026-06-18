/**
 * Helpers do HubSpot compartilhados entre cliente e servidor.
 */

export type HubSpotField = { name: string; value: string };

export type LeadContext = {
  hutk?: string;
  pageUri?: string;
  pageName?: string;
};

export type LeadPayload = {
  fields: HubSpotField[];
  context?: LeadContext;
  consent?: {
    given: boolean;
    text: string;
  };
};

/** Host da Forms Submissions API conforme a região do portal. */
export function formsApiHost(region?: string): string {
  return region && region.toLowerCase().startsWith("eu")
    ? "api-eu1.hsforms.com"
    : "api.hsforms.com";
}

/** URL completa de submissão do formulário. */
export function submissionUrl(
  portalId: string,
  formId: string,
  region?: string
): string {
  return `https://${formsApiHost(region)}/submissions/v3/integration/submit/${portalId}/${formId}`;
}
