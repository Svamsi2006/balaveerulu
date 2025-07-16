
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, Package, Star, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Dynamically import canvas-confetti to avoid build issues
    const loadConfetti = async () => {
      try {
        const confetti = (await import("canvas-confetti")).default;
        const timer = setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          setShowAnimation(true);
        }, 500);

        return () => clearTimeout(timer);
      } catch (error) {
        console.log('Confetti animation unavailable:', error);
        setShowAnimation(true);
      }
    };

    loadConfetti();
  }, []);

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/919346147336?text=Hi,%20I%20just%20placed%20an%20order%20and%20would%20like%20to%20confirm%20the%20details.', '_blank');
  };

  const handlePhoneCall = () => {
    window.open('tel:+919346147336', '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <div className={`max-w-2xl mx-auto transition-all duration-1000 ${showAnimation ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-5xl font-comic text-green-600 mb-4">
              🎉 Order Placed Successfully! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your order! Your personalized comic book is being prepared with love.
            </p>
          </div>

          {/* Phone Confirmation Card */}
          <Card className="mb-8 shadow-lg border-2 border-orange-200 bg-orange-50">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardTitle className="text-2xl font-comic flex items-center justify-center">
                <Phone className="h-6 w-6 mr-2" />
                📞 Confirm Your Order
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="font-bold text-xl mb-4 text-orange-700">
                  Please call or message us to confirm your order details!
                </h3>
                <p className="text-gray-700 mb-6">
                  To ensure your order is processed correctly with all your custom details, 
                  please contact us within 24 hours to confirm your order.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleWhatsAppContact}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp: +91 9346147336
                  </Button>
                  
                  <Button 
                    onClick={handlePhoneCall}
                    variant="outline" 
                    className="border-orange-500 text-orange-700 hover:bg-orange-100 font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call: +91 9346147336
                  </Button>
                </div>
                
                <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Please have your order details ready when you contact us, 
                    including character names, custom messages, and any special requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Details Card */}
          <Card className="mb-8 shadow-lg border-2 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardTitle className="text-2xl font-comic flex items-center justify-center">
                <Package className="h-6 w-6 mr-2" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-green-600">📧 Confirmation Email</h3>
                  <p className="text-gray-600 mb-4">
                    You'll receive an order confirmation email with all the details within a few minutes.
                  </p>
                  
                  <h3 className="font-bold text-lg mb-3 text-blue-600">🎨 Creation Process</h3>
                  <p className="text-gray-600">
                    Our team will start creating your personalized comic book immediately. You'll receive updates as we progress!
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-3 text-purple-600">🚚 Expected Delivery</h3>
                  <p className="text-gray-600 mb-4">
                    Your comic book will be delivered within <strong>7-8 days</strong> to your address.
                  </p>
                  
                  <h3 className="font-bold text-lg mb-3 text-orange-600">📱 Track Your Order</h3>
                  <p className="text-gray-600">
                    You can track your order status anytime from your account dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                <Link to="/orders">
                  <Package className="h-5 w-5 mr-2" />
                  Track Your Order
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                <Link to="/gallery">
                  <Star className="h-5 w-5 mr-2" />
                  Order More Books
                </Link>
              </Button>
            </div>
            
            <Button asChild variant="ghost" size="lg" className="text-gray-600 hover:text-gray-800">
              <Link to="/">
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-700 mb-3">🌟 Need Help?</h3>
            <p className="text-yellow-600 mb-4">
              Have questions about your order? Our team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="border-yellow-500 text-yellow-700 hover:bg-yellow-100">
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button 
                onClick={handleWhatsAppContact}
                variant="outline" 
                className="border-yellow-500 text-yellow-700 hover:bg-yellow-100"
              >
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
