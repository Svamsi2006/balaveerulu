
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import CreateBook from "./pages/CreateBook";
import Gallery from "./pages/Gallery";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import CancellationRefunds from "./pages/CancellationRefunds";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AIFloatingChatbot from "./components/AIFloatingChatbot";
import AuthModal from "./components/AuthModal";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (!loading && hasCheckedAuth) {
      // Show modal only for non-authenticated users after initial load
      if (!user) {
        setShowAuthModal(true);
      }
    }
    
    if (!loading && !hasCheckedAuth) {
      setHasCheckedAuth(true);
    }
  }, [user, loading, hasCheckedAuth]);

  const handleAuthModalClose = () => {
    // Only allow closing if user is authenticated
    if (user) {
      setShowAuthModal(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-purple-50 via-blue-50 to-green-50 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 star-bg relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-1/4 right-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-green-500 rounded-full opacity-20 animate-bounce-gentle"></div>
      <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-wiggle"></div>
      <div className="absolute top-1/2 right-1/4 w-14 h-14 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
      
      <Header />
      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/create" element={<CreateBook />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/cancellation-refunds" element={<CancellationRefunds />} />
          <Route path="/order-confirmation" element={<ThankYou />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shopping-cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/user-authentication" element={<Auth />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-tracking" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <AIFloatingChatbot />
      
      {/* Auth Modal for non-authenticated users */}
      <AuthModal 
        isOpen={showAuthModal && !user && hasCheckedAuth} 
        onClose={handleAuthModalClose} 
      />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
