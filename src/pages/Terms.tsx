
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-comic text-blue-600 mb-4">Terms of Service 📋</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read our terms of service carefully before using our personalized comic book creation service.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Terms of Service */}
          <Card className="shadow-lg border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-blue-600">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">1. Service Description</h3>
                <p className="text-gray-600">
                  Balaveerulu.com provides personalized comic book creation services where children are transformed into superhero characters through AI-powered illustration and storytelling.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">2. User Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate information and high-quality photos</li>
                  <li>Ensure you have permission to use submitted photos</li>
                  <li>Use our service only for personal, non-commercial purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">3. Payment and Refunds</h3>
                <p className="text-gray-600">
                  All payments are processed securely through Razorpay. We offer a 7-day satisfaction guarantee. Refunds are processed within 5-7 business days after approval. See our Cancellation & Refunds policy for detailed information.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">4. Intellectual Property</h3>
                <p className="text-gray-600">
                  The final comic book artwork is created specifically for you. You retain rights to use the final product for personal purposes. We retain rights to use anonymized samples for marketing with your consent.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">5. Service Delivery</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Digital delivery within 3-5 business days after order confirmation</li>
                  <li>High-resolution PDF format suitable for printing</li>
                  <li>One round of minor revisions included</li>
                  <li>Additional revisions may incur extra charges</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">6. Limitation of Liability</h3>
                <p className="text-gray-600">
                  Our liability is limited to the amount paid for the service. We are not responsible for any indirect, incidental, or consequential damages arising from the use of our service.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">7. Modifications to Terms</h3>
                <p className="text-gray-600">
                  We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or website notification.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links to Other Policies */}
          <Card className="shadow-lg border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl font-comic text-green-600">Related Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Link 
                  to="/privacy-policy" 
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-gray-200"
                >
                  <h4 className="font-bold text-purple-600 mb-2">Privacy Policy</h4>
                  <p className="text-sm text-gray-600">How we protect and use your personal data</p>
                </Link>
                <Link 
                  to="/cancellation-refunds" 
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-gray-200"
                >
                  <h4 className="font-bold text-red-600 mb-2">Cancellation & Refunds</h4>
                  <p className="text-sm text-gray-600">Our cancellation and refund policies</p>
                </Link>
                <Link 
                  to="/shipping-policy" 
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-gray-200"
                >
                  <h4 className="font-bold text-blue-600 mb-2">Shipping Policy</h4>
                  <p className="text-sm text-gray-600">Delivery methods and timelines</p>
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-gray-200"
                >
                  <h4 className="font-bold text-green-600 mb-2">Contact Us</h4>
                  <p className="text-sm text-gray-600">Get in touch with our support team</p>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Contact for Legal Matters */}
          <Card className="shadow-lg border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-comic text-orange-600 mb-4">Questions About Our Terms?</h3>
              <p className="text-gray-600 mb-6">
                If you have any questions about our terms of service, please don't hesitate to contact us.
              </p>
              <Link 
                to="/contact" 
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-block"
              >
                Contact Us 📧
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
