import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreen from "./components/SplashScreen";
import PurchasePointsFab from "./components/PurchasePointsFab";
import SkipToContent from "./components/SkipToContent";
import AccessibilityWidget from "./components/AccessibilityWidget";
import CookieConsent from "./components/CookieConsent";
import { LanguageProvider } from "./i18n/LanguageContext";
import Index from "./pages/Index";
import heroImage from "@/assets/kubbeh-1.jpg";

import About from "./pages/About";
import Contact from "./pages/Contact";
import StoreLocationsPage from "./pages/StoreLocationsPage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [revealed, setRevealed] = useState(false);

  // Preload the hero image during the splash so the entrance is flash-free.
  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
  }, []);

  // Mount the page content once the splash starts leaving, so the hero's
  // entrance animations actually play in view as the splash fades out.
  const contentVisible = revealed || !showSplash;

  return (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        {showSplash && (
          <SplashScreen
            onLeaveStart={() => setRevealed(true)}
            onFinish={() => setShowSplash(false)}
          />
        )}
        <Toaster />
        <Sonner />
        {contentVisible && (
          <BrowserRouter>
            <ScrollToTop />
            <SkipToContent />
            <PurchasePointsFab />
            <AccessibilityWidget />
            <CookieConsent />
            <Routes>
              <Route path="/" element={<Index />} />

              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/store-locations" element={<StoreLocationsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
  );
};

export default App;
