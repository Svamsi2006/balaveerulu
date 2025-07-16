
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Sparkles, Star } from 'lucide-react';
import EmailConfirmationDialog from '@/components/EmailConfirmationDialog';
 
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Oops! Try again 😊",
            description: error.message || "Invalid email or password. Please check and try again!",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Welcome back, Super Hero! 🎉",
            description: "You're all set to create amazing stories!",
          });
          onClose();
        }
      } else {
        if (!fullName.trim()) {
          toast({
            title: "Missing Info! 🤔",
            description: "Don't forget to tell us your superhero name!",
            variant: "destructive"
          });
          return;
        }
        
        if (!phone.trim()) {
          toast({
            title: "Phone Required! 📱",
            description: "We need your phone number to keep in touch!",
            variant: "destructive"
          });
          return;
        }
        
        if (password.length < 6) {
          toast({
            title: "Password Too Short! 🔐",
            description: "Your password needs to be at least 6 characters to keep your account super safe!",
            variant: "destructive"
          });
          return;
        }

        const { error } = await signUp(email, password, {
          full_name: fullName,
          phone: phone || '',
          address: address || ''
        });
        if (error) {
          if (error.message?.includes('User already registered')) {
            toast({
              title: "You're Already With Us! 😄",
              description: "An account with this email already exists. Let's sign you in instead!",
              variant: "destructive"
            });
            setIsLogin(true);
          } else {
            toast({
              title: "Oops! Try again 😊",
              description: error.message || "Something went wrong. Let's try that again!",
              variant: "destructive"
            });
          }
        } else {
          setShowEmailDialog(true);
          toast({
            title: "Yay! Almost There! 🎊",
            description: "Check your email to activate your super account!",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Oops! Something's Not Right 😅",
        description: "Let's try that again in a moment!",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setAddress('');
  };

  const handleEmailDialogClose = () => {
    setShowEmailDialog(false);
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setAddress('');
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-purple-900/90 dark:via-blue-900/90 dark:to-indigo-900/90 border-4 border-gradient-to-r from-pink-300 via-purple-300 to-blue-300 shadow-2xl">
          <DialogHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg animate-bounce-gentle">
                  <img 
                    src="/lovable-uploads/26aab459-6fcc-4964-a14d-07eba0bfa570.png" 
                    alt="Balaveerulu Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-wiggle" />
              </div>
            </div>
            <DialogTitle className="text-3xl font-fredoka font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              {isLogin ? '🌟 Welcome Back, Hero!' : '🎉 Join Our Adventure!'}
            </DialogTitle>
            <p className="text-gray-600 dark:text-gray-300 mt-2 font-comic">
              {isLogin ? 'Ready to continue your magical journey?' : 'Let\'s create your superhero account and start making awesome stories!'}
            </p>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 font-comic">
                  ✨ Your Super Name *
                </label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                  placeholder="Enter your superhero name"
                  className="w-full h-12 border-3 border-pink-300 rounded-xl font-comic focus:border-purple-400 bg-white/80"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 font-comic">
                📧 Email Address *
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                className="w-full h-12 border-3 border-pink-300 rounded-xl font-comic focus:border-purple-400 bg-white/80"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 font-comic">
                🔐 Password *
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={isLogin ? "Enter your password" : "Create a strong password (min 6 characters)"}
                  className="w-full h-12 border-3 border-pink-300 rounded-xl font-comic focus:border-purple-400 bg-white/80 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-comic">
                  Make it super strong with at least 6 characters! 💪
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 font-comic">
                  📱 Phone Number *
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={!isLogin}
                  placeholder="Enter your phone number"
                  className="w-full h-12 border-3 border-pink-300 rounded-xl font-comic focus:border-purple-400 bg-white/80"
                />
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 font-comic">
                  🏡 Address (Optional)
                </label>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your home address (optional)"
                  className="w-full h-12 border-3 border-pink-300 rounded-xl font-comic focus:border-purple-400 bg-white/80"
                />
              </div>
            )}
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold h-12 text-lg rounded-xl font-comic shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Working Magic...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isLogin ? "🚀 Let's Go!" : "🌟 Create My Account"}
                  <Star className="w-5 h-5 animate-wiggle" />
                </div>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-purple-600 dark:text-purple-300 text-sm font-comic">
              {isLogin ? "New to our magical world?" : "Already have a super account?"}
            </p>
            <button
              onClick={toggleMode}
              className="text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 font-bold underline mt-2 font-comic text-base transition-colors hover:scale-105 transform"
            >
              {isLogin ? "🎨 Create New Account" : "🔑 Sign In Instead"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <EmailConfirmationDialog
        isOpen={showEmailDialog}
        onClose={handleEmailDialogClose}
        email={email}
      />
    </>
  );
};

export default AuthModal;
