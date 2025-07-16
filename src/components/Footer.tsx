
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Github, Heart, Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16 border-t-4 border-pink-300 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-400 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-400 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-green-400 rounded-full animate-wiggle"></div>
        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-orange-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/lovable-uploads/26aab459-6fcc-4964-a14d-07eba0bfa570.png" 
                  alt="Balaveerulu Logo" 
                  className="w-12 h-12 rounded-full object-cover border-3 border-white/50 shadow-lg"
                  width="48"
                  height="48"
                />
                <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold font-fredoka text-white">Balaveerulu</h3>
            </div>
            <p className="text-white/90 leading-relaxed font-medium">
              Creating magical personalized comic books where your child becomes the hero of their own adventure! ✨📚🦸‍♀️
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.instagram.com/__vamsi__2006/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-br from-pink-500 to-red-500 p-3 rounded-full hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/vamsi-/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/Svamsi2006" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-br from-gray-700 to-gray-800 p-3 rounded-full hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Visit our GitHub page"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl font-fredoka text-yellow-300 flex items-center">
              🚀 Quick Links
            </h4>
            <div className="space-y-3">
              <Link to="/" className="block text-white/90 hover:text-yellow-300 transition-colors font-medium hover:translate-x-2 transform duration-300">🏠 Home</Link>
              <Link to="/about" className="block text-white/90 hover:text-yellow-300 transition-colors font-medium hover:translate-x-2 transform duration-300">🌟 About Us</Link>
              <Link to="/gallery" className="block text-white/90 hover:text-yellow-300 transition-colors font-medium hover:translate-x-2 transform duration-300">🎨 Gallery</Link>
              <Link to="/pricing" className="block text-white/90 hover:text-yellow-300 transition-colors font-medium hover:translate-x-2 transform duration-300">💎 Pricing</Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl font-fredoka text-green-300 flex items-center">
              🛟 Support
            </h4>
            <div className="space-y-3">
              <Link to="/contact" className="block text-white/90 hover:text-green-300 transition-colors font-medium hover:translate-x-2 transform duration-300">📞 Contact Us</Link>
              <Link to="/faq" className="block text-white/90 hover:text-green-300 transition-colors font-medium hover:translate-x-2 transform duration-300">❓ FAQ</Link>
              <Link to="/feedback" className="block text-white/90 hover:text-green-300 transition-colors font-medium hover:translate-x-2 transform duration-300">💭 Feedback</Link>
              <Link to="/how-it-works" className="block text-white/90 hover:text-green-300 transition-colors font-medium hover:translate-x-2 transform duration-300">⚡ How It Works</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl font-fredoka text-pink-300 flex items-center">
              📋 Legal
            </h4>
            <div className="space-y-3">
              <Link to="/terms" className="block text-white/90 hover:text-pink-300 transition-colors font-medium hover:translate-x-2 transform duration-300">📜 Terms of Service</Link>
              <Link to="/privacy-policy" className="block text-white/90 hover:text-pink-300 transition-colors font-medium hover:translate-x-2 transform duration-300">🔒 Privacy Policy</Link>
              <Link to="/shipping-policy" className="block text-white/90 hover:text-pink-300 transition-colors font-medium hover:translate-x-2 transform duration-300">🚚 Shipping Policy</Link>
              <Link to="/cancellation-refunds" className="block text-white/90 hover:text-pink-300 transition-colors font-medium hover:translate-x-2 transform duration-300">↩️ Cancellation & Refunds</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 mt-12 pt-8 text-center">
          <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent font-bold text-lg font-fredoka mb-2">
            &copy; 2025 Balaveerulu. All rights reserved.
          </div>
          <p className="text-white/80 font-medium flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-400 animate-pulse" /> for little heroes everywhere! 🦸‍♂️🦸‍♀️✨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
