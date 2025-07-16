import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [format, setFormat] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [customStory, setCustomStory] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('title', getProductTitle(productId || ''))
        .single();

      if (error) {
        setProduct(getHardcodedProduct(productId || ''));
      } else {
        setProduct(data);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      setProduct(getHardcodedProduct(productId || ''));
    } finally {
      setLoading(false);
    }
  };

  const getProductTitle = (id: string) => {
    const titles: { [key: string]: string } = {
      'hanuman': 'Super Hero Adventure',
      'spider': 'Space Explorer', 
      'iron': 'Magical Kingdom',
      'thor': 'Ocean Adventure'
    };
    return titles[id] || 'Unknown Product';
  };

  const getHardcodedProduct = (id: string) => {
    const products: { [key: string]: any } = {
      'hanuman': {
        title: "Hanuman's Little Helper",
        image: "/lovable-uploads/c005fccf-6243-4c21-9d0b-707d54196f0e.png",
        description: "Join Hanuman in epic adventures of courage and wisdom. Your child becomes the brave helper in this mythological adventure.",
        digital_price: 399,
        print_price: 799,
        combo_price: 999,
        theme: "mythology"
      },
      'spider': {
        title: "Spider Kid Adventure",
        image: "/lovable-uploads/f9d4de95-28ea-4a11-a289-42765f7efcca.png",
        description: "Swing through the city and save the day! Your child becomes the amazing Spider Kid in this action-packed adventure.",
        digital_price: 399,
        print_price: 799,
        combo_price: 999,
        theme: "superhero"
      },
      'iron': {
        title: "Iron Kid's First Mission",
        image: "/lovable-uploads/8088ea2d-d3e8-42fd-a1f4-8074105b9842.png",
        description: "Use amazing technology to protect the world. Your child becomes the genius Iron Kid with incredible gadgets.",
        digital_price: 399,
        print_price: 799,
        combo_price: 999,
        theme: "technology"
      },
      'thor': {
        title: "Thor's Young Apprentice",
        image: "/lovable-uploads/7a37c838-e06b-4c0d-ad21-3d81b3aa07cf.png",
        description: "Wield the power of thunder and lightning. Your child learns from the mighty Thor in this epic Norse adventure.",
        digital_price: 399,
        print_price: 799,
        combo_price: 999,
        theme: "customize"
      }
    };
    return products[id] || null;
  };

  const calculatePrice = () => {
    if (!format || !product) return 0;
    
    let basePrice = 0;
    if (format === 'digital') basePrice = Number(product.digital_price);
    else if (format === 'print') basePrice = Number(product.print_price);
    else if (format === 'combo') basePrice = Number(product.combo_price);
    
    const subtotal = basePrice * quantity;
    return subtotal - (subtotal * discount);
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'HARSHI10') {
      setDiscount(0.1);
      toast({
        title: "Coupon Applied!",
        description: "10% discount applied successfully!",
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code.",
        variant: "destructive"
      });
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to be logged in to add items to cart.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (!format || !characterName) {
      toast({
        title: "Missing Information",
        description: "Please select format and enter character name.",
        variant: "destructive"
      });
      return;
    }

    await addToCart({
      title: product.title,
      image: product.image,
      format: format as 'digital' | 'print' | 'combo',
      quantity,
      price: calculatePrice(),
      characterName,
      customMessage,
      customStory: productId === 'thor' ? customStory : undefined,
      customTitle: productId === 'thor' ? customTitle : undefined
    });

    toast({
      title: "Added to Cart!",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    navigate('/create');
    toast({
      title: "Redirecting to Create Book",
      description: "Please complete the full creation process with photo upload.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/gallery')}>Back to Gallery</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Label>Quantity:</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 border rounded">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 font-comic mb-4">
                {product.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Customize Your Book</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="format">Format *</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Digital Copy - ₹399</SelectItem>
                      <SelectItem value="print">Print Copy (Home Delivery) - ₹799</SelectItem>
                      <SelectItem value="combo">Combo Pack (Print + Digital + Fast Delivery) - ₹999</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="characterName">Character Name *</Label>
                  <Input
                    id="characterName"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    placeholder="Enter your child's name"
                  />
                </div>

                <div>
                  <Label htmlFor="customMessage">Add Short Message</Label>
                  <Input
                    id="customMessage"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Special message for your hero"
                  />
                </div>

                {productId === 'thor' && (
                  <>
                    <div>
                      <Label htmlFor="customStory">Short Story</Label>
                      <Textarea
                        id="customStory"
                        value={customStory}
                        onChange={(e) => setCustomStory(e.target.value)}
                        placeholder="Write your own version or notes"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customTitle">Cartoon or Title Name</Label>
                      <Input
                        id="customTitle"
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        placeholder="Custom character or title name"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button onClick={applyCoupon} variant="outline">
                      Apply
                    </Button>
                  </div>
                  
                  {discount > 0 && (
                    <div className="text-green-600 font-semibold">
                      Discount Applied: {(discount * 100)}% off
                    </div>
                  )}
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-red-600">
                      ₹{calculatePrice().toFixed(0)}
                    </div>
                    {quantity > 1 && (
                      <div className="text-sm text-gray-500">
                        ₹{format && product ? (format === 'digital' ? product.digital_price : format === 'print' ? product.print_price : product.combo_price) : 0} × {quantity}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handleAddToCart}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3"
                disabled={!format || !characterName}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                onClick={handleBuyNow}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3"
              >
                <Zap className="h-5 w-5 mr-2" />
                Create Full Book
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
