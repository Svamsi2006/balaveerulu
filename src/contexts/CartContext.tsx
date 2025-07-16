import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  title: string;
  image: string;
  format: 'digital' | 'print' | 'combo';
  quantity: number;
  price: number;
  characterName?: string;
  customMessage?: string;
  customStory?: string;
  customTitle?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  applyCoupon: (code: string) => boolean;
  discount: number;
  couponCode: string;
  loading: boolean;
  familyPackDiscount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Calculate family pack discount (₹200 off when buying 2+ items)
  const familyPackDiscount = items.reduce((total, item) => total + item.quantity, 0) >= 2 ? 200 : 0;

  // Load cart items from database when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromDatabase();
    } else {
      // Clear cart when user logs out
      setItems([]);
      setDiscount(0);
      setCouponCode('');
    }
  }, [user]);

  const loadCartFromDatabase = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const cartItems: CartItem[] = (data || []).map(item => ({
        id: item.id,
        title: item.product_title,
        image: item.product_image,
        format: item.format as 'digital' | 'print' | 'combo',
        quantity: item.quantity,
        price: Number(item.price),
        characterName: item.character_name || undefined,
        customMessage: item.custom_message || undefined,
        customStory: item.custom_story || undefined,
        customTitle: item.custom_title || undefined,
      }));

      setItems(cartItems);
    } catch (error) {
      console.error('Error loading cart:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item: Omit<CartItem, 'id'>) => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to be logged in to add items to cart",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_title: item.title,
          product_image: item.image,
          format: item.format,
          quantity: item.quantity,
          price: item.price,
          character_name: item.characterName || null,
          custom_message: item.customMessage || null,
          custom_story: item.customStory || null,
          custom_title: item.customTitle || null,
        })
        .select()
        .single();

      if (error) throw error;

      const newItem: CartItem = {
        id: data.id,
        title: data.product_title,
        image: data.product_image,
        format: data.format as 'digital' | 'print' | 'combo',
        quantity: data.quantity,
        price: Number(data.price),
        characterName: data.character_name || undefined,
        customMessage: data.custom_message || undefined,
        customStory: data.custom_story || undefined,
        customTitle: data.custom_title || undefined,
      };

      setItems(prev => [...prev, newItem]);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  const removeFromCart = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      });
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive"
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setItems([]);
      setDiscount(0);
      setCouponCode('');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive"
      });
    }
  };

  const getTotalPrice = () => {
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalDiscount = (subtotal * discount) + familyPackDiscount;
    return Math.max(0, subtotal - totalDiscount);
  };

  const applyCoupon = (code: string) => {
    const upperCode = code.toUpperCase();
    
    if (upperCode === 'HARSHI10') {
      setDiscount(0.1);
      setCouponCode(code);
      return true;
    } else if (upperCode === 'SIVA100') {
      setDiscount(0.98);
      setCouponCode(code);
      return true;
    } else if (upperCode === 'GANESH95') {
      setDiscount(0.95);
      setCouponCode(code);
      return true;
    }
    
    return false;
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      applyCoupon,
      discount,
      couponCode,
      loading,
      familyPackDiscount
    }}>
      {children}
    </CartContext.Provider>
  );
};
