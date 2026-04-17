import heroImage from "@/assets/kubbeh-1.jpg";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const LargeHero = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="relative w-full mb-0 overflow-hidden" dir={dir}>
      <div className="relative w-full h-[100vh] min-h-[600px]">
        <img
          src={heroImage}
          alt={t.hero.title}
          className="w-full h-full object-cover animate-[scale-in_1.2s_ease-out]"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 animate-hero-slide-up" style={{ animationDelay: "0.2s" }}>
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2 font-light animate-hero-slide-up" style={{ animationDelay: "0.5s" }}>
            {t.hero.subtitle}
          </p>
          <p className="text-base md:text-lg text-white/70 mb-8 max-w-md animate-hero-slide-up" style={{ animationDelay: "0.7s" }}>
            {t.hero.description}
          </p>
          <div className="animate-hero-slide-up" style={{ animationDelay: "0.9s" }}>
            <a href="https://wa.me/972509766643" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 py-6 text-lg font-semibold gap-2 shadow-lg">
                <Phone className="w-5 h-5" />
                {t.hero.orderNow}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LargeHero;
