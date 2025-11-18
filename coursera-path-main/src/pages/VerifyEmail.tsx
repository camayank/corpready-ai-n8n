// Email Verification Page

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    setIsVerifying(true);
    try {
      await authService.verifyEmail(verificationToken);
      setVerificationStatus('success');
      await refreshUser();
      toast({
        title: 'Email verified!',
        description: 'Your email has been successfully verified.',
      });
      setTimeout(() => {
        navigate('/onboarding');
      }, 2000);
    } catch (error: any) {
      setVerificationStatus('error');
      toast({
        variant: 'destructive',
        title: 'Verification failed',
        description: error?.message || 'Invalid or expired verification link.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await authService.resendVerificationEmail();
      toast({
        title: 'Email sent!',
        description: 'A new verification email has been sent to your inbox.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to send email',
        description: error?.message || 'Please try again later.',
      });
    } finally {
      setIsResending(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 mb-4 text-primary animate-spin" />
            <p className="text-lg font-medium">Verifying your email...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle2 className="w-16 h-16 mb-4 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold">Email Verified!</h2>
            <p className="text-center text-muted-foreground">
              Redirecting to onboarding...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === 'error' && token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <XCircle className="w-16 h-16 mb-4 text-red-500" />
            <h2 className="mb-2 text-2xl font-bold">Verification Failed</h2>
            <p className="mb-6 text-center text-muted-foreground">
              The verification link is invalid or has expired.
            </p>
            <Button onClick={handleResendVerification} disabled={isResending}>
              {isResending ? 'Sending...' : 'Resend Verification Email'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification email to <strong>{user?.email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Please check your inbox and click the verification link to continue.
          </p>
          <div className="pt-4">
            <Button
              onClick={handleResendVerification}
              disabled={isResending}
              variant="outline"
              className="w-full"
            >
              {isResending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Resend Verification Email'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
