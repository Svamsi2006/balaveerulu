import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight, Upload, Star, Heart, Zap, Crown, Shield, Sparkles, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import RazorpayPayment from '@/components/RazorpayPayment';
import { validateCoupon } from '@/utils/couponUtils';
import PhotoUpload from '@/components/PhotoUpload';
import BookPreview from '@/components/BookPreview';

interface Book {
  id: string;
  title: string;
  image: string;
  description: string;
  icon: React.ReactNode;
}

interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

const CreateBook = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [customStory, setCustomStory] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [childPhoto, setChildPhoto] = useState<File | null>(null);
  const [childPhotoPreview, setChildPhotoPreview] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: ''
  });
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const getPrice = () => {
    switch (selectedFormat) {
      case 'digital': return 399;
      case 'print': return 799;
      case 'combo': return 999;
      default: return 0;
    }
  };

  const getFinalPrice = () => {
    const basePrice = getPrice();
    return basePrice - (basePrice * discount);
  };

  const applyCoupon = () => {
    const result = validateCoupon(couponCode);
    
    if (result.isValid) {
      setDiscount(result.discount);
      setAppliedCoupon(couponCode);
      toast({
        title: "Coupon Applied!",
        description: result.message,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProceedToPayment = () => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to be logged in to place an order.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    console.log('Proceeding to payment - validating form data...');
    
    // Validate all required fields
    if (!selectedBook || !selectedFormat || !characterName || 
        !customerDetails.fullName || !customerDetails.email || !customerDetails.phone ||
        !customerDetails.address || !customerDetails.city || !customerDetails.state || !customerDetails.postalCode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
      return;
    }

    console.log('Form validation passed, going to step 6 (payment)');
    setCurrentStep(6);
  };

  const handlePaymentSuccess = async () => {
    if (!user) return;
    
    console.log('Payment successful, processing order...');
    setIsProcessingOrder(true);
    
    try {
      // Generate order number
      const orderNumber = `ORD-${Date.now()}`;
      
      // Calculate totals
      const basePrice = getPrice();
      const discountAmount = basePrice * discount;
      const totalAmount = basePrice - discountAmount;

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          total_amount: totalAmount,
          discount_amount: discountAmount,
          coupon_code: appliedCoupon || null,
          status: 'completed',
          shipping_address: {
            fullName: customerDetails.fullName,
            email: customerDetails.email,
            phone: customerDetails.phone,
            address: customerDetails.address,
            city: customerDetails.city,
            state: customerDetails.state,
            postalCode: customerDetails.postalCode,
            country: 'India'
          }
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order item
      const selectedBookData = books.find(book => book.id === selectedBook);
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: orderData.id,
          product_title: selectedBookData?.title || 'Custom Comic Book',
          product_image: selectedBookData?.image || '',
          format: selectedFormat,
          quantity: 1,
          unit_price: basePrice,
          character_name: characterName,
          custom_message: customMessage || null,
          custom_story: customStory || null,
          custom_title: customTitle || null
        });

      if (itemError) throw itemError;
      
      console.log('Order processed successfully, redirecting to thank you page');
      navigate('/thank-you');
    } catch (error) {
      console.error("Order processing error:", error);
      toast({
        title: "Order Processing Error",
        description: "Failed to process your order. Please contact support.",
        variant: "destructive"
      });
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const handlePaymentCancel = () => {
    console.log('Payment cancelled, staying on payment step');
    setCurrentStep(5);
  };

  const handlePhotoChange = (file: File | null, previewUrl: string | null) => {
    setChildPhoto(file);
    setChildPhotoPreview(previewUrl);
  };

  const renderStep1 = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-800 font-comic">Choose Your Adventure</CardTitle>
        <p className="text-gray-600">Select the comic book that will feature your child as the hero!</p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-lg ${
                selectedBook === book.id
                  ? 'border-red-500 bg-red-50 shadow-lg transform scale-105'
                  : 'border-gray-200 hover:border-red-300'
              }`}
              onClick={() => setSelectedBook(book.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {book.icon}
                    <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{book.description}</p>
                </div>
              </div>
              {selectedBook === book.id && (
                <div className="absolute top-4 right-4">
                  <div className="bg-red-500 text-white rounded-full p-2">
                    <Heart className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-800 font-comic">Choose Your Format</CardTitle>
        <p className="text-gray-600">How would you like to receive your personalized comic book?</p>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedFormat} onValueChange={setSelectedFormat}>
          <div className="space-y-4">
            <div className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedFormat === 'digital' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
            }`}>
              <RadioGroupItem value="digital" id="digital" />
              <div className="flex-1">
                <Label htmlFor="digital" className="text-lg font-semibold cursor-pointer">Digital Copy - ₹399</Label>
                <p className="text-gray-600 text-sm">Instant download, eco-friendly, perfect for tablets and e-readers</p>
              </div>
            </div>
            
            <div className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedFormat === 'print' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
            }`}>
              <RadioGroupItem value="print" id="print" />
              <div className="flex-1">
                <Label htmlFor="print" className="text-lg font-semibold cursor-pointer">Physical Copy - ₹799</Label>
                <p className="text-gray-600 text-sm">High-quality print delivered to your doorstep</p>
              </div>
            </div>
            
            <div className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedFormat === 'combo' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
            }`}>
              <RadioGroupItem value="combo" id="combo" />
              <div className="flex-1">
                <Label htmlFor="combo" className="text-lg font-semibold cursor-pointer">Both (Best Value!) - ₹999</Label>
                <p className="text-gray-600 text-sm">Get both digital and physical copies </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-800 font-comic">Personalize Your Story</CardTitle>
        <p className="text-gray-600">Make this comic book uniquely yours!</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="characterName" className="text-lg font-semibold">child Name *</Label>
          <Input
            id="characterName"
            placeholder="Enter the child name"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="customTitle" className="text-lg font-semibold">Custom Title (Optional)</Label>
          <Input
            id="customTitle"
            placeholder="Give your comic a custom title"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="customMessage" className="text-lg font-semibold">Personal Message (Optional)</Label>
          <Textarea
            id="customMessage"
            placeholder="Add a special message that will appear in the comic"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="mt-2"
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="customStory" className="text-lg font-semibold">Custom Story Elements (Optional)</Label>
          <Textarea
            id="customStory"
            placeholder="Describe any special elements you'd like in the story"
            value={customStory}
            onChange={(e) => setCustomStory(e.target.value)}
            className="mt-2"
            rows={4}
          />
        </div>

        <div>
          <Label className="text-lg font-semibold">Upload Child's Photo</Label>
          <div className="mt-2">
            <PhotoUpload 
              onPhotoChange={handlePhotoChange}
              currentPhoto={childPhotoPreview}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            This photo will help us create a more personalized comic book experience
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <BookPreview
      selectedBook={selectedBook}
      selectedFormat={selectedFormat}
      characterName={characterName}
      customTitle={customTitle}
      customMessage={customMessage}
      customStory={customStory}
      childPhoto={childPhotoPreview}
      price={getPrice()}
    />
  );

  const renderStep5 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-800 font-comic">Shipping Details</CardTitle>
        <p className="text-gray-600">Where should we deliver your personalized comic book?</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName" className="text-lg font-semibold">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter full name"
              value={customerDetails.fullName}
              onChange={(e) => setCustomerDetails({...customerDetails, fullName: e.target.value})}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-lg font-semibold">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={customerDetails.email}
              onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
              className="mt-2"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-lg font-semibold">Phone Number *</Label>
          <Input
            id="phone"
            placeholder="Enter phone number"
            value={customerDetails.phone}
            onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="address" className="text-lg font-semibold">Address *</Label>
          <Textarea
            id="address"
            placeholder="Enter complete address"
            value={customerDetails.address}
            onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
            className="mt-2"
            rows={3}
          />
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city" className="text-lg font-semibold">City *</Label>
            <Input
              id="city"
              placeholder="Enter city"
              value={customerDetails.city}
              onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="state" className="text-lg font-semibold">State *</Label>
            <Input
              id="state"
              placeholder="Enter state"
              value={customerDetails.state}
              onChange={(e) => setCustomerDetails({...customerDetails, state: e.target.value})}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="postalCode" className="text-lg font-semibold">Postal Code *</Label>
            <Input
              id="postalCode"
              placeholder="Enter postal code"
              value={customerDetails.postalCode}
              onChange={(e) => setCustomerDetails({...customerDetails, postalCode: e.target.value})}
              className="mt-2"
            />
          </div>
        </div>

        {/* Coupon Code Section */}
        <div className="border-t pt-6">
          <Label className="text-lg font-semibold">Coupon Code</Label>
          <div className="flex items-center space-x-2 mt-2">
            <Input
              placeholder="Enter coupon code..."
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button onClick={applyCoupon} variant="outline">
              Apply
            </Button>
          </div>
          
          {discount > 0 && (
            <div className="mt-2 text-green-600 font-semibold">
              Discount Applied: {appliedCoupon} ({(discount * 100)}% off)
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="border-t pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{getPrice()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-₹{(getPrice() * discount).toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>₹{getFinalPrice().toFixed(0)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep6 = () => {
    console.log('Rendering step 6 - Payment Gateway');
    return (
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 font-comic text-center mb-8">
          Complete Your Payment
        </h2>
        
        <RazorpayPayment
          amount={Math.round(getFinalPrice())}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          customerDetails={{
            name: customerDetails.fullName,
            email: customerDetails.email,
            phone: customerDetails.phone,
          }}
        />
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return renderStep1();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedBook !== '';
      case 2: return selectedFormat !== '';
      case 3: return characterName.trim() !== '';
      case 4: return true; // Preview step, always can proceed
      case 5: return customerDetails.fullName && customerDetails.email && customerDetails.phone && 
                     customerDetails.address && customerDetails.city && customerDetails.state && customerDetails.postalCode;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${currentStep >= step ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}
                `}>
                  {step}
                </div>
                {step < 6 && (
                  <div className={`
                    w-16 h-1 mx-2
                    ${currentStep > step ? 'bg-red-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Choose Book</span>
            <span>Format</span>
            <span>Personalize</span>
            <span>Preview</span>
            <span>Details</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Current Step Content */}
        {renderCurrentStep()}

        {/* Navigation Buttons */}
        {currentStep < 6 && (
          <div className="flex justify-between max-w-4xl mx-auto mt-8">
            <Button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            {currentStep === 5 ? (
              <Button
                onClick={handleProceedToPayment}
                disabled={!canProceed()}
                className="bg-red-500 hover:bg-red-600 text-white flex items-center"
              >
                Proceed to Payment
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNextStep}
                disabled={!canProceed()}
                className="bg-red-500 hover:bg-red-600 text-white flex items-center"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBook;
