import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Sparkles } from "lucide-react";

const VideoTeaser = () => {
  const { dir, t } = useLanguage();

  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      dir={dir}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(ellipse_80%_50%_at_100%_100%,hsl(var(--accent)/0.12),transparent_50%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <AnimateOnScroll>
          <div className="mb-10 text-center md:mb-14">
            <p className="mb-3 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden />
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
          <div className="relative mx-auto max-w-3xl">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/25 via-accent/15 to-primary/10 blur-2xl md:-inset-6"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 shadow-2xl ring-1 ring-primary/10 backdrop-blur-sm">
              <video
                src="/videos/pour-teaser.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                className="aspect-video w-full object-cover"
                aria-label={t.videoTeaser.videoAria}
              />
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              {t.videoTeaser.kicker} · {t.hero.subtitle}
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default VideoTeaser;
