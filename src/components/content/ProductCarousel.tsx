import { Link } from "react-router-dom";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import packSelek from "@/assets/pack-kubbeh-selek.png";
import packNablusia from "@/assets/pack-kubbeh-nablusia.png";

const packSiska = "/lovable-uploads/81d2b6a5-82d1-4cb2-8b56-06b2b039c52d.png";
const packCigarMoroccan = "/lovable-uploads/1f2b4cf8-c731-4a26-87d3-ababd25d5583.png";
const packCigarSiska = "/lovable-uploads/656b79e4-174e-47c3-ab34-3e6e273afa3e.png";

const productImages = [packSelek, packSiska, packNablusia, packCigarMoroccan, packCigarSiska];
const productSlugs = ["kubeh-selek", "kubeh-siska", undefined, undefined, undefined];
const productIsNew = [false, true, false, true, false];

const ProductCarousel = () => {
  const { t, lang, dir } = useLanguage();
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;

  const products = t.carousel.products.map((p, i) => ({
    id: i + 1,
    name: p.name,
    description: p.description,
    image: productImages[i],
    isNew: productIsNew[i],
    slug: productSlugs[i],
  }));

  const allItems = [...products, ...products, ...products];

  const CardContent = ({ product }: { product: typeof products[0] }) => (
    <>
      <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted/10 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
            {t.carousel.newBadge}
          </div>
        )}
        {product.slug && (
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
              {t.carousel.detailsAndRecipe}
              <Arrow className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>
      <div className="space-y-1" dir={dir}>
        <h3 className="font-serif text-base font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>
    </>
  );

  return (
    <section className="w-full py-12 px-6" dir={dir}>
      <AnimateOnScroll>
        <div className="max-w-5xl mx-auto mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            {t.carousel.title}
          </h2>
        </div>
      </AnimateOnScroll>
      <div className="w-full overflow-hidden" dir="ltr">
        <div
          className="flex gap-5 animate-marquee"
          style={{ width: "max-content" }}
        >
          {allItems.map((product, i) => (
            product.slug ? (
              <Link
                key={`${product.id}-${i}`}
                to={`/products/${product.slug}`}
                className="w-[160px] sm:w-[190px] md:w-[220px] flex-shrink-0 group cursor-pointer"
              >
                <CardContent product={product} />
              </Link>
            ) : (
              <div
                key={`${product.id}-${i}`}
                className="w-[160px] sm:w-[190px] md:w-[220px] flex-shrink-0 group cursor-pointer"
              >
                <CardContent product={product} />
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
