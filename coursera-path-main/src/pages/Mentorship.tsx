// Mentorship and Premium Page

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mentorshipService } from '@/services/mentorship.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { UserCircle2, Calendar, Sparkles, Loader2 } from 'lucide-react';

export default function Mentorship() {
  const { toast } = useToast();
  const [isPremiumLeadLoading, setIsPremiumLeadLoading] = useState(false);
  const [premiumFormData, setPremiumFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedIn: '',
    message: '',
  });

  const { data: mentors, isLoading: mentorsLoading } = useQuery({
    queryKey: ['mentors'],
    queryFn: () => mentorshipService.getMentors(),
  });

  const { data: bookings } = useQuery({
    queryKey: ['mentorship-bookings'],
    queryFn: () => mentorshipService.getMyBookings(),
  });

  const handlePremiumLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPremiumLeadLoading(true);
    try {
      await mentorshipService.submitPremiumLead(premiumFormData);
      toast({
        title: 'Interest submitted!',
        description: 'Our team will reach out to you soon.',
      });
      setPremiumFormData({
        name: '',
        email: '',
        phone: '',
        interestedIn: '',
        message: '',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Submission failed',
        description: error?.message || 'Please try again.',
      });
    } finally {
      setIsPremiumLeadLoading(false);
    }
  };

  const handleBookMentor = (mentor: any) => {
    toast({
      title: 'Coming soon',
      description: 'Mentor booking will be available soon.',
    });
  };

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mentorship & Premium</h1>
        <p className="text-muted-foreground">Connect with mentors and explore premium offerings</p>
      </div>

      <Tabs defaultValue="mentors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="premium">Premium Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="mentors" className="space-y-6">
          {mentorsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !mentors || mentors.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <UserCircle2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No mentors available at the moment</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {mentors.map((mentor) => (
                <Card key={mentor.id}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={mentor.avatarUrl} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle>{mentor.name}</CardTitle>
                        <CardDescription>{mentor.title}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{mentor.bio}</p>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button onClick={() => handleBookMentor(mentor)} className="w-full gap-2">
                      <Calendar className="w-4 h-4" />
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Your booked sessions will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="premium">
          <Card>
            <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <CardTitle>Interested in Premium Courses?</CardTitle>
              </div>
              <CardDescription>
                Get access to advanced courses, 1-on-1 mentorship, and guaranteed internship placements
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handlePremiumLeadSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={premiumFormData.name}
                      onChange={(e) => setPremiumFormData({ ...premiumFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={premiumFormData.email}
                      onChange={(e) => setPremiumFormData({ ...premiumFormData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={premiumFormData.phone}
                    onChange={(e) => setPremiumFormData({ ...premiumFormData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestedIn">Interested In</Label>
                  <Input
                    id="interestedIn"
                    placeholder="e.g., Data Science, Web Development"
                    value={premiumFormData.interestedIn}
                    onChange={(e) => setPremiumFormData({ ...premiumFormData, interestedIn: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your learning goals..."
                    value={premiumFormData.message}
                    onChange={(e) => setPremiumFormData({ ...premiumFormData, message: e.target.value })}
                    rows={4}
                  />
                </div>
                <Button type="submit" disabled={isPremiumLeadLoading} size="lg" className="w-full">
                  {isPremiumLeadLoading ? 'Submitting...' : 'Submit Interest'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
