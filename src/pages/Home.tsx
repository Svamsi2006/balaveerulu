import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, BookOpen, Shield, Heart } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Home = () => {
  const navigate = useNavigate();

  const features = [{
    icon: <BookOpen className="h-12 w-12 text-yellow-500" />,
    title: "Personalized Stories",
    description: "Your child becomes the hero in professionally illustrated comic books"
  }, {
    icon: <Shield className="h-12 w-12 text-blue-500" />,
    title: "Kid-Safe Content",
    description: "All stories are carefully crafted with positive values and safe themes"
  }, {
    icon: <Heart className="h-12 w-12 text-red-500" />,
    title: "Print & Digital",
    description: "Get both digital copies and beautiful printed books delivered to your door"
  }];
  const testimonials = [{
    name: "Priya Sharma",
    comment: "My son absolutely loves seeing himself as a superhero! The quality is amazing.",
    rating: 5,
    location: "Mumbai"
  }, {
    name: "Rajesh Kumar",
    comment: "Perfect gift for my daughter's birthday. She reads it every night!",
    rating: 5,
    location: "Delhi"
  }, {
    name: "Anita Reddy",
    comment: "Great way to encourage reading. The artwork is beautiful and professional.",
    rating: 5,
    location: "Hyderabad"
  }];
  const sampleBooks = [{
    title: "Hanuman's Little Helper",
    theme: "mythology",
    image: "/lovable-uploads/c005fccf-6243-4c21-9d0b-707d54196f0e.png",
    productId: "hanuman"
  }, {
    title: "Spider Kid Adventure",
    theme: "superhero",
    image: "/lovable-uploads/f9d4de95-28ea-4a11-a289-42765f7efcca.png",
    productId: "spider"
  }, {
    title: "Iron Kid's First Mission",
    theme: "technology",
    image: "/lovable-uploads/8088ea2d-d3e8-42fd-a1f4-8074105b9842.png",
    productId: "iron"
  }, {
    title: "Thor's Young Apprentice",
    theme: "customize",
    image: "/lovable-uploads/7a37c838-e06b-4c0d-ad21-3d81b3aa07cf.png",
    productId: "thor"
  }];
  const handleBookClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Optimized for LCP */}
      <section className="relative bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-comic drop-shadow-lg">
              Turn Your Child into a 
              <span className="text-yellow-200"> Comic Book Hero!</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Create magical, personalized comic books where your little one becomes the superhero of their own adventure!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-yellow-100 font-bold text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[48px]">
                <Link to="/create" aria-label="Start creating your personalized comic book">Start Your Book Now! 🚀</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600 font-bold text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[48px]">
                <Link to="/gallery" aria-label="View sample comic books in our gallery">See Sample Books</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-16 h-16 bg-yellow-300 rounded-full opacity-20"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce delay-1000">
          <div className="w-12 h-12 bg-white rounded-full opacity-30"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16 font-comic">
            Why Choose Balaveerulu?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-comic">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16 font-comic">
            Happy Little Heroes & Parents
          </h2>
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="bg-card p-8 rounded-2xl shadow-lg mx-4">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-card-foreground text-lg mb-6 text-center italic">
                      "{testimonial.comment}"
                    </p>
                    <div className="text-center">
                      <h3 className="font-bold text-card-foreground">{testimonial.name}</h3>
                      <p className="text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious aria-label="Previous testimonial" />
            <CarouselNext aria-label="Next testimonial" />
          </Carousel>
        </div>
      </section>

      {/* Sample Books Section - Optimized with proper image dimensions and lazy loading */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16 font-comic">
            Latest Adventures
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {sampleBooks.map((book, index) => (
              <div 
                key={index} 
                onClick={() => handleBookClick(book.productId)} 
                className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer" 
                role="button" 
                tabIndex={0} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBookClick(book.productId);
                  }
                }} 
                aria-label={`View details for ${book.title} - ${book.theme} theme comic book`}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={`${book.title} comic book cover`} 
                    className="w-full h-full object-cover transition-transform duration-300" 
                    width="300" 
                    height="192"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-2 font-comic text-card-foreground">{book.title}</h3>
                  <p className="text-muted-foreground capitalize">{book.theme} Theme</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 min-h-[48px]">
              <Link to="/gallery" aria-label="View all comic books in our gallery">View All Books</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-comic">
            Ready to Create Magic? ✨
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of families who've already turned their children into comic book heroes!
          </p>
          <Button asChild size="lg" className="bg-yellow-400 text-purple-800 hover:bg-yellow-300 font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[48px]">
            <Link to="/create" aria-label="Start creating your child's personalized comic book">Create Your Book Now! 🎨</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
