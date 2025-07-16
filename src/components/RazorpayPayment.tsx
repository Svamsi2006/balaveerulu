
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Wallet } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
}

const RazorpayPayment = ({ amount, onSuccess, onCancel, customerDetails }: RazorpayPaymentProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const res = await loadRazorpayScript();
      
      if (!res) {
        toast({
          title: "Payment Error",
          description: "Razorpay SDK failed to load. Please check your internet connection and try again.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Log for debugging
      console.log('Initializing Razorpay payment with amount:', amount);
      console.log('Customer details:', customerDetails);

      const options = {
        key: "rzp_live_6DzoepHUGOUKxt", // Updated to live Razorpay key
        amount: amount * 100, // Amount in paise (multiply by 100)
        currency: "INR",
        name: "Balaveerulu Comic Books",
        description: "Personalized Comic Book Order - Transform your child into a superhero!",
        image: "/lovable-uploads/26aab459-6fcc-4964-a14d-07eba0bfa570.png",
        handler: function (response: any) {
          console.log('Payment successful:', response);
          toast({
            title: "Payment Successful! 🎉",
            description: `Payment ID: ${response.razorpay_payment_id}. Redirecting to confirmation page...`,
          });
          onSuccess();
          // Small delay to show the success message before redirect
          setTimeout(() => {
            navigate('/thank-you');
          }, 2000);
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.phone,
        },
        notes: {
          address: "Balaveerulu Comic Books",
          order_type: "Comic Book Purchase"
        },
        theme: {
          color: "#F97316", // Orange theme matching your website
        },
        modal: {
          ondismiss: function() {
            console.log('Payment cancelled by user');
            toast({
              title: "Payment Cancelled",
              description: "Payment was cancelled. You can try again whenever you're ready!",
              variant: "destructive"
            });
            onCancel();
            setLoading(false);
          }
        },
        retry: {
          enabled: true,
          max_count: 3
        }
      };

      console.log('Opening Razorpay checkout with options:', options);
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(false);
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Complete Your Payment
      </h3>
      
      {/* Payment Amount Display */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg mb-6 text-center">
        <p className="text-lg text-gray-600 mb-2">Total Amount</p>
        <p className="text-3xl font-bold text-orange-600">₹{amount}</p>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-3 text-center">Payment methods available:</p>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Cards</span>
          </div>
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
            <Smartphone className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">UPI</span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-lg">
            <Wallet className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Wallets</span>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-gray-700 mb-2">Order Details:</h4>
        <p className="text-sm text-gray-600"><strong>Name:</strong> {customerDetails.name}</p>
        <p className="text-sm text-gray-600"><strong>Email:</strong> {customerDetails.email}</p>
        <p className="text-sm text-gray-600"><strong>Phone:</strong> {customerDetails.phone}</p>
      </div>

      {/* Pay Button */}
      <Button 
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 text-lg rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Processing...</span>
          </div>
        ) : (
          `Pay ₹${amount} Now`
        )}
      </Button>

      {/* Security Note */}
      <p className="text-xs text-gray-500 text-center mt-4">
        🔒 Your payment is secured by Razorpay with 256-bit SSL encryption
      </p>
    </div>
  );
};

export default RazorpayPayment;
