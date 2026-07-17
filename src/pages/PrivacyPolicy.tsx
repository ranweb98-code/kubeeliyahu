import { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const PrivacyPolicy = () => {
  const { t, dir } = useLanguage();
  const p = t.privacy;

  useEffect(() => {
    document.title = p.documentTitle;
  }, [p.documentTitle]);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />

      <main id="main-content" className="pt-32" tabIndex={-1}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">{p.pageTitle}</h1>
            <p className="text-muted-foreground">{p.lastUpdated}</p>
          </header>

          <div className="space-y-10 text-start">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{p.introTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">{p.introP}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{p.collectTitle}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">{p.collectPersonalTitle}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">{p.collectPersonalP}</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {p.collectPersonalItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">{p.collectUsageTitle}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.collectUsageP}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{p.useTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">{p.useP}</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {p.useItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{p.shareTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">{p.shareP}</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {p.shareItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{p.cookiesTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">{p.cookiesP}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{p.securityTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">{p.securityP}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{p.rightsTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">{p.rightsP}</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {p.rightsItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{p.changesTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">{p.changesP}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{p.contactTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">{p.contactP}</p>
              <div className="text-muted-foreground space-y-1">
                <p>{p.contactBrand}</p>
                <a href={`mailto:${p.contactEmail}`} className="text-primary font-medium hover:underline">
                  {p.contactEmail}
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
