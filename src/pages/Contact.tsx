import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Instagram, Facebook, Clock, MapPin, Mail, Send, Building2, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

const SEND_ENDPOINT = "/api/send";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const { toast } = useToast();
  const { t, dir } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? "").trim(); // honeypot

    if (!name || !email || !message) {
      toast({ title: t.contact.errorTitle, description: t.contact.errorFillAll, variant: "destructive" });
      return;
    }

    if (!EMAIL_RE.test(email)) {
      toast({ title: t.contact.errorTitle, description: t.contact.errorInvalidEmail, variant: "destructive" });
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(SEND_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const result = await res.json().catch(() => ({ success: false }));

      if (res.ok && result.success) {
        form.reset();
        setStatus("success");
        toast({ title: t.contact.thankYou, description: t.contact.thankYouDesc });
      } else {
        setStatus("idle");
        toast({ title: t.contact.errorTitle, description: t.contact.errorSendFailed, variant: "destructive" });
      }
    } catch {
      setStatus("idle");
      toast({ title: t.contact.errorTitle, description: t.contact.errorSendFailed, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />

      <main className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              {t.contact.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.contact.subtitle}
            </p>
          </div>

          <div
            id="itamar-business"
            className="mb-8 rounded-2xl border-2 border-primary bg-primary/5 p-8 text-center shadow-sm md:p-10"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">{t.contact.itamarBusinessTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">{t.contact.itamarBusinessSubtitle}</p>
            <a href="tel:0509766643" className="mt-6 inline-block">
              <span className="sr-only">{t.contact.itamarBusinessTitle}</span>
              <span
                className="block rounded-2xl bg-primary px-8 py-4 text-2xl font-bold tracking-wide text-primary-foreground shadow-md transition-colors hover:bg-primary-hover md:text-3xl"
                dir="ltr"
              >
                050-976-6643
              </span>
            </a>
            <p className="mt-4 text-xs font-medium text-muted-foreground md:text-sm">{t.contact.itamarCallHint}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{t.contact.generalInquiriesTitle}</h3>
              <p className="text-muted-foreground text-sm mb-4">{t.contact.generalInquiriesSubtitle}</p>
              <a href="mailto:kube8eliyahu@gmail.com">
                <Button type="button" className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 gap-2 w-full">
                  <Mail className="w-4 h-4" />
                  kube8eliyahu@gmail.com
                </Button>
              </a>
            </div>

            <div className="bg-card rounded-xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{t.contact.instagramTitle}</h3>
              <p className="text-muted-foreground text-sm mb-4">{t.contact.instagramSubtitle}</p>
              <a href="https://www.instagram.com/kube_eliyahu?igsh=MXBpM3I1eHNvNXFyOA==" target="_blank" rel="noopener noreferrer">
                <Button type="button" className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 gap-2">
                  <Instagram className="w-4 h-4" />
                  @kube_eliyahu
                </Button>
              </a>
            </div>

            <div className="bg-card rounded-xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Facebook className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{t.contact.facebookTitle}</h3>
              <p className="text-muted-foreground text-sm mb-4">{t.contact.facebookSubtitle}</p>
              <a href="https://www.facebook.com/profile.php?id=100075824275094" target="_blank" rel="noopener noreferrer">
                <Button type="button" className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 gap-2">
                  <Facebook className="w-4 h-4" />
                  קובה אליהו
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-8 bg-card rounded-xl p-8 text-center shadow-sm">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">{t.contact.storeLocationsTitle}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t.contact.storeLocationsSubtitle}</p>
            <Link to="/store-locations">
              <Button type="button" className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 gap-2">
                <MapPin className="w-4 h-4" />
                {t.contact.allStoreLocations}
              </Button>
            </Link>
          </div>

          <div className="mt-12 bg-card rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="text-center mb-8">
              <Send className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">{t.contact.formTitle}</h2>
              <p className="text-muted-foreground text-sm">{t.contact.formSubtitle}</p>
            </div>

            {status === "success" ? (
              <div className="max-w-lg mx-auto text-center py-8" role="status" aria-live="polite">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-9 h-9 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t.contact.thankYou}</h3>
                <p className="text-muted-foreground text-sm mb-6">{t.contact.thankYouDesc}</p>
                <Button
                  type="button"
                  onClick={() => setStatus("idle")}
                  variant="outline"
                  className="rounded-full px-6"
                >
                  {t.contact.sendAnother}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5 max-w-lg mx-auto" noValidate>
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
                >
                  <label htmlFor="contact-company">Company</label>
                  <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="contact-name">
                    {t.contact.nameLabel}
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    maxLength={100}
                    placeholder={t.contact.namePlaceholder}
                    className="rounded-lg"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="contact-email">
                    {t.contact.emailLabel}
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    placeholder={t.contact.emailPlaceholder}
                    className="rounded-lg"
                    dir="ltr"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="contact-message">
                    {t.contact.messageLabel}
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    maxLength={5000}
                    placeholder={t.contact.messagePlaceholder}
                    className="rounded-lg min-h-[120px]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary-hover rounded-full py-3 text-base font-semibold gap-2 disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t.contact.send}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="mt-12 bg-primary rounded-2xl p-8 md:p-12 text-center">
            <Clock className="w-10 h-10 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary-foreground mb-6">
              {t.contact.hoursTitle}
            </h2>
            <div className="space-y-3 text-primary-foreground/90">
              <div className="flex justify-center gap-8">
                <span>{t.contact.sunToThu}</span>
                <span className="font-medium">09:00 - 15:00</span>
              </div>
              <div className="flex justify-center gap-8">
                <span>{t.contact.friday}</span>
                <span className="font-medium">{t.contact.closed}</span>
              </div>
              <div className="flex justify-center gap-8">
                <span>{t.contact.saturday}</span>
                <span className="font-medium">{t.contact.closed}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
