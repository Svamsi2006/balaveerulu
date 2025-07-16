
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Feedback = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-lg border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-4xl font-comic text-green-600 mb-4">
                Thank You! 🎉
              </CardTitle>
              <CardDescription className="text-xl text-gray-600">
                Your message has been received successfully!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl">🦸‍♀️🦸‍♂️</div>
              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Thank you for your message!</strong> We'll get back to you soon. 
                  Meanwhile, explore our amazing books and see how your child can become the next superhero!
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <a 
                  href="/gallery" 
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
                >
                  View Gallery 🖼️
                </a>
                <a 
                  href="/create" 
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
                >
                  Create Book 📚
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
