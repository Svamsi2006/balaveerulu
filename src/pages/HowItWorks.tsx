
import { Upload, BookOpen, Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: <Upload className="h-16 w-16 text-blue-500" />,
      title: "Upload Your Child's Photo",
      description: "Upload a clear, front-facing photo of your child. Our AI will transform them into a comic book hero!",
      details: ["High-quality photo preferred", "Front-facing works best", "Multiple angles accepted"]
    },
    {
      step: 2,
      icon: <BookOpen className="h-16 w-16 text-green-500" />,
      title: "Choose Your Adventure",
      description: "Select from our collection of exciting themes - mythology, superheroes, fantasy, and more!",
      details: ["Hanuman Adventures", "Spider Hero Stories", "Iron Kid Missions", "Thor's Young Apprentice"]
    },
    {
      step: 3,
      icon: <Star className="h-16 w-16 text-yellow-500" />,
      title: "Personalize & Preview",
      description: "Add your child's name, choose their costume, and preview the magical transformation!",
      details: ["Custom name integration", "Costume selection", "Story personalization", "Real-time preview"]
    },
    {
      step: 4,
      icon: <Gift className="h-16 w-16 text-red-500" />,
      title: "Get Your Book",
      description: "Choose digital download or printed book delivery. Your child's adventure is ready!",
      details: ["Instant digital download", "High-quality print option", "Fast doorstep delivery", "Gift wrapping available"]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-comic">
            How It <span className="text-red-600">Works</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Creating your child's personalized comic book is as easy as 1-2-3-4! 
            Follow our simple process to turn your little one into a superhero.
          </p>
        </div>

        {/* Steps Section */}
        <div className="space-y-20">
          {steps.map((stepData, index) => (
            <div 
              key={stepData.step}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 text-center">
                  <div className="bg-white rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center shadow-lg">
                    {stepData.icon}
                  </div>
                  <div className="text-6xl font-bold text-gray-200 mb-4 font-comic">
                    {stepData.step}
                  </div>
                </div>
              </div>
              
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="mb-4">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    STEP {stepData.step}
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6 font-comic">
                  {stepData.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {stepData.description}
                </p>
                <ul className="space-y-3">
                  {stepData.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Visual */}
        <div className="my-20 px-8">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-red-500 rounded-full"></div>
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.step} className="text-center relative">
                  <div className="bg-white border-4 border-red-500 rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-lg relative z-10">
                    <span className="text-2xl font-bold text-red-500">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mt-4 font-comic">
                    {step.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6 font-comic">Ready to Start?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your child's superhero adventure is just a few clicks away. 
            Let's create something magical together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/create">Create Your Book Now!</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange-600 font-bold text-lg px-8 py-4 rounded-full"
            >
              <Link to="/gallery">View Sample Books</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
