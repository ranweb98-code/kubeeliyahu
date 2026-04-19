import { useParams, Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { MapPin, ArrowRight, ArrowLeft, Clock, ChefHat, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import packSelek from "@/assets/pack-kubbeh-selek.png";
import packSiska from "@/assets/pack-kubbeh-siska-new.png";

interface NutritionRow { label: string; value: string; }

interface ProductData {
  slug: string;
  name: string;
  subtitle: string;
  images: string[];
  weight: string;
  cookTime: string;
  about: string;
  ingredients: string[];
  instructions: string[];
  nutrition: NutritionRow[];
  allergens: string;
  mayContain: string;
}

const productsDataHe: ProductData[] = [
  {
    slug: "kubeh-siska",
    name: "קובה סיסקה למרק",
    subtitle: "מבשר מפורק",
    images: [packSiska],
    weight: "800 גרם",
    cookTime: "~10 דקות",
    about: "קובה אליהו הינו מאכל מסורתי הישר ממושב זכריה שבעמק האלה. הקובה בעל ניחוחות וטעמים מבית סבתא אוסנת. חוויה ייחודית של טעמים המעוררים געגועים לילדות מבית סבתא!",
    ingredients: ["1 בצל קצוץ","4 גבעולי מנגולד","חופן פטרוזיליה","דלעת מים / קישוא לפי עונה","2 כפיות פלפל שחור","2 כפיות מלח לפי טעם","לימון סחוט"],
    instructions: ["מטגנים בצל עד להשחמה.","מוסיפים את הגבעולים ודלעת, או קישוא, ומטגנים קלות לאחר מכן.","מוסיפים מים, מעט מעל גובה הירקות.","טוחנים בצד את העלים שנשארו.","מחכים לרתיחה, מוסיפים את העלים.","זורקים את הקובה, ומבשלים כ-10 דקות.","מוסיפים לימון לפי הטעם, וממתינים עוד 5 דקות."],
    nutrition: [
      { label: "אנרגיה (קלוריות)", value: "377" },{ label: "סך השומנים (גרם)", value: "20.7" },
      { label: "חומצות שומן רוויות (גרם)", value: "7.3" },{ label: "חומצות שומן טראנס (גרם)", value: "פחות מ-0.7" },
      { label: 'כולסטרול (מ"ג)', value: "57" },{ label: 'נתרן (מ"ג)', value: "795" },
      { label: "סך הפחמימות (גרם)", value: "29.2" },{ label: "סוכרים (גרם)", value: "2.6" },
      { label: "כפית סוכר", value: "0.75" },{ label: "סיבים תזונתיים (גרם)", value: "3.0" },
      { label: "חלבונים (גרם)", value: "17.0" },
    ],
    allergens: "חיטה-גלוטן, סלרי",
    mayContain: "סויה, צנוברים, שומשום, שעורה-גלוטן",
  },
  {
    slug: "kubeh-selek",
    name: "קובה למרק סלק",
    subtitle: "במילוי בשר בקר",
    images: [packSelek],
    weight: "800 גרם",
    cookTime: "~10 דקות",
    about: "קובה אליהו הינו מאכל מסורתי הישר ממושב זכריה שבעמק האלה. הקובה בעל ניחוחות וטעמים מבית סבתא אוסנת. חוויה ייחודית של טעמים המעוררים געגועים לילדות מבית סבתא!",
    ingredients: ["1 בצל קצוץ","4 סלקים קלופים חתוכים לרצועות","1 בטטה","3 גבעולי סלרי/מנגולד (אפשר להוסיף גם וגם)","כף רסק עגבניות","כפית פלפל שחור","שלוש כפות סוכר","כפית וחצי מלח (לפי הטעם)","לימון סחוט"],
    instructions: ["מטגנים בצל להשחמה, מוסיפים את הסלקים החתוכים וממלאים כ-2 ליטר מים רותחים.","(חשוב להשאיר מקום בסיר ולא למלא עד הסוף)","מוסיפים את התבלינים, לאחר רבע שעה מוסיפים את הבטטה והעלי ירק הטחופים.","כשהמרק מבעבע זורקים את הקובה ומבשלים כ-10 דקות, מכבים את הגז.","מוסיפים לימון סחוט לפי הטעם וממתינים עוד כ-5 דקות... ובתיאבון!"],
    nutrition: [
      { label: "אנרגיה (קלוריות)", value: "328" },{ label: "סך השומנים (גרם)", value: "17.0" },
      { label: "חומצות שומן רוויות (גרם)", value: "5.8" },{ label: "חומצות שומן טראנס (גרם)", value: "פחות מ-0.5" },
      { label: 'כולסטרול (מ"ג)', value: "43" },{ label: 'נתרן (מ"ג)', value: "601" },
      { label: "סך הפחמימות (גרם)", value: "28.2" },{ label: "סוכרים (גרם)", value: "1.9" },
      { label: "כפית סוכר", value: "0.75" },{ label: "סיבים תזונתיים (גרם)", value: "2.8" },
      { label: "חלבונים (גרם)", value: "14.1" },
    ],
    allergens: "חיטה-גלוטן",
    mayContain: "סלרי, סויה, צנוברים, שומשום, שעורה-גלוטן",
  },
];

const productsDataEn: ProductData[] = [
  {
    slug: "kubeh-siska",
    name: "Siska Kubbeh for Soup",
    subtitle: "Shredded Meat",
    images: [packSiska],
    weight: "800g",
    cookTime: "~10 min",
    about: "Kube Eliyahu is a traditional dish straight from Moshav Zechariah in the Elah Valley. The kubbeh carries the aromas and flavors from Grandma Osnat's kitchen. A unique taste experience that brings back childhood memories!",
    ingredients: ["1 chopped onion","4 chard stems","Handful of parsley","Squash / zucchini (seasonal)","2 tsp black pepper","2 tsp salt to taste","Squeezed lemon"],
    instructions: ["Fry onion until golden brown.","Add stems and squash/zucchini, sauté lightly.","Add water, slightly above the vegetables.","Blend remaining leaves on the side.","Wait for boil, add the leaves.","Add the kubbeh and cook for about 10 minutes.","Add lemon to taste and wait 5 more minutes."],
    nutrition: [
      { label: "Energy (calories)", value: "377" },{ label: "Total Fat (g)", value: "20.7" },
      { label: "Saturated Fat (g)", value: "7.3" },{ label: "Trans Fat (g)", value: "<0.7" },
      { label: "Cholesterol (mg)", value: "57" },{ label: "Sodium (mg)", value: "795" },
      { label: "Total Carbs (g)", value: "29.2" },{ label: "Sugars (g)", value: "2.6" },
      { label: "Teaspoon Sugar", value: "0.75" },{ label: "Dietary Fiber (g)", value: "3.0" },
      { label: "Protein (g)", value: "17.0" },
    ],
    allergens: "Wheat-Gluten, Celery",
    mayContain: "Soy, Pine nuts, Sesame, Barley-Gluten",
  },
  {
    slug: "kubeh-selek",
    name: "Beet Kubbeh for Soup",
    subtitle: "Beef Filling",
    images: [packSelek],
    weight: "800g",
    cookTime: "~10 min",
    about: "Kube Eliyahu is a traditional dish straight from Moshav Zechariah in the Elah Valley. The kubbeh carries the aromas and flavors from Grandma Osnat's kitchen. A unique taste experience that brings back childhood memories!",
    ingredients: ["1 chopped onion","4 peeled beets cut into strips","1 sweet potato","3 celery/chard stems","1 tbsp tomato paste","1 tsp black pepper","3 tbsp sugar","1.5 tsp salt (to taste)","Squeezed lemon"],
    instructions: ["Fry onion until golden, add sliced beets and fill with about 2 liters of boiling water.","(Important to leave room in the pot)","Add spices, after 15 minutes add sweet potato and ground leafy greens.","When soup bubbles, add kubbeh and cook about 10 minutes, turn off heat.","Add squeezed lemon to taste and wait about 5 more minutes... Bon appétit!"],
    nutrition: [
      { label: "Energy (calories)", value: "328" },{ label: "Total Fat (g)", value: "17.0" },
      { label: "Saturated Fat (g)", value: "5.8" },{ label: "Trans Fat (g)", value: "<0.5" },
      { label: "Cholesterol (mg)", value: "43" },{ label: "Sodium (mg)", value: "601" },
      { label: "Total Carbs (g)", value: "28.2" },{ label: "Sugars (g)", value: "1.9" },
      { label: "Teaspoon Sugar", value: "0.75" },{ label: "Dietary Fiber (g)", value: "2.8" },
      { label: "Protein (g)", value: "14.1" },
    ],
    allergens: "Wheat-Gluten",
    mayContain: "Celery, Soy, Pine nuts, Sesame, Barley-Gluten",
  },
];

const ImageSlider = ({ images, alt }: { images: string[]; alt: string }) => (
  <div className="rounded-2xl p-6 md:p-8 relative overflow-hidden bg-card border border-border/60 shadow-[0_8px_30px_-12px_hsl(var(--foreground)/0.12)]">
    <div className="relative aspect-square flex items-center justify-center rounded-xl overflow-hidden bg-muted/5">
      <img src={images[0]} alt={alt} className="w-full h-full object-contain p-4" />
    </div>
  </div>
);

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang, dir } = useLanguage();
  const BackArrow = lang === "he" ? ArrowRight : ArrowLeft;

  const productsData = lang === "he" ? productsDataHe : productsDataEn;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-background" dir={dir}>
        <Header />
        <main className="py-24 px-6 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">{t.productDetail.notFound}</h1>
          <Link to="/products">
            <Button variant="outline" className="gap-2">
              {t.productDetail.backToProducts}
              <BackArrow className="w-4 h-4" />
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />

      <main className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <div className="mb-8 pt-16">
              <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                <BackArrow className="w-3 h-3" />
                {t.productDetail.backToProducts}
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
              <ImageSlider images={product.images} alt={product.name} />
              <div className="space-y-4">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
                <p className="text-primary font-semibold text-lg">{product.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed">{product.about}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{t.productDetail.cooking} {product.cookTime}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2 text-sm">
                    <Flame className="w-4 h-4 text-primary" />
                    <span>{product.weight}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-4">
                  <Link to="/store-locations">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-full px-6 gap-2">
                      <MapPin className="w-4 h-4" />
                      {t.productDetail.orderAt}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <AnimateOnScroll>
              <div className="bg-card rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <ChefHat className="w-6 h-6 text-primary" />
                  <h2 className="font-serif text-2xl font-bold text-foreground">{t.productDetail.recipe}</h2>
                </div>
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">{t.productDetail.ingredients}</h3>
                  <ul className="space-y-2">
                    {product.ingredients.map((item, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">{t.productDetail.instructions}</h3>
                  <ol className="space-y-3">
                    {product.instructions.map((step, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={150}>
              <div className="bg-card rounded-2xl p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">{t.productDetail.nutrition}</h2>
                <p className="text-xs text-muted-foreground mb-4">{t.productDetail.nutritionPer100}</p>
                <div className="space-y-0">
                  {product.nutrition.map((row, i) => (
                    <div key={i} className={`flex justify-between py-2.5 px-2 text-sm ${i % 2 === 0 ? "bg-muted/30 rounded" : ""}`}>
                      <span className="text-foreground font-medium">{row.label}</span>
                      <span className="text-muted-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
                  <p><strong className="text-foreground">{t.productDetail.allergens}</strong> {product.allergens}</p>
                  <p><strong className="text-foreground">{t.productDetail.mayContain}</strong> {product.mayContain}</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll>
            <div className="mt-16 text-center bg-primary rounded-2xl p-8 md:p-12">
              <h2 className="font-serif text-2xl font-bold text-primary-foreground mb-3">
                {t.productDetail.wantToOrder}
              </h2>
              <p className="text-primary-foreground/80 mb-6">{t.productDetail.callToOrder}</p>
              <Link to="/store-locations">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-6 text-base font-medium gap-2">
                  <MapPin className="w-5 h-5" />
                  {t.productDetail.findStoreCta}
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

export default ProductDetail;
