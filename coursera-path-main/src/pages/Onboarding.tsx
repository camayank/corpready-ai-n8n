// Onboarding Page - Collect user profile information

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { userService } from '@/services/user.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UserCircle2 } from 'lucide-react';
import type { OnboardingData } from '@/types';

const CURRENT_YEAR = new Date().getFullYear();
const GRADUATION_YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR + i - 2);

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<OnboardingData>({
    phone: '',
    gender: 'prefer-not-to-say',
    areaOfStudy: '',
    graduationYear: CURRENT_YEAR,
    consentGiven: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consentGiven) {
      toast({
        variant: 'destructive',
        title: 'Consent required',
        description: 'Please agree to the terms to continue.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const updatedUser = await userService.completeOnboarding(formData);
      updateUser(updatedUser);
      toast({
        title: 'Welcome aboard!',
        description: 'Your profile has been set up successfully.',
      });
      navigate('/app');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to complete onboarding',
        description: error?.message || 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof OnboardingData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <UserCircle2 className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Help us personalize your learning experience
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">
                Gender <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => updateField('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Area of Study */}
            <div className="space-y-2">
              <Label htmlFor="areaOfStudy">
                Area of Study / Major <span className="text-red-500">*</span>
              </Label>
              <Input
                id="areaOfStudy"
                type="text"
                placeholder="e.g., Computer Science, Engineering, Business"
                value={formData.areaOfStudy}
                onChange={(e) => updateField('areaOfStudy', e.target.value)}
                required
              />
            </div>

            {/* Graduation Year */}
            <div className="space-y-2">
              <Label htmlFor="graduationYear">
                Expected Graduation Year <span className="text-red-500">*</span>
              </Label>
              <Select
                value={String(formData.graduationYear)}
                onValueChange={(value) => updateField('graduationYear', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {GRADUATION_YEARS.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/30">
              <Checkbox
                id="consent"
                checked={formData.consentGiven}
                onCheckedChange={(checked) => updateField('consentGiven', checked)}
              />
              <div className="space-y-1">
                <Label
                  htmlFor="consent"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  I agree to the terms and conditions <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-muted-foreground">
                  By checking this box, you agree to receive course recommendations,
                  learning updates, and internship opportunities via email and SMS.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Setting up your profile...' : 'Continue to Dashboard'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
