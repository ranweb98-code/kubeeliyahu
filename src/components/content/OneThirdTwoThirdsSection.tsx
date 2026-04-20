import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const OneThirdTwoThirdsSection = () => {
  const { t, dir } = useLanguage();

  return (
    <section
      className="w-full bg-[hsl(var(--testimonials-cream))] py-16 text-[hsl(var(--testimonials-foreground))] px-6"
      dir={dir}
    >
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-3 text-foreground">
            {t.testimonials.title}
          </h2>
          <p className="text-primary/75">
            {t.testimonials.subtitle}
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.items.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 150}>
              <div className="h-full space-y-4 rounded-xl border border-primary/15 bg-[hsl(var(--testimonials-cream-card))] p-6 shadow-sm">
                <Quote className="h-8 w-8 text-primary opacity-80" />
                <p className="text-sm leading-relaxed text-foreground/90">
                  {item.text}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-primary">{item.name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" />
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
