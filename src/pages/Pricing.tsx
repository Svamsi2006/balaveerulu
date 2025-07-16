
import { Check, Gift, Star, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Digital Edition",
      price: "₹399",
      popular: false,
      features: [
        "High-quality digital comic book",
        "Instant download after creation",
        "Your child as the main character",
        "20+ pages of adventure",
        "Multiple device access",
        "Email support"
      ],
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Print + Digital",
      price: "₹799",
      popular: true,
      features: [
        "Everything in Digital Edition",
        "Premium printed book",
        "High-quality glossy pages",
        "Hardcover binding",
        "Free shipping across India",
        "Gift wrapping included",
        "Priority support"
      ],
      color: "from-red-500 to-orange-500"
    },
    {
      name: "Ultimate Hero Pack",
      price: "₹999",
      popular: false,
      features: [
        "Everything in Print + Digital",
        "2 different story themes",
        "Personalized hero certificate",
        "Custom bookmark with child's photo",
        "Digital coloring pages",
        "Video message from creator",
        "Express delivery (2-3 days)"
      ],
      color: "from-purple-600 to-pink-600"
    }
  ];

  const addOns = [
    { name: "Extra Story Theme", price: "₹300", icon: <Star className="h-6 w-6" /> },
    { name: "Rush Delivery (1 day)", price: "₹200", icon: <Zap className="h-6 w-6" /> },
    { name: "Gift Box Packaging", price: "₹150", icon: <Gift className="h-6 w-6" /> },
    { name: "Additional Printed Copy", price: "₹500", icon: <BookOpen className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen py-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 font-comic">
            Choose Your <span className="text-red-600">Adventure</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Simple, transparent pricing for every family. 
            Turn your child into a comic book hero today!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative bg-card rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                plan.popular ? 'ring-4 ring-red-400 ring-opacity-50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className={`h-32 bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                <h3 className="text-2xl font-bold text-white font-comic">{plan.name}</h3>
              </div>
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-foreground mb-2">{plan.price}</div>
                  <div className="text-muted-foreground">One-time payment</div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild 
                  className={`w-full py-4 text-lg font-bold rounded-xl ${
                    plan.popular 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                >
                  <Link to="/create">Choose {plan.name}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl p-12 mb-16">
          <h2 className="text-4xl font-bold text-center text-foreground mb-8 font-comic">
            Make It Extra Special
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={addon.name} className="bg-card rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-orange-500 mb-4 flex justify-center">
                  {addon.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{addon.name}</h3>
                <div className="text-2xl font-bold text-orange-600">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 font-comic">Special Launch Offers!</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/20 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4">🎉 First 100 Customers</h3>
              <p className="text-xl mb-4">Get 50% OFF on your first book!</p>
              <div className="text-lg">Use code: <span className="font-bold bg-yellow-400 text-purple-800 px-2 py-1 rounded">HERO50</span></div>
              <p className="text-sm mt-2 opacity-90">*Valid for single book purchases only</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4">👨‍👩‍👧‍👦 Family Pack</h3>
              <p className="text-xl mb-4">Buy 2+ books and save ₹200!</p>
              <div className="text-lg">Automatic discount at checkout</div>
              <p className="text-sm mt-2 opacity-90">*Applied when purchasing 2 or more items</p>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-2xl p-8 text-center">
          <div className="text-green-600 mb-4">
            <Check className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4 font-comic">
            100% Satisfaction Guarantee
          </h3>
          <p className="text-green-700 dark:text-green-400 text-lg max-w-2xl mx-auto">
            Not happy with your comic book? We'll refund your money, no questions asked. 
            Your child's happiness is our priority!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
