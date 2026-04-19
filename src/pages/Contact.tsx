import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Instagram, Facebook, Clock, MapPin, Mail, Send, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const { t, dir } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !message.trim()) {
      toast({ title: t.contact.errorTitle, description: t.contact.errorFillAll, variant: "destructive" });
      return;
    }

    if (!/^[\d\-+() ]{7,15}$/.test(phone.trim())) {
      toast({ title: t.contact.errorTitle, description: t.contact.errorInvalidPhone, variant: "destructive" });
      return;
    }

    setIsSending(true);
    const endpoint = import.meta.env.VITE_CONTACT_API_URL?.trim() || "/api/contact";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        if (data.error === "missing_resend_api_key") {
          toast({
            title: t.contact.errorTitle,
            description: t.contact.errorServerConfig,
            variant: "destructive",
          });
        } else {
          toast({
            title: t.contact.errorTitle,
            description: t.contact.errorSendFailed,
            variant: "destructive",
          });
        }
        return;
      }

      toast({ title: t.contact.thankYou, description: t.contact.thankYouDesc });
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      toast({
        title: t.contact.errorTitle,
        description: t.contact.errorNetwork,
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
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
                <Button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 gap-2 w-full">
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
                <Button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 gap-2">
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
                <Button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 gap-2">
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
              <Button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 gap-2">
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
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed md:text-sm">{t.contact.formHowItWorks}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact.nameLabel}</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.contact.namePlaceholder}
                  className="rounded-lg"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact.phoneLabel}</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="050-000-0000"
                  className="rounded-lg"
                  dir="ltr"
                  maxLength={15}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact.messageLabel}</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contact.messagePlaceholder}
                  className="rounded-lg min-h-[120px]"
                  maxLength={1000}
                />
              </div>
              <Button
                type="submit"
                disabled={isSending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary-hover rounded-full py-3 text-base font-semibold gap-2"
              >
                <Send className="w-4 h-4" />
                {isSending ? t.contact.sending : t.contact.send}
              </Button>
            </form>
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
