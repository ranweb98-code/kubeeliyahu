import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import StoreLocations from "@/components/StoreLocations";

const StoreLocationsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <StoreLocations />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoreLocationsPage;
