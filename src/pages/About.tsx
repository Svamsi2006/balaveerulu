
import { Heart, Users, Star, BookOpen } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-comic">
            About <span className="text-red-600">Balaveerulu</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Where every child becomes the hero of their own magical adventure!
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6 font-comic">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Balaveerulu, we believe every child has the potential to be a hero. Our mission is to create personalized comic books that not only entertain but also inspire confidence, creativity, and a love for reading.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We combine traditional Indian values with modern storytelling, creating adventures that resonate with young minds while teaching important life lessons.
            </p>
          </div>
          <div className="relative">
            <div className="w-full h-80 bg-gradient-to-br from-yellow-400 to-red-500 rounded-2xl flex items-center justify-center">
              <BookOpen className="h-32 w-32 text-white" />
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 font-comic">
              The Inspiration Behind Balaveerulu
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The name "Balaveerulu" comes from the Telugu words "Bala" (child) and "Veerulu" (heroes). Inspired by the rich tradition of Indian mythology and the timeless appeal of superheroes, we wanted to create something special for children.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our founder, growing up with stories of Hanuman, Krishna, and modern superheroes, realized that children needed to see themselves as the heroes of their own stories. This led to the creation of Balaveerulu.
              </p>
            </div>
            <div className="text-center">
              <div className="w-64 h-64 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center">
                <img 
                  src="/lovable-uploads/26aab459-6fcc-4964-a14d-07eba0bfa570.png" 
                  alt="Balaveerulu Mascot" 
                  className="h-48 w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 font-comic">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <Heart className="h-16 w-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-comic">Creativity</h3>
              <p className="text-gray-600 leading-relaxed">
                We nurture imagination and creativity through personalized storytelling that sparks wonder and curiosity.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <Users className="h-16 w-16 text-blue-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-comic">Family</h3>
              <p className="text-gray-600 leading-relaxed">
                Building stronger family bonds through shared reading experiences and memorable moments.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <Star className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-comic">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Delivering high-quality, professionally illustrated books that exceed expectations every time.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6 font-comic">Meet Our Founder</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl leading-relaxed mb-6">
              "I wanted to create something that would make children feel special and empowered. Every child deserves to see themselves as a hero, and that's exactly what Balaveerulu delivers."
            </p>
            <div className="text-lg">
              <p className="font-bold">Vamsi Seelam</p>
              <p className="text-purple-200">Founder & Creative Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
