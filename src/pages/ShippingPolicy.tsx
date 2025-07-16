
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Truck, Clock, MapPin, Package } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-comic text-blue-600 mb-4">Shipping Policy 🚚</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn about our shipping process for delivering your personalized comic books safely to your doorstep.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Digital Delivery */}
          <Card className="shadow-lg border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-blue-600 flex items-center gap-3">
                <Package className="text-blue-500" />
                Digital Delivery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Primary Delivery Method</h3>
                <p className="text-gray-600">
                  All personalized comic books are delivered digitally as high-resolution PDF files to your email address within 3-5 business days after order confirmation and photo approval.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Digital File Specifications</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>High-resolution PDF format (300 DPI)</li>
                  <li>Print-ready quality for home or professional printing</li>
                  <li>Optimized file size for easy downloading and sharing</li>
                  <li>Compatible with all devices and operating systems</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Physical Shipping */}
          <Card className="shadow-lg border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-green-600 flex items-center gap-3">
                <Truck className="text-green-500" />
                Physical Book Shipping
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Print & Ship Service</h3>
                <p className="text-gray-600">
                  Optional premium service where we professionally print and ship physical copies of your comic book (additional charges apply).
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Shipping Areas & Timeline</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                      <MapPin size={16} />
                      India (Domestic)
                    </h4>
                    <p className="text-sm text-gray-600">5-7 business days</p>
                    <p className="text-sm text-gray-600">Free shipping on orders above ₹500</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                      <MapPin size={16} />
                      International
                    </h4>
                    <p className="text-sm text-gray-600">10-15 business days</p>
                    <p className="text-sm text-gray-600">Shipping charges apply</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Shipping Charges</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Domestic (India): ₹50 for orders below ₹500, Free above ₹500</li>
                  <li>International: Calculated based on destination and weight</li>
                  <li>Express shipping available at additional cost</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Processing Time */}
          <Card className="shadow-lg border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-orange-600 flex items-center gap-3">
                <Clock className="text-orange-500" />
                Processing Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Order Processing Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Order Confirmation</h4>
                      <p className="text-gray-600 text-sm">Immediate confirmation upon payment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Photo Review & Approval</h4>
                      <p className="text-gray-600 text-sm">1-2 business days for quality check</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Comic Creation</h4>
                      <p className="text-gray-600 text-sm">2-3 business days for personalization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Digital Delivery</h4>
                      <p className="text-gray-600 text-sm">Immediate email delivery upon completion</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact for Shipping */}
          <Card className="shadow-lg border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-comic text-green-600 mb-4">Questions About Shipping?</h3>
              <p className="text-gray-600 mb-6">
                Have questions about delivery or need tracking information? We're here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-block"
                >
                  Contact Support 📧
                </a>
                <a 
                  href="https://wa.me/919346147336" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-block"
                >
                  WhatsApp Us 💬
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
