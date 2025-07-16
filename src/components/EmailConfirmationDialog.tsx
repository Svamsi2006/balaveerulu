
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";

interface EmailConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const EmailConfirmationDialog = ({ isOpen, onClose, email }: EmailConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            Check your inbox!
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <p>
              We've sent a confirmation email to:
            </p>
            <p className="font-medium text-foreground">
              {email}
            </p>
            <p>
              Click the link in the email to confirm your account and finish signing up.
            </p>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Don't forget to check your spam folder if you don't see the email.</span>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailConfirmationDialog;
