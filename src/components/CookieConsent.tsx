import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  getCookieConsent,
  setCookieConsent,
  type ConsentValue,
} from "@/lib/cookieConsent";

type ConsentState = "unknown" | ConsentValue;

const CookieConsent = () => {
  const { t, dir } = useLanguage();
  const c = t.cookieConsent;
  const [consent, setConsent] = useState<ConsentState>("accepted");
  const [manageOpen, setManageOpen] = useState(false);

  useEffect(() => {
    const saved = getCookieConsent();
    setConsent(saved ?? "unknown");
  }, []);

  const save = (value: ConsentValue) => {
    setCookieConsent(value);
    setConsent(value);
    setManageOpen(false);
  };

  if (consent !== "unknown" && !manageOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center p-4 sm:p-6"
      dir={dir}
      role="dialog"
      aria-modal="true"
      aria-label={c.title}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-5 sm:p-6 text-card-foreground shadow-2xl">
        {!manageOpen ? (
          <>
            <h2 className="font-serif text-xl font-semibold mb-3 text-center sm:text-start">{c.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 text-center sm:text-start">
              {c.body}
              <Link to="/privacy-policy" className="text-primary font-medium hover:underline">
                {c.privacyLink}
              </Link>
              .
            </p>
            <div className="flex flex-col-reverse sm:flex-row sm:flex-wrap gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => setManageOpen(true)}
                className="rounded-md border border-primary px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5"
              >
                {c.manage}
              </button>
              <button
                type="button"
                onClick={() => save("declined")}
                className="rounded-md border border-primary px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5"
              >
                {c.decline}
              </button>
              <button
                type="button"
                onClick={() => save("accepted")}
                className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {c.accept}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-serif text-xl font-semibold mb-3 text-center sm:text-start">{c.manageTitle}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3 text-center sm:text-start">{c.manageBody}</p>
            <p className="mb-5 text-sm font-medium text-foreground text-center sm:text-start">{c.essential}</p>
            <div className="flex flex-col-reverse sm:flex-row sm:flex-wrap gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => setManageOpen(false)}
                className="rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {c.close}
              </button>
              <button
                type="button"
                onClick={() => save("declined")}
                className="rounded-md border border-primary px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5"
              >
                {c.decline}
              </button>
              <button
                type="button"
                onClick={() => save("accepted")}
                className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {c.save}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
