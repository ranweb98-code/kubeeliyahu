import { Link } from "react-router-dom";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import fiftyFiftyImage from "@/assets/fifty-fifty-image.jpg";
import kubbeh3 from "@/assets/kubbeh-3.jpg";

const FiftyFiftySection = () => {
  const { t, lang, dir } = useLanguage();
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;

  return (
    <section className="w-full py-16 px-6" dir={dir}>
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t.fiftyFifty.title}
          </h2>
          <p className="text-muted-foreground text-base">
            {t.fiftyFifty.subtitle}
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { image: fiftyFiftyImage, slug: "kubeh-selek", idx: 0 },
            { image: kubbeh3, slug: "kubeh-siska", idx: 1 },
          ].map(({ image, slug, idx }) => (
            <AnimateOnScroll key={slug} delay={idx * 150}>
              <Link to={`/products/${slug}`} className="group block">
                <div className="w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg relative">
                  <img
                    src={image}
                    alt={t.fiftyFifty.products[idx].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                    <span className="bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium px-4 py-2 rounded-full flex items-center gap-1.5">
                      {t.fiftyFifty.detailsAndRecipe}
                      <Arrow className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                  {t.fiftyFifty.products[idx].name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t.fiftyFifty.products[idx].description}
                </p>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FiftyFiftySection;
