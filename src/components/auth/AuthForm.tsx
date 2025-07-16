
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Sparkles, Star } from 'lucide-react';

interface AuthFormProps {
  isLogin: boolean;
  onToggleMode: () => void;
  onSuccess: () => void;
}

const AuthForm = ({ isLogin, onToggleMode, onSuccess }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
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
          onSuccess();
        }
      } else {
        // Validation for signup
        if (!formData.fullName.trim()) {
          toast({
            title: "Missing Info! 🤔",
            description: "Don't forget to tell us your superhero name!",
            variant: "destructive"
          });
          return;
        }
        
        if (formData.password.length < 6) {
          toast({
            title: "Password Too Short! 🔐",
            description: "Your password needs to be at least 6 characters to keep your account super safe!",
            variant: "destructive"
          });
          return;
        }

        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullName,
          phone: formData.phone || '',
          address: formData.address || ''
        });

        if (error) {
          if (error.message?.includes('User already registered')) {
            toast({
              title: "You're Already With Us! 😄",
              description: "An account with this email already exists. Let's sign you in instead!",
              variant: "destructive"
            });
            onToggleMode();
          } else {
            toast({
              title: "Oops! Try again 😊",
              description: error.message || "Something went wrong. Let's try that again!",
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Yay! Almost There! 🎊",
            description: "Check your email to activate your super account!",
          });
          onSuccess();
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

  const clearForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      phone: '',
      address: ''
    });
  };

  // Clear form when switching between login/signup
  const handleToggleMode = () => {
    clearForm();
    onToggleMode();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <div>
          <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 font-comic">
            ✨ Your Super Name *
          </label>
          <Input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
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
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          placeholder="Enter your email address"
          className="w-full h-12 border-3 border-pink-300 rounded-xl font-comic focus:border-purple-400 bg-white/80"
        />
      </div>

      {!isLogin && (
        <div>
          <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 font-comic">
            📱 Phone Number (Optional)
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter your phone number (optional)"
            className="w-full h-12 border-3 border-pink-300 rounded-xl font-comic focus:border-purple-400 bg-white/80"
          />
        </div>
      )}
      
      <div>
        <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 font-comic">
          🔐 Password *
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
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
            🏡 Address (Optional)
          </label>
          <Input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
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

      <div className="mt-6 text-center">
        <p className="text-purple-600 dark:text-purple-300 text-sm font-comic">
          {isLogin ? "New to our magical world?" : "Already have a super account?"}
        </p>
        <button
          type="button"
          onClick={handleToggleMode}
          className="text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 font-bold underline mt-2 font-comic text-base transition-colors hover:scale-105 transform"
        >
          {isLogin ? "🎨 Create New Account" : "🔑 Sign In Instead"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
