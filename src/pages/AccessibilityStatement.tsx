import { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const AccessibilityStatement = () => {
  const { t, dir } = useLanguage();
  const a = t.accessibility;

  useEffect(() => {
    document.title = a.documentTitle;
  }, [a.documentTitle]);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />

      <main id="main-content" className="pt-32" tabIndex={-1}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">{a.pageTitle}</h1>
            <p className="text-muted-foreground">{a.updatedText}</p>
          </header>

          <div className="space-y-10 text-start">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{a.introTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">{a.introP1}</p>
              <p className="text-muted-foreground leading-relaxed">{a.introP2}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{a.siteTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">{a.siteP1}</p>
              <p className="text-muted-foreground leading-relaxed mb-3">{a.siteP2}</p>
              <p className="text-muted-foreground leading-relaxed mb-3">{a.siteP3}</p>
              <p className="text-muted-foreground leading-relaxed">{a.siteP4}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{a.howTitle}</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 leading-relaxed">
                {a.howItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{a.keyboardTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">{a.keyboardP1}</p>
              <p className="text-muted-foreground leading-relaxed mb-2">{a.keyboardP2}</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>{a.keyboardIncrease}</li>
                <li>{a.keyboardDecrease}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{a.contactTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">{a.contactP}</p>
              <a
                href={`mailto:${a.contactEmail}`}
                className="text-primary font-medium hover:underline"
              >
                {a.contactEmail}
              </a>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{a.updatedTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">{a.updatedText}</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessibilityStatement;
