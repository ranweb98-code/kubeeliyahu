import { useEffect, useRef, useState } from "react";

interface SplashScreenProps {
  onLeaveStart?: () => void;
  onFinish: () => void;
}

const VISIBLE_MS = 3000;
const FADE_MS = 700;
const CONTENT_LEAD_MS = 600;

// Matches the cream background baked into the splash video, so there is no
// flash before the video paints and no visible seam around it.
const CREAM_BG = "#E9E0C1";

const SplashScreen = ({ onLeaveStart, onFinish }: SplashScreenProps) => {
  const [leaving, setLeaving] = useState(false);

  // Keep refs so the one-time effect always calls the latest callbacks
  // without restarting when the parent re-renders.
  const onLeaveStartRef = useRef(onLeaveStart);
  const onFinishRef = useRef(onFinish);
  useEffect(() => { onLeaveStartRef.current = onLeaveStart; }, [onLeaveStart]);
  useEffect(() => { onFinishRef.current = onFinish; }, [onFinish]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Mount the page content while the splash still fully covers the screen,
    // so React settles before the visual fade begins (avoids jank).
    const contentTimer = window.setTimeout(() => {
      onLeaveStartRef.current?.();
    }, VISIBLE_MS - CONTENT_LEAD_MS);
    const fadeTimer = window.setTimeout(() => {
      setLeaving(true);
    }, VISIBLE_MS);
    const doneTimer = window.setTimeout(() => {
      document.body.style.overflow = prev;
      onFinishRef.current();
    }, VISIBLE_MS + FADE_MS);

    return () => {
      window.clearTimeout(contentTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = prev;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run exactly once — callbacks accessed via refs

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="קובה אליהו — טוען"
      className={`fixed inset-0 z-[9999] overflow-hidden transition-opacity ease-out ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms`, backgroundColor: CREAM_BG }}
    >
      <video
        src="/videos/splash.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
};

export default SplashScreen;
