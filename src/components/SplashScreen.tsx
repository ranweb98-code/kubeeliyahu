import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpg";

interface SplashScreenProps {
  onFinish: () => void;
}

const VISIBLE_MS = 3200;
const FADE_MS = 700;

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fadeTimer = window.setTimeout(() => setLeaving(true), VISIBLE_MS);
    const doneTimer = window.setTimeout(onFinish, VISIBLE_MS + FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onFinish]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="קובה אליהו — טוען"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary transition-opacity ease-out ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <img
        src={logo}
        alt="קובה אליהו"
        className="h-24 w-24 rounded-full shadow-2xl ring-4 ring-white/20 md:h-28 md:w-28"
      />

      <video
        src="/videos/loading.webm"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="mt-6 h-28 w-auto mix-blend-screen md:h-32"
      />
    </div>
  );
};

export default SplashScreen;
