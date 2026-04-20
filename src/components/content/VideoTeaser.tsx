import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Soup } from "lucide-react";

const VideoTeaser = () => {
  const { dir, t } = useLanguage();

  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      dir={dir}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(ellipse_80%_50%_at_100%_100%,hsl(var(--accent)/0.08),transparent_50%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <AnimateOnScroll>
          <div className="mb-10 text-center md:mb-14">
            <p className="mb-3 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
              <Soup className="h-4 w-4 text-accent" aria-hidden />
              {t.videoTeaser.kicker}
            </p>
            <h2 className="font-serif text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              {t.videoTeaser.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.videoTeaser.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/store-locations">
                <Button
                  size="lg"
                  className="gap-2 rounded-full bg-accent px-8 text-accent-foreground shadow-md transition-all hover:bg-accent/90 hover:shadow-lg"
                >
                  <MapPin className="h-5 w-5" />
                  {t.videoTeaser.cta}
                </Button>
              </Link>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={120}>
          {/* מובייל: 9:16 | מחשב: 16:9 — מסגרת רחבה יותר, מרווח מהשוליים, פינות מעוגלות */}
          <div className="relative mx-auto mt-2 w-full max-w-5xl px-3 sm:mt-0 sm:px-2 md:px-0">
            <div
              className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-br from-primary/20 via-accent/10 to-primary/10 blur-2xl sm:-inset-4 sm:rounded-[2rem] md:-inset-5"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-xl ring-1 ring-primary/10 sm:rounded-3xl">
              {/* רקע מותג + overflow; זום קל במובייל לפסים שחורים בקידוד */}
              <div className="relative aspect-[9/16] w-full min-w-0 overflow-hidden rounded-2xl bg-primary sm:rounded-3xl md:aspect-video pointer-events-none select-none">
                <video
                  src="/videos/pour-teaser.mp4"
                  className="absolute inset-0 h-full w-full rounded-2xl bg-primary object-cover object-center [transform:translateZ(0)] max-md:origin-center max-md:scale-[1.22] sm:rounded-3xl md:scale-100"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
            </div>
            <p className="mt-5 text-center text-xs text-muted-foreground">
              {t.videoTeaser.kicker} · {t.hero.subtitle}
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default VideoTeaser;
