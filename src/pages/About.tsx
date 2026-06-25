import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import kubbeh6 from "@/assets/kubbeh-6.jpg";
import kubbeh8 from "@/assets/kubbeh-8.jpg";

const About = () => {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      
      <main className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.about.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>

          <div className="space-y-16">
            <div
              dir="ltr"
              className="grid grid-cols-1 md:grid-cols-[minmax(0,22rem)_1fr] gap-10 md:gap-12 lg:gap-16 items-center"
            >
              <div className="flex justify-center md:justify-start">
                <div className="w-72 md:w-full max-w-[22rem] aspect-[1504/1376] overflow-hidden bg-background isolate [transform:translateZ(0)]">
                  <video
                    src="/videos/grandma-about.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={t.about.grandmaAlt}
                    className="block h-full w-full bg-background object-cover"
                    style={{ backgroundColor: "hsl(var(--background))" }}
                  />
                </div>
              </div>

              <div className="space-y-5" dir={dir}>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug">
                  {t.about.grandmaSectionTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-[1.05rem]">
                  {t.about.grandmaSectionP1}
                </p>
                <p className="text-muted-foreground leading-relaxed text-base md:text-[1.05rem]">
                  {t.about.grandmaSectionP2}
                </p>
                <p className="text-muted-foreground leading-relaxed text-base md:text-[1.05rem]">
                  {t.about.grandmaSectionP3}
                </p>
              </div>
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
