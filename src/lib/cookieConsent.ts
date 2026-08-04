export const COOKIE_CONSENT_KEY = "kube-cookie-consent";
export const COOKIE_CONSENT_EVENT = "kube-cookie-consent";

export type ConsentValue = "accepted" | "declined";

export function getCookieConsent(): ConsentValue | null {
  const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (saved === "accepted" || saved === "declined") return saved;
  return null;
}

export function setCookieConsent(value: ConsentValue) {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}
