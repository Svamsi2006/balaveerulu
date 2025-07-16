
import { useState } from "react";
import { Eye, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All Books" },
    { id: "mythology", name: "Mythology" },
    { id: "superhero", name: "Superheroes" },
    { id: "customize", name: "Customize Story by Your Own" },
    { id: "technology", name: "Technology" }
  ];

  // Using the same 4 books from Latest Adventures in Home page
  const latestAdventures = [
    {
      id: 1,
      title: "Hanuman's Little Helper",
      image: "/lovable-uploads/c005fccf-6243-4c21-9d0b-707d54196f0e.png",
      theme: "mythology",
      productId: "hanuman",
      category: "mythology",
      rating: 5,
      description: "Join Hanuman in an epic adventure to save the forest and learn about courage"
    },
    {
      id: 2,
      title: "Spider Kid Adventure",
      image: "/lovable-uploads/f9d4de95-28ea-4a11-a289-42765f7efcca.png",
      theme: "superhero",
      productId: "spider",
      category: "superhero",
      rating: 5,
      description: "Swing through the city and catch the bad guys in this web-slinging adventure"
    },
    {
      id: 3,
      title: "Iron Kid's First Mission",
      image: "/lovable-uploads/8088ea2d-d3e8-42fd-a1f4-8074105b9842.png",
      theme: "technology",
      productId: "iron",
      category: "technology",
      rating: 5,
      description: "Build amazing gadgets and protect the city with high-tech superhero gear"
    },
    {
      id: 4,
      title: "Thor's Young Apprentice",
      image: "/lovable-uploads/7a37c838-e06b-4c0d-ad21-3d81b3aa07cf.png",
      theme: "customize",
      productId: "thor",
      category: "customize",
      rating: 5,
      description: "Learn to control thunder and lightning in the mighty realm of Asgard"
    }
  ];

  const filteredBooks = selectedCategory === "all" 
    ? latestAdventures 
    : latestAdventures.filter(book => book.category === selectedCategory);

  const handleAdventureClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-comic">
            Comic Book <span className="text-red-600">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how amazing your child can look as a comic book hero! 
            Browse through our collection of personalized adventures.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Books Grid - Only showing 4 books from Latest Adventures */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {filteredBooks.map((book) => (
            <div 
              key={book.id}
              onClick={() => handleAdventureClick(book.productId)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {/* Book Cover */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Eye className="h-5 w-5 text-white" />
                </div>
              </div>
              
              {/* Book Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {book.category.charAt(0).toUpperCase() + book.category.slice(1)}
                  </span>
                  <div className="flex items-center">
                    {[...Array(book.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-comic">
                  {book.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-800 capitalize">{book.theme} Theme</div>
                  </div>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Before/After Transformation */}
        <div className="bg-white rounded-3xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 font-comic">
            Amazing Transformations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Before", desc: "Regular Photo" },
              { name: "AI Magic", desc: "Transformation" },
              { name: "After", desc: "Comic Hero!" }
            ].map((stage, index) => (
              <div key={stage.name} className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  {index === 1 ? (
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
                  ) : (
                    <div className="text-6xl">
                      {index === 0 ? "📸" : "🦸"}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-comic">{stage.name}</h3>
                <p className="text-gray-600">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 font-comic">
            Ready to Create Your Child's Adventure?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of happy families who have created magical memories with Balaveerulu!
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-lg px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Link to="/create">Create Your Book Now! 🚀</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
