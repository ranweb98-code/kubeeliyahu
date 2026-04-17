import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import LargeHero from "../components/content/LargeHero";
import FiftyFiftySection from "../components/content/FiftyFiftySection";
import ProductCarousel from "../components/content/ProductCarousel";
import WhyChooseUs from "../components/content/WhyChooseUs";
import OneThirdTwoThirdsSection from "../components/content/OneThirdTwoThirdsSection";
import VideoTeaser from "../components/content/VideoTeaser";
import EditorialSection from "../components/content/EditorialSection";
import InstagramCTA from "../components/content/InstagramCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <LargeHero />
        <WhyChooseUs />
        <FiftyFiftySection />
        <ProductCarousel />
        <EditorialSection />
        <VideoTeaser />
        <OneThirdTwoThirdsSection />
        <InstagramCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
