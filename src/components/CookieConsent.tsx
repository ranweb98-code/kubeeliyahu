import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const STORAGE_KEY = "kube-cookie-consent";

type ConsentState = "unknown" | "accepted" | "declined";

const CookieConsent = () => {
  const { t, dir } = useLanguage();
  const c = t.cookieConsent;
  const [consent, setConsent] = useState<ConsentState>("accepted");
  const [manageOpen, setManageOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "accepted" || saved === "declined") {
      setConsent(saved);
    } else {
      setConsent("unknown");
    }
  }, []);

  const save = (value: Exclude<ConsentState, "unknown">) => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setManageOpen(false);
  };

  if (consent !== "unknown" && !manageOpen) return null;

  return (
    <div
      className="fixed bottom-24 end-4 z-[55] w-[min(100vw-2rem,22rem)]"
      dir={dir}
      role="region"
      aria-label={c.title}
    >
      <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-2xl">
        {!manageOpen ? (
          <>
            <h2 className="font-serif text-lg font-semibold mb-2">{c.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {c.body}
              <Link to="/privacy-policy" className="text-primary font-medium hover:underline">
                {c.privacyLink}
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setManageOpen(true)}
                className="rounded-md border border-primary px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5"
              >
                {c.manage}
              </button>
              <button
                type="button"
                onClick={() => save("declined")}
                className="rounded-md border border-primary px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5"
              >
                {c.decline}
              </button>
              <button
                type="button"
                onClick={() => save("accepted")}
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {c.accept}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-serif text-lg font-semibold mb-2">{c.manageTitle}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.manageBody}</p>
            <p className="mb-4 text-sm font-medium text-foreground">{c.essential}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => save("declined")}
                className="rounded-md border border-primary px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5"
              >
                {c.decline}
              </button>
              <button
                type="button"
                onClick={() => save("accepted")}
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {c.save}
              </button>
              <button
                type="button"
                onClick={() => setManageOpen(false)}
                className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {c.close}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
