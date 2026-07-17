import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Accessibility,
  ALargeSmall,
  Contrast,
  Droplets,
  Link2,
  Type,
  Pause,
  MousePointer2,
  RotateCcw,
  X,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const STORAGE_KEY = "kube-a11y-settings";

type A11ySettings = {
  fontScale: number;
  highContrast: boolean;
  grayscale: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
  stopAnimations: boolean;
  bigCursor: boolean;
};

const DEFAULT_SETTINGS: A11ySettings = {
  fontScale: 0,
  highContrast: false,
  grayscale: false,
  underlineLinks: false,
  readableFont: false,
  stopAnimations: false,
  bigCursor: false,
};

const applySettings = (settings: A11ySettings) => {
  const root = document.documentElement;
  root.classList.toggle("a11y-high-contrast", settings.highContrast);
  root.classList.toggle("a11y-grayscale", settings.grayscale);
  root.classList.toggle("a11y-underline-links", settings.underlineLinks);
  root.classList.toggle("a11y-readable-font", settings.readableFont);
  root.classList.toggle("a11y-stop-animations", settings.stopAnimations);
  root.classList.toggle("a11y-big-cursor", settings.bigCursor);

  if (settings.fontScale === 0) {
    root.style.removeProperty("font-size");
  } else {
    root.style.fontSize = `${100 + settings.fontScale * 12.5}%`;
  }
};

const loadSettings = (): A11ySettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

const AccessibilityWidget = () => {
  const { t, dir } = useLanguage();
  const w = t.a11yWidget;
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const saved = loadSettings();
    setSettings(saved);
    applySettings(saved);
  }, []);

  const update = useCallback((patch: Partial<A11ySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      applySettings(next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = (key: keyof Omit<A11ySettings, "fontScale">) => {
    update({ [key]: !settings[key] });
  };

  const actions: {
    key: string;
    label: string;
    icon: ReactNode;
    active?: boolean;
    onClick: () => void;
  }[] = [
    {
      key: "inc",
      label: w.increaseText,
      icon: <ALargeSmall className="h-5 w-5" />,
      onClick: () => update({ fontScale: Math.min(settings.fontScale + 1, 3) }),
    },
    {
      key: "dec",
      label: w.decreaseText,
      icon: <Type className="h-5 w-5" />,
      onClick: () => update({ fontScale: Math.max(settings.fontScale - 1, -1) }),
    },
    {
      key: "contrast",
      label: w.highContrast,
      icon: <Contrast className="h-5 w-5" />,
      active: settings.highContrast,
      onClick: () => toggle("highContrast"),
    },
    {
      key: "gray",
      label: w.grayscale,
      icon: <Droplets className="h-5 w-5" />,
      active: settings.grayscale,
      onClick: () => toggle("grayscale"),
    },
    {
      key: "links",
      label: w.underlineLinks,
      icon: <Link2 className="h-5 w-5" />,
      active: settings.underlineLinks,
      onClick: () => toggle("underlineLinks"),
    },
    {
      key: "font",
      label: w.readableFont,
      icon: <Type className="h-5 w-5" />,
      active: settings.readableFont,
      onClick: () => toggle("readableFont"),
    },
    {
      key: "anim",
      label: w.stopAnimations,
      icon: <Pause className="h-5 w-5" />,
      active: settings.stopAnimations,
      onClick: () => toggle("stopAnimations"),
    },
    {
      key: "cursor",
      label: w.bigCursor,
      icon: <MousePointer2 className="h-5 w-5" />,
      active: settings.bigCursor,
      onClick: () => toggle("bigCursor"),
    },
  ];

  return (
    <div className="fixed bottom-4 end-4 z-[60] flex flex-col items-end gap-2" dir={dir}>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={w.title}
          className="w-[min(100vw-2rem,20rem)] rounded-xl border border-border bg-card text-card-foreground shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="font-serif text-lg font-semibold">{w.title}</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label={w.closeLabel}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 p-3">
            {actions.map((action) => (
              <button
                key={action.key}
                type="button"
                onClick={action.onClick}
                className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center text-xs font-medium transition-colors ${
                  action.active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                {action.icon}
                <span className="leading-tight">{action.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2 border-t border-border p-3">
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setSettings(DEFAULT_SETTINGS);
                applySettings(DEFAULT_SETTINGS);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" />
              {w.reset}
            </button>
            <Link
              to="/accessibility-statement"
              onClick={() => setOpen(false)}
              className="block text-center text-sm text-primary hover:underline"
            >
              {w.statementLink}
            </Link>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label={open ? w.closeLabel : w.openLabel}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <Accessibility className="h-7 w-7" aria-hidden />
        </button>
        <span className="rounded bg-card/90 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground shadow-sm">
          {w.escHint}
        </span>
      </div>
    </div>
  );
};

export default AccessibilityWidget;
