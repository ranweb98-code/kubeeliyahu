import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import packSelek from "@/assets/pack-kubbeh-selek.png";
import packSiska from "@/assets/pack-kubbeh-siska.png";
import packNablusia from "@/assets/pack-kubbeh-nablusia.png";
const packCigarMoroccan = "/lovable-uploads/1f2b4cf8-c731-4a26-87d3-ababd25d5583.png";
const packCigarSiska = "/lovable-uploads/656b79e4-174e-47c3-ab34-3e6e273afa3e.png";

const productImages = [packSelek, "/lovable-uploads/81d2b6a5-82d1-4cb2-8b56-06b2b039c52d.png", packNablusia, packCigarMoroccan, packCigarSiska];
const productSlugs = ["kubeh-selek", "kubeh-siska", undefined, undefined, undefined];

const Products = () => {
  const { t, dir } = useLanguage();

  const products = t.products.items.map((item, i) => ({
    id: i + 1,
    name: item.name,
    subtitle: item.subtitle,
    description: item.description,
    image: productImages[i],
    slug: productSlugs[i],
  }));

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />

      <main className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">
                {t.products.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t.products.subtitle}
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product, i) => (
              <AnimateOnScroll key={product.id} delay={i * 120}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 group">
                  {product.slug ? (
                    <Link to={`/products/${product.slug}`}>
                      <div className="aspect-[3/4] overflow-hidden bg-muted/5 p-4 flex items-center justify-center">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </Link>
                  ) : (
                    <div className="aspect-[3/4] overflow-hidden bg-muted/5 p-4 flex items-center justify-center">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5 space-y-2 text-center">
                    {product.slug ? (
                      <Link to={`/products/${product.slug}`} className="hover:text-primary transition-colors">
                        <h3 className="font-serif text-xl font-bold text-foreground">{product.name}</h3>
                      </Link>
                    ) : (
                      <h3 className="font-serif text-xl font-bold text-foreground">{product.name}</h3>
                    )}
                    <p className="text-primary font-semibold text-sm">{product.subtitle}</p>
                    <p className="text-muted-foreground text-sm">{product.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <div className="text-center bg-primary rounded-2xl p-8 md:p-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                {t.products.wantToOrder}
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                {t.products.callUs}
              </p>
              <Link to="/store-locations">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-6 text-base font-medium gap-2">
                  <MapPin className="w-5 h-5" />
                  {t.products.findStoreCta}
                </Button>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
