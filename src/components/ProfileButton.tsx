
import { useState } from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ProfileDrawer from './ProfileDrawer';

const ProfileButton = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuth();

  const getInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((name: string) => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || '😊';
  };

  const getRandomAvatarColor = () => {
    const colors = [
      'from-pink-400 to-purple-500',
      'from-blue-400 to-cyan-500', 
      'from-green-400 to-emerald-500',
      'from-yellow-400 to-orange-500',
      'from-purple-400 to-pink-500',
      'from-indigo-400 to-blue-500'
    ];
    const userEmail = user?.email || '';
    const index = userEmail.length % colors.length;
    return colors[index];
  };

  return (
    <>
      <Button
        onClick={() => setIsProfileOpen(true)}
        className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${getRandomAvatarColor()} hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-3 border-white/50 hover:border-white/80 animate-bounce-gentle`}
        size="icon"
        aria-label="Open profile"
      >
        <div className="flex items-center justify-center w-full h-full">
          {user?.user_metadata?.profile_picture ? (
            <img 
              src={user.user_metadata.profile_picture} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-sm font-comic">
              {getInitials()}
            </span>
          )}
        </div>
        {/* Cute glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent animate-pulse"></div>
      </Button>

      <ProfileDrawer 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </>
  );
};

export default ProfileButton;
