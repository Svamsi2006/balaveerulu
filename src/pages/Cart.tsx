import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import CheckoutForm from '@/components/CheckoutForm';
import RazorpayPayment from '@/components/RazorpayPayment';
import emailjs from "@emailjs/browser";

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, applyCoupon, discount, couponCode, clearCart, familyPackDiscount } = useCart();
  const { user } = useAuth();
  const [couponInput, setCouponInput] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutFormData | null>(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput)) {
      let discountMessage = "";
      const upperCode = couponInput.toUpperCase();
      
      if (upperCode === 'HARSHI10') discountMessage = "10% discount applied successfully!";
      else if (upperCode === 'SIVA100') discountMessage = "98% discount applied successfully!";
      else if (upperCode === 'GANESH95') discountMessage = "95% discount applied successfully!";
      
      toast({
        title: "Coupon Applied!",
        description: discountMessage,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code.",
        variant: "destructive"
      });
    }
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to be logged in to place an order.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    setShowCheckout(true);
  };

  const handleCheckoutSubmit = (formData: CheckoutFormData) => {
    console.log('Proceeding to payment - validating form data...');
    setCheckoutData(formData);
    setShowCheckout(false);
    setShowPayment(true);
    console.log('Form validation passed, going to payment');
  };

  const sendOrderEmail = async (orderData: any, customerData: CheckoutFormData) => {
    try {
      // Format items for email
      const itemsText = items.map(item => 
        `• ${item.title} (${item.format}) - Quantity: ${item.quantity} - Price: ₹${(item.price * item.quantity).toFixed(0)}\n` +
        (item.characterName ? `  Character Name: ${item.characterName}\n` : '') +
        (item.customMessage ? `  Custom Message: ${item.customMessage}\n` : '') +
        (item.customStory ? `  Custom Story: ${item.customStory}\n` : '') +
        (item.customTitle ? `  Custom Title: ${item.customTitle}\n` : '')
      ).join('\n');

      const orderMessage = `🎉 NEW ORDER RECEIVED! 🎉

📋 ORDER DETAILS:
Order Number: ${orderData.order_number}
Order Date: ${new Date().toLocaleDateString('en-IN')}
Total Amount: ₹${orderData.total_amount.toFixed(0)}
${discount > 0 ? `Discount Applied: ${couponCode} (${(discount * 100)}% off)\nDiscount Amount: ₹${orderData.discount_amount.toFixed(0)}\n` : ''}
${familyPackDiscount > 0 ? `Family Pack Discount: ₹${familyPackDiscount}\n` : ''}

👤 CUSTOMER INFORMATION:
Name: ${customerData.fullName}
Email: ${customerData.email}
Phone: ${customerData.phone}

📍 SHIPPING ADDRESS:
${customerData.address}
${customerData.city}, ${customerData.state} ${customerData.postalCode}
India

📚 ORDERED ITEMS:
${itemsText}

💳 PAYMENT STATUS: Completed
🚚 EXPECTED DELIVERY: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}

Please process this order and begin creating the personalized comic books!`;

      await emailjs.send(
        "service_iau32kz",
        "template_02fwxmw",
        {
          name: customerData.fullName,
          email: customerData.email,
          subject: `🎉 New Order #${orderData.order_number} - Balaveerulu`,
          message: orderMessage,
          to_email: "seelamvamsisivaganesh@gmail.com"
        },
        "GYSfQoTOJLBO0WT9s"
      );

      console.log('Order confirmation email sent successfully');
    } catch (error) {
      console.error('Failed to send order email:', error);
      // Don't throw error as order processing should continue
    }
  };

  const handlePaymentSuccess = async () => {
    if (!user || !checkoutData) return;
    
    console.log('Payment successful, processing order...');
    setIsProcessingOrder(true);
    
    try {
      // Generate order number
      const orderNumber = `ORD-${Date.now()}`;
      
      // Calculate totals
      const couponDiscountAmount = subtotal * discount;
      const totalAmount = subtotal - couponDiscountAmount - familyPackDiscount;

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          total_amount: totalAmount,
          discount_amount: couponDiscountAmount + familyPackDiscount,
          coupon_code: couponCode || null,
          status: 'pending',
          shipping_address: {
            fullName: checkoutData.fullName,
            email: checkoutData.email,
            phone: checkoutData.phone,
            address: checkoutData.address,
            city: checkoutData.city,
            state: checkoutData.state,
            postalCode: checkoutData.postalCode,
            country: 'India'
          }
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_title: item.title,
        product_image: item.image,
        format: item.format,
        quantity: item.quantity,
        unit_price: item.price,
        character_name: item.characterName || null,
        custom_message: item.customMessage || null,
        custom_story: item.customStory || null,
        custom_title: item.customTitle || null
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Send order confirmation email
      await sendOrderEmail({
        ...orderData,
        discount_amount: couponDiscountAmount + familyPackDiscount
      }, checkoutData);

      // Clear cart
      clearCart();
      
      console.log('Order processed successfully, redirecting to order confirmation page');
      navigate('/order-confirmation');
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
    setShowPayment(false);
    setShowCheckout(true);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4 font-comic">Your Cart is Empty</h1>
          <p className="text-lg text-muted-foreground mb-8">Add some amazing comic books to get started!</p>
          <Button asChild className="bg-red-500 hover:bg-red-600">
            <Link to="/gallery">Browse Books</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (showPayment && checkoutData) {
    return (
      <div className="min-h-screen py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-6">
            <Button 
              onClick={() => setShowPayment(false)}
              variant="ghost"
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Checkout
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-8 font-comic text-center">
              Complete Payment
            </h1>
          </div>
          
          <RazorpayPayment
            amount={Math.round(getTotalPrice())}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
            customerDetails={{
              name: checkoutData.fullName,
              email: checkoutData.email,
              phone: checkoutData.phone,
            }}
          />
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Button 
              onClick={() => setShowCheckout(false)}
              variant="ghost"
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-8 font-comic text-center">
              Checkout
            </h1>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-2 border-b">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.format} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{(item.price * item.quantity).toFixed(0)}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(0)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between items-center mb-2 text-green-600">
                        <span>Discount ({couponCode}):</span>
                        <span>-₹{(subtotal * discount).toFixed(0)}</span>
                      </div>
                    )}
                    {familyPackDiscount > 0 && (
                      <div className="flex justify-between items-center mb-2 text-green-600">
                        <span>Family Pack Discount:</span>
                        <span>-₹{familyPackDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span>₹{getTotalPrice().toFixed(0)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div>
              <CheckoutForm 
                onSubmit={handleCheckoutSubmit}
                loading={isProcessingOrder}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-8 font-comic text-center">
          Shopping Cart
        </h1>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">Format: {item.format}</p>
                      {item.characterName && (
                        <p className="text-sm text-muted-foreground">Character: {item.characterName}</p>
                      )}
                      {item.customMessage && (
                        <p className="text-sm text-muted-foreground">Message: {item.customMessage}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-3 py-1 border rounded">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">₹{(item.price * item.quantity).toFixed(0)}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter coupon code (HARSHI10, SIVA100, GANESH95)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <Button onClick={handleApplyCoupon} variant="outline">
                    Apply
                  </Button>
                </div>
                
                {discount > 0 && (
                  <div className="text-green-600 font-semibold">
                    Discount Applied: {couponCode} ({(discount * 100)}% off)
                  </div>
                )}
                
                {familyPackDiscount > 0 && (
                  <div className="text-green-600 font-semibold">
                    Family Pack Discount: ₹{familyPackDiscount} OFF
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center mb-2 text-green-600">
                      <span>Coupon Discount:</span>
                      <span>-₹{(subtotal * discount).toFixed(0)}</span>
                    </div>
                  )}
                  {familyPackDiscount > 0 && (
                    <div className="flex justify-between items-center mb-2 text-green-600">
                      <span>Family Pack:</span>
                      <span>-₹{familyPackDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>₹{getTotalPrice().toFixed(0)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3"
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
