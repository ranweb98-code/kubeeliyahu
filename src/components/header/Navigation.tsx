import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Instagram, Facebook, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/logo.jpg";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSolid = !isHome || isScrolled || isMobileMenuOpen;

  const navItems = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.products, href: "/products" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.contact, href: "/contact" },
    { name: t.nav.storeLocations, href: "/store-locations" },
  ];

  const toggleLang = () => setLang(lang === "he" ? "en" : "he");

  return (
    <nav
      dir={lang === "he" ? "rtl" : "ltr"}
      className={`relative transition-all duration-500 ${
        showSolid
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-20 px-6">
        {/* Right side (RTL) / Left side (LTR) - Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`story-link transition-colors text-sm font-medium ${
                showSolid
                  ? "text-foreground hover:text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={lang === "he" ? "תפריט" : "Menu"}
        >
          <div className="w-6 h-5 relative">
            <span className={`absolute block w-6 h-0.5 transition-all duration-300 ${
              showSolid ? "bg-foreground" : "bg-white"
            } ${isMobileMenuOpen ? "rotate-45 top-2" : "top-0"}`} />
            <span className={`absolute block w-6 h-0.5 top-2 transition-all duration-300 ${
              showSolid ? "bg-foreground" : "bg-white"
            } ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute block w-6 h-0.5 transition-all duration-300 ${
              showSolid ? "bg-foreground" : "bg-white"
            } ${isMobileMenuOpen ? "-rotate-45 top-2" : "top-4"}`} />
          </div>
        </button>

        {/* Center logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[60%] z-20">
          <img
            src={logo}
            alt="קובה אליהו"
            className={`rounded-full transition-all duration-500 shadow-lg ${
              showSolid
                ? "h-16 w-16 ring-4 ring-card/80"
                : "h-16 w-16 ring-4 ring-white/30"
            }`}
          />
        </Link>

        {/* Left side (RTL) / Right side (LTR) - Contact icons + lang toggle */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className={`p-2 transition-colors hover-scale flex items-center gap-1 text-xs font-semibold rounded-full ${
              showSolid ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
            }`}
            aria-label={lang === "he" ? "Switch to English" : "עבור לעברית"}
          >
            <Globe className="w-4 h-4" />
            <span>{lang === "he" ? "EN" : "עב"}</span>
          </button>
          <a
            href="https://www.facebook.com/profile.php?id=100075824275094"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 transition-colors hover-scale ${
              showSolid ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
            }`}
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/kube_eliyahu?igsh=MXBpM3I1eHNvNXFyOA=="
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 transition-colors hover-scale ${
              showSolid ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
            }`}
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <Link
            to="/contact"
            className={`p-2 transition-colors hover-scale ${
              showSolid ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
            }`}
            aria-label={lang === "he" ? "צור קשר" : "Contact"}
          >
            <Phone className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border z-50 animate-fade-in">
          <div className="px-6 py-6 space-y-4">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                to={item.href}
                className="block text-foreground hover:text-primary transition-colors text-lg font-medium py-2 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border animate-fade-in" style={{ animationDelay: "320ms", animationFillMode: "both" }}>
              <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                <Phone className="w-4 h-4" />
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
