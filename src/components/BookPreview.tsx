import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Zap, Crown, Shield, Sparkles, Camera } from 'lucide-react';

interface BookPreviewProps {
  selectedBook: string;
  selectedFormat: string;
  characterName: string;
  customTitle?: string;
  customMessage?: string;
  customStory?: string;
  childPhoto?: string | null;
  price: number;
}

const BookPreview: React.FC<BookPreviewProps> = ({
  selectedBook,
  selectedFormat,
  characterName,
  customTitle,
  customMessage,
  customStory,
  childPhoto,
  price
}) => {
  const books = [
    {
      id: 'superhero-adventure',
      title: 'Superhero Adventure',
      image: '/lovable-uploads/26aab459-6fcc-4964-a14d-07eba0bfa570.png',
      description: 'Join the ultimate superhero adventure and save the world!',
      icon: <Zap className="h-6 w-6" />
    },
    {
      id: 'magic-kingdom',
      title: 'Magic Kingdom Quest',
      image: '/lovable-uploads/f9d4de95-28ea-4a11-a289-42765f7efcca.png',
      description: 'Embark on a magical journey through enchanted lands!',
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      id: 'space-explorer',
      title: 'Space Explorer',
      image: '/lovable-uploads/c005fccf-6243-4c21-9d0b-707d54196f0e.png',
      description: 'Explore the galaxy and discover new worlds!',
      icon: <Star className="h-6 w-6" />
    },
    {
      id: 'princess-adventure',
      title: 'Princess Adventure',
      image: '/lovable-uploads/8088ea2d-d3e8-42fd-a1f4-8074105b9842.png',
      description: 'A royal adventure filled with courage and friendship!',
      icon: <Crown className="h-6 w-6" />
    }
  ];

  const selectedBookData = books.find(book => book.id === selectedBook);
  
  const formatLabels = {
    digital: 'Digital Copy',
    print: 'Physical Copy',
    combo: 'Digital + Physical'
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-800 font-comic">Preview Your Personalized Comic</CardTitle>
        <p className="text-gray-600">Here's how your custom comic book will look!</p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Book Details */}
          <div className="space-y-6">
            {selectedBookData && (
              <div className="text-center">
                <img
                  src={selectedBookData.image}
                  alt={selectedBookData.title}
                  className="w-48 h-48 object-cover rounded-lg mx-auto shadow-lg"
                />
                <div className="flex items-center justify-center space-x-2 mt-4">
                  {selectedBookData.icon}
                  <h3 className="text-2xl font-bold text-gray-800">{selectedBookData.title}</h3>
                </div>
                <p className="text-gray-600 mt-2">{selectedBookData.description}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700">Format:</h4>
                <Badge variant="secondary" className="mt-1">
                  {formatLabels[selectedFormat as keyof typeof formatLabels]} - ₹{price}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Hero's Name:</h4>
                <p className="text-lg font-bold text-red-600">{characterName}</p>
              </div>

              {customTitle && (
                <div>
                  <h4 className="font-semibold text-gray-700">Custom Title:</h4>
                  <p className="text-lg font-semibold text-blue-600">{customTitle}</p>
                </div>
              )}

              {customMessage && (
                <div>
                  <h4 className="font-semibold text-gray-700">Personal Message:</h4>
                  <p className="text-gray-800 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                    "{customMessage}"
                  </p>
                </div>
              )}

              {customStory && (
                <div>
                  <h4 className="font-semibold text-gray-700">Custom Story Elements:</h4>
                  <p className="text-gray-800 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    {customStory}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Child's Photo */}
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-700 mb-4">Your Hero</h4>
              {childPhoto ? (
                <div className="relative">
                  <img
                    src={childPhoto}
                    alt="Child's photo"
                    className="w-64 h-64 object-cover rounded-lg mx-auto shadow-lg border-4 border-red-200"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full p-2">
                    <Heart className="h-6 w-6" />
                  </div>
                </div>
              ) : (
                <div className="w-64 h-64 bg-gray-100 rounded-lg mx-auto flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No photo uploaded</p>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Summary */}
            <Card className="bg-gradient-to-br from-yellow-50 to-red-50 border-red-200">
              <CardContent className="p-6">
                <h5 className="font-bold text-lg text-gray-800 mb-3">Comic Summary</h5>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Story:</span> {selectedBookData?.title}</p>
                  <p><span className="font-semibold">Hero:</span> {characterName}</p>
                  {customTitle && <p><span className="font-semibold">Title:</span> {customTitle}</p>}
                  <p><span className="font-semibold">Format:</span> {formatLabels[selectedFormat as keyof typeof formatLabels]}</p>
                  <p><span className="font-semibold">Price:</span> ₹{price}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookPreview;
