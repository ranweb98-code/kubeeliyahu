import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import kubbeh6 from "@/assets/kubbeh-6.jpg";
import kubbeh8 from "@/assets/kubbeh-8.jpg";
import grandmaIllustration from "@/assets/grandma-illustration-new.png";

const About = () => {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      
      <main className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.about.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>

          <div className="space-y-16">
            <div className="flex justify-center">
              <img
                src={grandmaIllustration}
                alt={t.about.grandmaAlt}
                className="w-72 md:w-[22rem] h-auto object-contain"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-lg overflow-hidden aspect-[4/3]">
                <img src={kubbeh6} alt={t.about.section1Title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-foreground">{t.about.section1Title}</h2>
                <p className="text-muted-foreground leading-relaxed">{t.about.section1P1}</p>
                <p className="text-muted-foreground leading-relaxed">{t.about.section1P2}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 md:order-first order-last">
                <h2 className="font-serif text-2xl font-bold text-foreground">{t.about.section2Title}</h2>
                <p className="text-muted-foreground leading-relaxed">{t.about.section2P}</p>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {t.about.qualityLabels.map((q, i) => (
                    <div key={i} className="text-center p-4 bg-secondary rounded-lg">
                      <p className="font-serif text-xl font-bold text-primary">{q.title}</p>
                      <p className="text-xs text-muted-foreground">{q.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg overflow-hidden aspect-[4/3]">
                <img src={kubbeh8} alt={t.about.section2Title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
