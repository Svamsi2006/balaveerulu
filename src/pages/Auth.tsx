
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import EmailConfirmationDialog from '@/components/EmailConfirmationDialog';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        console.log('Attempting to sign in with:', formData.email);
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          console.error('Sign in error:', error);
          toast({
            title: "Login Failed",
            description: error.message || "Invalid email or password. Please try again.",
            variant: "destructive"
          });
        } else {
          console.log('Sign in successful');
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          navigate('/');
        }
      } else {
        console.log('Attempting to sign up with:', formData.email, formData.fullName);
        if (!formData.fullName.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter your full name.",
            variant: "destructive"
          });
          return;
        }
        
        if (!formData.phone.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter your phone number.",
            variant: "destructive"
          });
          return;
        }
        
        if (formData.password.length < 6) {
          toast({
            title: "Validation Error",
            description: "Password must be at least 6 characters long.",
            variant: "destructive"
          });
          return;
        }

        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address
        });

        if (error) {
          console.error('Sign up error:', error);
          if (error.message?.includes('User already registered')) {
            toast({
              title: "Account Exists",
              description: "An account with this email already exists. Please sign in instead.",
              variant: "destructive"
            });
            setIsLogin(true);
          } else {
            toast({
              title: "Signup Failed",
              description: error.message || "Failed to create account. Please try again.",
              variant: "destructive"
            });
          }
        } else {
          console.log('Sign up successful');
          setShowEmailDialog(true);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Clear form when switching modes
    setFormData({
      email: '',
      password: '',
      fullName: '',
      phone: '',
      address: ''
    });
  };

  const handleEmailDialogClose = () => {
    setShowEmailDialog(false);
    // Clear the form after showing the dialog
    setFormData({
      email: '',
      password: '',
      fullName: '',
      phone: '',
      address: ''
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="container mx-auto max-w-md">
          {/* Mobile-friendly back button */}
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
          </div>

          <Card className="shadow-xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl sm:text-3xl font-comic text-orange-600 dark:text-orange-400">
                {isLogin ? 'Welcome Back!' : 'Join the Adventure!'}
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
                {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
              </p>
            </CardHeader>
            
            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required={!isLogin}
                      placeholder="Enter your full name"
                      className="w-full h-11"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="w-full h-11"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required={!isLogin}
                      placeholder="Enter your phone number"
                      className="w-full h-11"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                      placeholder={isLogin ? "Enter your password" : "Create a password (min 6 characters)"}
                      className="w-full h-11 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {!isLogin && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address (Optional)
                    </label>
                    <Input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your address (optional)"
                      className="w-full h-11"
                    />
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold h-11 text-base transition-colors"
                >
                  {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                  onClick={toggleMode}
                  className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 font-semibold underline mt-1 text-sm transition-colors"
                >
                  {isLogin ? "Create Account" : "Sign In"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EmailConfirmationDialog
        isOpen={showEmailDialog}
        onClose={handleEmailDialogClose}
        email={formData.email}
      />
    </>
  );
};

export default Auth;
