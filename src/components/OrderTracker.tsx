
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Package, Truck, Clock } from 'lucide-react';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  created_at: string;
  shipping_address: any;
  order_items: any[];
}

interface OrderTrackerProps {
  order: Order;
}

const OrderTracker = ({ order }: OrderTrackerProps) => {
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const statusSteps = [
    {
      key: 'pending',
      label: 'Order Placed',
      description: 'Your order has been received',
      icon: <Clock className="h-5 w-5" />,
      days: 0
    },
    {
      key: 'preparing',
      label: 'Preparing',
      description: 'Your comic book is being personalized',
      icon: <Package className="h-5 w-5" />,
      days: 2
    },
    {
      key: 'shipped',
      label: 'Shipped',
      description: 'Your order is on its way',
      icon: <Truck className="h-5 w-5" />,
      days: 4
    },
    {
      key: 'out_for_delivery',
      label: 'Out for Delivery',
      description: 'Your package is out for delivery',
      icon: <Truck className="h-5 w-5" />,
      days: 6
    },
    {
      key: 'delivered',
      label: 'Delivered',
      description: 'Package delivered successfully',
      icon: <CheckCircle className="h-5 w-5" />,
      days: 7
    }
  ];

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  const getCurrentStatusIndex = () => {
    return getStatusIndex(currentStatus);
  };

  const getEstimatedDate = (orderDate: string, daysToAdd: number) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isStepCompleted = (stepIndex: number) => {
    return stepIndex <= getCurrentStatusIndex();
  };

  const isStepCurrent = (stepIndex: number) => {
    return stepIndex === getCurrentStatusIndex();
  };

  // Simulate status progression for demo purposes
  useEffect(() => {
    const orderDate = new Date(order.created_at);
    const currentDate = new Date();
    const daysDiff = Math.floor((currentDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let newStatus = 'pending';
    if (daysDiff >= 6) newStatus = 'delivered';
    else if (daysDiff >= 4) newStatus = 'out_for_delivery';
    else if (daysDiff >= 2) newStatus = 'shipped';
    else if (daysDiff >= 1) newStatus = 'preparing';
    
    setCurrentStatus(newStatus);
  }, [order.created_at]);

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">
                Order #{order.order_number}
              </CardTitle>
              <p className="text-gray-600">
                Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">₹{order.total_amount.toFixed(0)}</p>
              <Badge className="bg-blue-500 text-white mt-2">
                Expected: {getEstimatedDate(order.created_at, 7)}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Status Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div 
              className="absolute left-6 top-0 w-0.5 bg-blue-500 transition-all duration-1000"
              style={{ 
                height: `${(getCurrentStatusIndex() / (statusSteps.length - 1)) * 100}%` 
              }}
            ></div>

            {/* Status Steps */}
            <div className="space-y-8">
              {statusSteps.map((step, index) => (
                <div key={step.key} className="relative flex items-center space-x-4">
                  {/* Status Icon */}
                  <div className={`
                    relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 
                    ${isStepCompleted(index) 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : isStepCurrent(index)
                      ? 'bg-white border-blue-500 text-blue-500'
                      : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}>
                    {isStepCompleted(index) ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      step.icon
                    )}
                  </div>

                  {/* Status Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-semibold ${
                          isStepCompleted(index) || isStepCurrent(index) 
                            ? 'text-gray-900' 
                            : 'text-gray-500'
                        }`}>
                          {step.label}
                        </h3>
                        <p className={`text-sm ${
                          isStepCompleted(index) || isStepCurrent(index) 
                            ? 'text-gray-600' 
                            : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          isStepCompleted(index) || isStepCurrent(index) 
                            ? 'text-gray-900' 
                            : 'text-gray-400'
                        }`}>
                          {getEstimatedDate(order.created_at, step.days)}
                        </p>
                        {isStepCurrent(index) && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.order_items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={item.product_image} 
                  alt={item.product_title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.product_title}</h4>
                  <p className="text-sm text-gray-600">
                    Format: {item.format} | Quantity: {item.quantity}
                  </p>
                  {item.character_name && (
                    <p className="text-sm text-gray-600">
                      Character: {item.character_name}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{(item.unit_price * item.quantity).toFixed(0)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">{order.shipping_address.fullName}</p>
            <p>{order.shipping_address.address}</p>
            <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postalCode}</p>
            <p>{order.shipping_address.phone}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTracker;
