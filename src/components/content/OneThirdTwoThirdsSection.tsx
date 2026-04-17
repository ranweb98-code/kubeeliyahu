import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const OneThirdTwoThirdsSection = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="w-full py-16 px-6 bg-primary text-primary-foreground" dir={dir}>
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-3">
            {t.testimonials.title}
          </h2>
          <p className="text-primary-foreground/70">
            {t.testimonials.subtitle}
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.items.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 150}>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 space-y-4 h-full border border-primary-foreground/10">
                <Quote className="w-8 h-8 text-accent opacity-70" />
                <p className="text-primary-foreground/90 leading-relaxed text-sm">
                  {item.text}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold text-sm">{item.name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OneThirdTwoThirdsSection;
