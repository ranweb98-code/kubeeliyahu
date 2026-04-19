import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

/** Fixed shortcut to store locations — visible while scrolling (RTL-aware). */
const PurchasePointsFab = () => {
  const { t, dir } = useLanguage();

  return (
    <Link
      to="/store-locations"
      dir={dir}
      className="fixed bottom-24 start-4 z-50 flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-accent-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:bottom-28 md:start-6"
      aria-label={t.floatingPurchasePoints.ariaLabel}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-foreground/55" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-foreground" />
      </span>
      <MapPin className="h-5 w-5 shrink-0" aria-hidden />
      <span className="max-w-[9.5rem] text-sm font-semibold leading-tight sm:max-w-none">
        {t.floatingPurchasePoints.label}
      </span>
    </Link>
  );
};

export default PurchasePointsFab;
