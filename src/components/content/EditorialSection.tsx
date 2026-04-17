import { useEffect, useRef, useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";

const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-accent mb-2">
        +{count}{suffix}
      </p>
    </div>
  );
};

const statTargets = [12, 80, 5000];

const EditorialSection = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="w-full py-20 px-6" dir={dir}>
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="mb-16">
          <div className="bg-primary rounded-2xl p-6 md:p-14 overflow-hidden">
            <div className="grid grid-cols-3 gap-6">
              {t.editorial.stats.map((s, i) => (
                <div key={i} className="text-center">
                  <CountUp target={statTargets[i]} />
                  <p className="text-primary-foreground/80 text-sm md:text-base mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default EditorialSection;
