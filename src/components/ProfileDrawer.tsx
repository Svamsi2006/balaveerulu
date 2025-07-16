
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Phone, Mail, MapPin, Edit3, Save, Package, LogOut, Camera, Lock, Bell } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer = ({ isOpen, onClose }: ProfileDrawerProps) => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [tempValues, setTempValues] = useState({
    full_name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      const initialProfile = {
        full_name: user.user_metadata?.full_name || '',
        phone: user.user_metadata?.phone || '',
        email: user.email || '',
        address: user.user_metadata?.address || ''
      };
      setProfile(initialProfile);
      setTempValues({
        full_name: initialProfile.full_name,
        phone: initialProfile.phone,
        address: initialProfile.address
      });
    }
  }, [user]);

  const handleEdit = (field: string) => {
    setIsEditing(field);
  };

  const handleSave = async (field: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          ...user?.user_metadata,
          [field]: tempValues[field as keyof typeof tempValues]
        }
      });

      if (error) throw error;

      setProfile(prev => ({
        ...prev,
        [field]: tempValues[field as keyof typeof tempValues]
      }));
      
      setIsEditing(null);
      toast({
        title: "Got it! 🎉",
        description: "Your profile has been updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Oops! Try again 😊",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = (field: string) => {
    setTempValues(prev => ({
      ...prev,
      [field]: profile[field as keyof typeof profile]
    }));
    setIsEditing(null);
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
    toast({
      title: "See you soon! 👋",
      description: "You've been signed out successfully!",
    });
  };

  const getInitials = () => {
    if (profile.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return profile.email[0]?.toUpperCase() || '😊';
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-purple-900/90 dark:via-blue-900/90 dark:to-indigo-900/90 border-l-4 border-gradient-to-b from-pink-300 via-purple-300 to-blue-300">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-fredoka font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
            <User className="w-6 h-6 text-purple-500" />
            My Super Profile! 🦸‍♂️
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-3 bg-white/60 dark:bg-purple-800/30 rounded-3xl p-6 border-3 border-pink-200/50">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl font-comic shadow-lg border-4 border-white/50">
                {getInitials()}
              </div>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-center text-purple-600 dark:text-purple-300 font-comic font-bold">
              Super {profile.full_name || 'Hero'}! 🌟
            </p>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            {/* Full Name */}
            <div className="bg-white/60 dark:bg-purple-800/30 rounded-2xl p-4 border-2 border-pink-200/50">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-bold text-purple-700 dark:text-purple-300 font-comic flex items-center gap-2">
                  <User className="w-4 h-4" />
                  🧒 Full Name
                </Label>
                {isEditing !== 'full_name' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit('full_name')}
                    className="text-purple-500 hover:text-purple-700 hover:bg-purple-100/50"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {isEditing === 'full_name' ? (
                <div className="space-y-2">
                  <Input
                    value={tempValues.full_name}
                    onChange={(e) => setTempValues(prev => ({ ...prev, full_name: e.target.value }))}
                    className="border-2 border-pink-300 rounded-xl font-comic"
                    placeholder="Enter your superhero name!"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSave('full_name')}
                      className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-comic font-bold rounded-xl flex-1"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Got it! 🎉
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancel('full_name')}
                      className="border-2 border-gray-300 rounded-xl font-comic font-bold"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800 dark:text-gray-200 font-medium font-comic">
                  {profile.full_name || 'Add your name!'}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="bg-white/60 dark:bg-purple-800/30 rounded-2xl p-4 border-2 border-pink-200/50">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-bold text-purple-700 dark:text-purple-300 font-comic flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  📱 Mobile Number
                </Label>
                {isEditing !== 'phone' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit('phone')}
                    className="text-purple-500 hover:text-purple-700 hover:bg-purple-100/50"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {isEditing === 'phone' ? (
                <div className="space-y-2">
                  <Input
                    value={tempValues.phone}
                    onChange={(e) => setTempValues(prev => ({ ...prev, phone: e.target.value }))}
                    className="border-2 border-pink-300 rounded-xl font-comic"
                    placeholder="Your contact number"
                    type="tel"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSave('phone')}
                      className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-comic font-bold rounded-xl flex-1"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Got it! 🎉
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancel('phone')}
                      className="border-2 border-gray-300 rounded-xl font-comic font-bold"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800 dark:text-gray-200 font-medium font-comic">
                  {profile.phone || 'Add your phone number!'}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="bg-white/60 dark:bg-purple-800/30 rounded-2xl p-4 border-2 border-pink-200/50">
              <Label className="text-sm font-bold text-purple-700 dark:text-purple-300 font-comic flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4" />
                📧 Email Address
              </Label>
              <p className="text-gray-800 dark:text-gray-200 font-medium font-comic">
                {profile.email}
              </p>
            </div>

            {/* Address */}
            <div className="bg-white/60 dark:bg-purple-800/30 rounded-2xl p-4 border-2 border-pink-200/50">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-bold text-purple-700 dark:text-purple-300 font-comic flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  🏡 Home Sweet Home
                </Label>
                {isEditing !== 'address' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit('address')}
                    className="text-purple-500 hover:text-purple-700 hover:bg-purple-100/50"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {isEditing === 'address' ? (
                <div className="space-y-2">
                  <Input
                    value={tempValues.address}
                    onChange={(e) => setTempValues(prev => ({ ...prev, address: e.target.value }))}
                    className="border-2 border-pink-300 rounded-xl font-comic"
                    placeholder="Your magical address"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSave('address')}
                      className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-comic font-bold rounded-xl flex-1"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Got it! 🎉
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancel('address')}
                      className="border-2 border-gray-300 rounded-xl font-comic font-bold"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800 dark:text-gray-200 font-medium font-comic">
                  {profile.address || 'Add your address!'}
                </p>
              )}
            </div>
          </div>

          {/* My Orders Section */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl p-4 border-2 border-yellow-300/50">
            <Link to="/orders" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start text-left font-comic font-bold text-orange-700 dark:text-orange-300 hover:bg-orange-200/50">
                <Package className="w-5 h-5 mr-3" />
                🎁 My Awesome Orders
              </Button>
            </Link>
          </div>

          {/* Settings Section */}
          <div className="space-y-3">
            <h3 className="font-fredoka font-bold text-lg text-purple-700 dark:text-purple-300">
              ⚙️ Super Settings
            </h3>
            
            {/* Theme Toggle */}
            <div className="bg-white/60 dark:bg-purple-800/30 rounded-2xl p-4 border-2 border-pink-200/50 flex items-center justify-between">
              <Label className="font-comic font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                🎨 Theme Magic
              </Label>
              <ThemeToggle />
            </div>

            {/* Change Password */}
            <Button
              variant="ghost"
              className="w-full justify-start bg-white/60 dark:bg-purple-800/30 rounded-2xl p-4 border-2 border-pink-200/50 font-comic font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-100/50"
            >
              <Lock className="w-5 h-5 mr-3" />
              🔐 Change Password
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              className="w-full justify-start bg-white/60 dark:bg-purple-800/30 rounded-2xl p-4 border-2 border-pink-200/50 font-comic font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-100/50"
            >
              <Bell className="w-5 h-5 mr-3" />
              🔔 Notification Settings
            </Button>
          </div>

          {/* Sign Out Button */}
          <Button
            onClick={handleSignOut}
            className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-comic font-bold rounded-2xl py-6 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <LogOut className="w-5 h-5 mr-2" />
            👋 Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileDrawer;
