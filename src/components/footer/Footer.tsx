import { Phone, Instagram, Facebook, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const { t, dir } = useLanguage();

  return (
    <footer className="w-full bg-primary text-primary-foreground pt-16 pb-6 px-6 mt-24" dir={dir}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="text-center md:text-start">
            <img src={logo} alt="קובה אליהו" className="h-20 w-auto rounded-full mb-4 mx-auto md:mx-0" />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {t.footer.brandDescription}
            </p>
            <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
              <a href="https://www.instagram.com/kube_eliyahu?igsh=MXBpM3I1eHNvNXFyOA==" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100075824275094" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-start">
            <h4 className="font-serif text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <Link to="/" className="block hover:text-primary-foreground transition-colors">{t.nav.home}</Link>
              <Link to="/products" className="block hover:text-primary-foreground transition-colors">{t.nav.products}</Link>
              <Link to="/about" className="block hover:text-primary-foreground transition-colors">{t.nav.about}</Link>
              <Link to="/contact" className="block hover:text-primary-foreground transition-colors">{t.nav.contact}</Link>
              <Link to="/store-locations" className="block hover:text-primary-foreground transition-colors">{t.nav.storeLocations}</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-start">
            <h4 className="font-serif text-lg font-semibold mb-4">{t.footer.contactTitle}</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="rounded-lg border border-primary-foreground/25 bg-primary-foreground/5 px-3 py-2 text-start">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/90">
                  {t.contact.itamarBusinessTitle}
                </p>
                <a href="tel:0509766643" className="mt-1 flex items-center gap-2 font-semibold hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span dir="ltr">050-976-6643</span>
                </a>
                <p className="mt-1 text-xs text-primary-foreground/70">{t.contact.itamarCallHint}</p>
              </div>
              <a href="mailto:kube8eliyahu@gmail.com" className="flex items-center gap-2 justify-center md:justify-start hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>kube8eliyahu@gmail.com</span>
              </a>
              <a href="https://www.instagram.com/kube_eliyahu?igsh=MXBpM3I1eHNvNXFyOA==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center md:justify-start hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                <span>@kube_eliyahu</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100075824275094" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center md:justify-start hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4 flex-shrink-0" />
                <span>קובה אליהו</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="text-center md:text-start">
            <h4 className="font-serif text-lg font-semibold mb-4">{t.footer.hoursTitle}</h4>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <p>{t.footer.sunToThu}</p>
              <p>{t.footer.friday}</p>
              <p>{t.footer.saturday}</p>
            </div>
            <div className="mt-4">
              <Link to="/store-locations" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors font-medium">
                <MapPin className="w-4 h-4" />
                {t.footer.storeLocationsLink}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-4 text-center">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
