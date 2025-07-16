
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Lock, UserCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-comic text-purple-600 mb-4">Privacy Policy 🛡️</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy and your child's safety are our highest priorities. Learn how we protect your data.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Data Collection */}
          <Card className="shadow-lg border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-purple-600 flex items-center gap-3">
                <Eye className="text-purple-500" />
                Data Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Information We Collect</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Child's name and photo for personalization</li>
                  <li>Contact information (email, phone) for order processing</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Basic usage analytics to improve our service</li>
                  <li>Communication records for customer support</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">How We Collect Data</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Directly from you when you place an order</li>
                  <li>Through website cookies and analytics tools</li>
                  <li>From communication channels (email, WhatsApp, contact forms)</li>
                  <li>Through payment processors for transaction processing</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="shadow-lg border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-blue-600 flex items-center gap-3">
                <Lock className="text-blue-500" />
                Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Security Measures</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>End-to-end encryption for data transmission</li>
                  <li>Secure cloud storage with regular backups</li>
                  <li>Limited access to authorized personnel only</li>
                  <li>Regular security audits and system updates</li>
                  <li>Two-factor authentication for admin access</li>
                  <li>Secure deletion of data after project completion</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Child Safety Measures</h3>
                <p className="text-gray-600 mb-3">
                  We implement special protections for children's data:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Photos are used only for the specific comic creation</li>
                  <li>No sharing of children's images with third parties</li>
                  <li>Automatic deletion of source photos after 30 days</li>
                  <li>Parental consent required for all data processing</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="shadow-lg border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-green-600 flex items-center gap-3">
                <UserCheck className="text-green-500" />
                How We Use Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Primary Uses</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Creating and delivering your personalized comic book</li>
                  <li>Processing payments and managing orders</li>
                  <li>Providing customer support and communication</li>
                  <li>Sending order updates and delivery notifications</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">What We DON'T Do</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Sell or share your personal data with third parties</li>
                  <li>Use children's photos for marketing without explicit consent</li>
                  <li>Send promotional emails without your permission</li>
                  <li>Store payment information on our servers</li>
                  <li>Share data with social media platforms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="shadow-lg border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-orange-600 flex items-center gap-3">
                <Shield className="text-orange-500" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Data Rights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">Access</h4>
                    <p className="text-sm text-gray-600">Request a copy of all personal data we hold about you</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Correction</h4>
                    <p className="text-sm text-gray-600">Request correction of any inaccurate personal data</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">Deletion</h4>
                    <p className="text-sm text-gray-600">Request deletion of your personal data</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-800 mb-2">Portability</h4>
                    <p className="text-sm text-gray-600">Request transfer of your data to another service</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">How to Exercise Your Rights</h3>
                <p className="text-gray-600 mb-3">
                  To exercise any of these rights, contact us at:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Email: seelamvamsisivaganesh@gmail.com</li>
                  <li>WhatsApp: +91 9346147336</li>
                  <li>Response time: Within 30 days of request</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cookies & Analytics */}
          <Card className="shadow-lg border-2 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-2xl font-comic text-indigo-600">Cookies & Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Cookie Usage</h3>
                <p className="text-gray-600">
                  We use essential cookies for website functionality and analytics cookies to understand user behavior and improve our service. You can control cookie preferences in your browser settings.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Third-Party Services</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Razorpay for payment processing</li>
                  <li>EmailJS for contact form functionality</li>
                  <li>Google Analytics for website usage insights</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact for Privacy */}
          <Card className="shadow-lg border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-comic text-pink-600 mb-4">Privacy Questions?</h3>
              <p className="text-gray-600 mb-6">
                Have questions about how we handle your data? Our privacy team is here to help.
              </p>
              <a 
                href="/contact" 
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-block"
              >
                Contact Privacy Team 🔒
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
