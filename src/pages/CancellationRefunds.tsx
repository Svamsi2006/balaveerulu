
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Clock, CheckCircle, XCircle } from "lucide-react";

const CancellationRefunds = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-comic text-red-600 mb-4">Cancellations & Refunds 🔄</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your satisfaction is our priority. Learn about our cancellation and refund policies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Cancellation Policy */}
          <Card className="shadow-lg border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-red-600 flex items-center gap-3">
                <XCircle className="text-red-500" />
                Cancellation Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Before Work Begins</h3>
                <p className="text-gray-600">
                  You can cancel your order within 24 hours of placing it, provided we haven't started working on your comic book. Full refund will be processed.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">After Work Begins</h3>
                <p className="text-gray-600">
                  Once we start creating your personalized comic book (after photo approval), cancellations are not possible due to the custom nature of our service.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">How to Cancel</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Email us at seelamvamsisivaganesh@gmail.com</li>
                  <li>Include your order number and reason for cancellation</li>
                  <li>Contact us within 24 hours of order placement</li>
                  <li>WhatsApp us at +91 9346147336 for urgent requests</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Refund Policy */}
          <Card className="shadow-lg border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-green-600 flex items-center gap-3">
                <RefreshCw className="text-green-500" />
                Refund Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">7-Day Satisfaction Guarantee</h3>
                <p className="text-gray-600">
                  We offer a 7-day satisfaction guarantee. If you're not completely happy with your personalized comic book, we'll work with you to make it right or provide a full refund.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Refund Eligibility</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle size={16} />
                      Eligible for Refund
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Quality issues with the comic</li>
                      <li>• Technical errors in personalization</li>
                      <li>• Order cancelled within 24 hours</li>
                      <li>• Service not delivered within promised time</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                      <XCircle size={16} />
                      Not Eligible for Refund
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Change of mind after delivery</li>
                      <li>• Poor quality uploaded photos</li>
                      <li>• Request after 7 days of delivery</li>
                      <li>• Custom requests not in our scope</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Refund Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Request Submission</h4>
                      <p className="text-gray-600 text-sm">Contact us with your refund request and reason</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Review Process</h4>
                      <p className="text-gray-600 text-sm">We review your request within 2-3 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Refund Processing</h4>
                      <p className="text-gray-600 text-sm">Approved refunds processed within 5-7 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Timeline */}
          <Card className="shadow-lg border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-blue-600 flex items-center gap-3">
                <Clock className="text-blue-500" />
                Refund Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Processing Time by Payment Method</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">Credit/Debit Cards</h4>
                    <p className="text-sm text-gray-600">5-7 business days to reflect in your account</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-800 mb-2">UPI/Digital Wallets</h4>
                    <p className="text-sm text-gray-600">2-3 business days to reflect in your account</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Net Banking</h4>
                    <p className="text-sm text-gray-600">3-5 business days to reflect in your account</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Partial Refunds</h3>
                <p className="text-gray-600">
                  In some cases, we may offer partial refunds for minor issues that can be resolved with revisions. This ensures you still receive value while addressing your concerns.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact for Refunds */}
          <Card className="shadow-lg border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-comic text-orange-600 mb-4">Need a Refund or Have Questions?</h3>
              <p className="text-gray-600 mb-6">
                Our customer support team is here to help resolve any issues and process your refund requests promptly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:seelamvamsisivaganesh@gmail.com" 
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-block"
                >
                  Email Support 📧
                </a>
                <a 
                  href="https://wa.me/919346147336" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-block"
                >
                  WhatsApp Support 💬
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefunds;
