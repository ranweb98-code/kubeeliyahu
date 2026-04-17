import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Phone, Instagram, Facebook, Clock, MapPin, Mail, Send } from "lucide-react";
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
    const subject = encodeURIComponent(`פנייה חדשה מ-${name.trim()}`);
    const body = encodeURIComponent(`שם: ${name.trim()}\nטלפון: ${phone.trim()}\n\nהודעה:\n${message.trim()}`);
    window.open(`mailto:kube8eliyahu@gmail.com?subject=${subject}&body=${body}`, "_blank");
    
    toast({ title: t.contact.thankYou, description: t.contact.thankYouDesc });
    setName("");
    setPhone("");
    setMessage("");
    setIsSending(false);
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{t.contact.phone}</h3>
              <p className="text-muted-foreground text-sm mb-4">{t.contact.phoneSubtitle}</p>
              <div className="space-y-2">
                <a href="tel:0509766643">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 gap-2 w-full">
                    <Phone className="w-4 h-4" />
                    <span dir="ltr">050-976-6643</span>
                  </Button>
                </a>
                <a href="tel:052092863">
                  <Button variant="outline" className="rounded-full px-6 gap-2 w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Phone className="w-4 h-4" />
                    <span dir="ltr">052-092-863</span>
                  </Button>
                </a>
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{t.contact.email}</h3>
              <p className="text-muted-foreground text-sm mb-4">{t.contact.emailSubtitle}</p>
              <a href="mailto:kube8eliyahu@gmail.com">
                <Button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 gap-2">
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
