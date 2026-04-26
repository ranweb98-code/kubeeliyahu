import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const OneThirdTwoThirdsSection = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="w-full bg-primary py-16 text-white md:py-20" dir={dir}>
      <div className="mx-auto max-w-6xl px-6">
        <AnimateOnScroll className="mb-12 text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
            {t.testimonials.title}
          </h2>
          <p className="mx-auto max-w-xl text-base text-white/85 md:text-lg">
            {t.testimonials.subtitle}
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {t.testimonials.items.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 150}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-status-bar p-6 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.35)] md:p-8">
                <Quote
                  className="mb-4 h-9 w-9 shrink-0 text-testimonial-gold opacity-95"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <p className="flex-1 text-sm leading-relaxed text-white/95 md:text-[15px]">
                  {item.text}
                </p>
                <div className="mt-6 flex items-end justify-between gap-3 border-t border-white/10 pt-5">
                  <span className="text-sm font-semibold text-white">{item.name}</span>
                  <div className="flex shrink-0 gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-testimonial-gold text-testimonial-gold md:h-[18px] md:w-[18px]"
                      />
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
