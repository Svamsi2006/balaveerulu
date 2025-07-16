
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, Gamepad2, Package, Settings, LogOut, Sparkles } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const menuItems = [
    { name: "Home", href: "/", icon: Home, emoji: "🏠", color: "from-pink-400 to-purple-500" },
    { name: "How It Works", href: "/how-it-works", icon: Sparkles, emoji: "⚡", color: "from-blue-400 to-cyan-500" },
    { name: "Gallery", href: "/gallery", icon: Gamepad2, emoji: "🎨", color: "from-green-400 to-emerald-500" },
    { name: "Create Book", href: "/create", icon: Package, emoji: "📚", color: "from-yellow-400 to-orange-500" },
    { name: "My Orders", href: "/orders", icon: Package, emoji: "📦", color: "from-purple-400 to-pink-500" },
    { name: "Pricing", href: "/pricing", icon: Settings, emoji: "💎", color: "from-indigo-400 to-blue-500" },
  ];

  // Handle swipe functionality
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isRightSwipe && !isOpen) {
        // Swipe right to open menu (from screen edge)
        if (touchStart < 50) {
          // Only trigger if swipe starts from left edge
          // This would be handled by parent component
        }
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [touchStart, touchEnd, isOpen]);

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="left" 
        className="w-80 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-purple-900/95 dark:via-blue-900/95 dark:to-indigo-900/95 border-r-4 border-gradient-to-b from-pink-300 via-purple-300 to-blue-300 overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="text-center py-6 border-b-2 border-purple-200/50">
            <div className="flex items-center justify-center mb-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg animate-bounce-gentle">
                <img 
                  src="/lovable-uploads/26aab459-6fcc-4964-a14d-07eba0bfa570.png" 
                  alt="Balaveerulu Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-2xl font-fredoka font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Super Menu! 🚀
            </h2>
            {user && (
              <p className="text-sm text-purple-600 dark:text-purple-300 font-comic mt-2">
                Hi, {user.user_metadata?.full_name?.split(' ')[0] || 'Super Hero'}! 👋
              </p>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-6 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`block w-full p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === item.href
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : 'bg-white/60 dark:bg-purple-800/30 hover:bg-white/80 dark:hover:bg-purple-700/40 border-2 border-pink-200/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    location.pathname === item.href
                      ? 'bg-white/20'
                      : `bg-gradient-to-r ${item.color}`
                  }`}>
                    <span className="text-2xl">{item.emoji}</span>
                  </div>
                  <div>
                    <h3 className={`font-comic font-bold text-lg ${
                      location.pathname === item.href
                        ? 'text-white'
                        : 'text-purple-700 dark:text-purple-300'
                    }`}>
                      {item.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sign Out Button */}
          {user && (
            <div className="border-t-2 border-purple-200/50 pt-4">
              <Button
                onClick={handleSignOut}
                className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-comic font-bold rounded-2xl py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <LogOut className="w-5 h-5 mr-2" />
                👋 Sign Out
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
