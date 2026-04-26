import heroImage from "@/assets/kubbeh-1.jpg";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const LargeHero = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="relative w-full mb-0 overflow-hidden" dir={dir}>
      <div className="relative h-[min(100dvh,820px)] min-h-[560px] w-full md:h-[min(100dvh,920px)] md:min-h-[680px] lg:min-h-[780px] xl:min-h-[860px]">
        <img
          src={heroImage}
          alt={t.hero.title}
          className="h-full w-full object-cover animate-[scale-in_1.2s_ease-out]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center sm:px-8 md:px-10">
          <h1
            className="mb-4 animate-hero-slide-up text-4xl font-extrabold text-white sm:text-5xl md:mb-5 md:text-7xl lg:mb-6 lg:text-8xl xl:text-9xl"
            style={{ animationDelay: "0.2s" }}
          >
            {t.hero.title}
          </h1>
          <p
            className="mb-2 animate-hero-slide-up text-lg font-light text-white/90 sm:text-xl md:mb-3 md:text-2xl lg:text-3xl xl:text-4xl"
            style={{ animationDelay: "0.5s" }}
          >
            {t.hero.subtitle}
          </p>
          <p
            className="mb-8 max-w-md animate-hero-slide-up text-base text-white/70 md:mb-10 md:max-w-xl md:text-lg lg:mb-12 lg:max-w-2xl lg:text-xl"
            style={{ animationDelay: "0.7s" }}
          >
            {t.hero.description}
          </p>
          <div className="animate-hero-slide-up" style={{ animationDelay: "0.9s" }}>
            <Link to="/store-locations">
              <Button
                size="lg"
                className="gap-2 rounded-full bg-accent px-8 py-5 text-base font-semibold text-accent-foreground shadow-lg hover:bg-accent/90 sm:px-10 sm:py-6 sm:text-lg md:px-12 md:py-7 md:text-xl lg:px-14 lg:py-8 lg:text-2xl"
              >
                <MapPin className="h-5 w-5 shrink-0 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                {t.hero.orderNow}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LargeHero;
