import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  COOKIE_CONSENT_EVENT,
  getCookieConsent,
} from "@/lib/cookieConsent";

const PIXEL_ID = "1464062874443059";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: Window["fbq"];
  }
}

function initMetaPixel() {
  if (window.fbq) return;

  const fbq: NonNullable<Window["fbq"]> = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue?.push(args);
    }
  };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;

  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(script, first);

  window.fbq("init", PIXEL_ID);
}

const MetaPixel = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const trackPageView = () => {
      if (getCookieConsent() !== "accepted") return;
      initMetaPixel();
      window.fbq?.("track", "PageView");
    };

    trackPageView();

    const onConsent = (event: Event) => {
      if ((event as CustomEvent<string>).detail === "accepted") {
        trackPageView();
      }
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent);
  }, [pathname, search]);

  return null;
};

export default MetaPixel;
