import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Instagram, Linkedin, Github, Globe } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS with correct configuration
      await emailjs.send(
        "service_iau32kz",  // Service ID
        "template_02fwxmw", // Template ID
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "seelamvamsisivaganesh@gmail.com"
        },
        "GYSfQoTOJLBO0WT9s" // Public Key
      );
      
      toast({
        title: "🎉 Thank you for placing your order!",
        description: "Our team will begin creating your personalized comic book shortly. You'll receive a preview soon! For urgent questions, message us on WhatsApp.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-comic text-blue-600 mb-4">Contact Us! 📧</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about turning your child into a superhero? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-lg border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-2xl font-comic text-blue-600">Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you soon!</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-2 border-yellow-200 focus:border-blue-400"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-2 border-yellow-200 focus:border-blue-400"
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border-2 border-yellow-200 focus:border-blue-400"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="border-2 border-yellow-200 focus:border-blue-400"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? "Sending..." : "Send Message 🚀"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-lg border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl font-comic text-blue-600">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="text-green-500" size={24} />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <a href="https://wa.me/919346147336" className="text-blue-600 hover:underline">
                      +91 9346147336
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-red-500" size={24} />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:seelamvamsisivaganesh@gmail.com" className="text-blue-600 hover:underline">
                      seelamvamsisivaganesh@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl font-comic text-purple-600">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <a href="https://vamsiseelam.my.canva.site/v" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg hover:shadow-md transition-all">
                    <Globe className="text-purple-600" size={20} />
                    <span className="text-sm font-medium">Portfolio</span>
                  </a>
                  <a href="https://www.instagram.com/__vamsi__2006/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-3 bg-gradient-to-r from-pink-100 to-red-100 rounded-lg hover:shadow-md transition-all">
                    <Instagram className="text-pink-600" size={20} />
                    <span className="text-sm font-medium">Instagram</span>
                  </a>
                  <a href="https://www.linkedin.com/in/vamsi-/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg hover:shadow-md transition-all">
                    <Linkedin className="text-blue-600" size={20} />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                  <a href="https://github.com/Svamsi2006" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg hover:shadow-md transition-all">
                    <Github className="text-gray-700" size={20} />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
