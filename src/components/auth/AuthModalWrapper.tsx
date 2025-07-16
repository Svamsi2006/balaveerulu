
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sparkles } from 'lucide-react';
import AuthForm from './AuthForm';
import EmailConfirmationDialog from '@/components/EmailConfirmationDialog';

interface AuthModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModalWrapper = ({ isOpen, onClose }: AuthModalWrapperProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSuccess = () => {
    if (isLogin) {
      onClose();
    } else {
      setShowEmailDialog(true);
    }
  };

  const handleEmailDialogClose = () => {
    setShowEmailDialog(false);
    setUserEmail('');
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
          
          <AuthForm 
            isLogin={isLogin} 
            onToggleMode={toggleMode} 
            onSuccess={handleSuccess} 
          />
        </DialogContent>
      </Dialog>

      <EmailConfirmationDialog
        isOpen={showEmailDialog}
        onClose={handleEmailDialogClose}
        email={userEmail}
      />
    </>
  );
};

export default AuthModalWrapper;
