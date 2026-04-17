import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const InstagramCTA = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="w-full py-16 px-6" dir={dir}>
      <AnimateOnScroll>
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary to-primary-hover rounded-2xl p-10 md:p-14">
          <Instagram className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            {t.instagram.title}
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            {t.instagram.subtitle}
          </p>
          <a
            href="https://www.instagram.com/kube_eliyahu?igsh=MXBpM3I1eHNvNXFyOA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-6 text-lg font-semibold gap-2">
              <Instagram className="w-5 h-5" />
              @kube_eliyahu
            </Button>
          </a>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default InstagramCTA;
