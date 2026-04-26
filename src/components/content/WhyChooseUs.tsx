import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Heart, Leaf, ChefHat, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [ChefHat, Leaf, Heart, Users];

const WhyChooseUs = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="w-full py-20 px-6 bg-secondary/50" dir={dir}>
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <video
            src="/videos/kubbeh.mov"
            autoPlay
            loop
            muted
            playsInline
            className="mx-auto h-auto w-full max-w-[420px] rounded-3xl md:max-w-2xl md:shadow-lg lg:max-w-3xl xl:max-w-4xl"
            aria-label={t.whyChoose.videoAria}
          />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 mt-6">
            {t.whyChoose.title}
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            {t.whyChoose.subtitle}
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {t.whyChoose.features.map((f, i) => {
            const Icon = icons[i];
            return (
              <AnimateOnScroll key={i} delay={i * 120}>
                <div className="rotating-border bg-card rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">
                    {f.title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
