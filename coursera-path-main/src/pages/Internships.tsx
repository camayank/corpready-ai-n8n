// Internships Page - Browse and apply for internships

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { internshipService } from '@/services/internship.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, MapPin, DollarSign, Loader2, Bookmark, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Internships() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [remoteFilter, setRemoteFilter] = useState<string>('all');

  const { data: eligibility } = useQuery({
    queryKey: ['internship-eligibility'],
    queryFn: () => internshipService.checkEligibility(),
  });

  const { data: internships, isLoading } = useQuery({
    queryKey: ['internships', remoteFilter],
    queryFn: () => internshipService.getInternships({
      isRemote: remoteFilter === 'remote' ? true : remoteFilter === 'onsite' ? false : undefined,
    }),
    enabled: eligibility?.eligible !== false,
  });

  const { data: savedInternships } = useQuery({
    queryKey: ['saved-internships'],
    queryFn: () => internshipService.getSavedInternships(),
    enabled: eligibility?.eligible !== false,
  });

  const { data: applications } = useQuery({
    queryKey: ['internship-applications'],
    queryFn: () => internshipService.getMyApplications(),
    enabled: eligibility?.eligible !== false,
  });

  const handleSave = async (internshipId: string) => {
    try {
      await internshipService.saveInternship(internshipId);
      toast({
        title: 'Saved!',
        description: 'Internship added to your saved list.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save internship.',
      });
    }
  };

  const handleApply = async (internship: any) => {
    try {
      await internshipService.applyToInternship(internship.id);
      toast({
        title: 'Applied!',
        description: 'Your application has been submitted.',
      });
      // Open external URL
      window.open(internship.applyUrl, '_blank');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message || 'Failed to submit application.',
      });
    }
  };

  if (!eligibility?.eligible) {
    return (
      <div className="container max-w-6xl py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="w-16 h-16 mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Certificate Required</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {eligibility?.reason || 'You need at least one certificate to access internships.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredInternships = internships?.filter((int) => {
    const matchesSearch = int.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      int.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }) || [];

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Internships</h1>
        <p className="text-muted-foreground">Find opportunities that match your skills</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Internships</TabsTrigger>
          <TabsTrigger value="saved">Saved ({savedInternships?.length || 0})</TabsTrigger>
          <TabsTrigger value="applied">Applications ({applications?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            <Input
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Select value={remoteFilter} onValueChange={setRemoteFilter}>
              <SelectTrigger className="max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote Only</SelectItem>
                <SelectItem value="onsite">On-site Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Internship List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredInternships.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No internships found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredInternships.map((internship) => (
                <Card key={internship.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>{internship.title}</CardTitle>
                          {internship.matchScore && internship.matchScore >= 70 && (
                            <Badge variant="secondary">{internship.matchScore}% Match</Badge>
                          )}
                        </div>
                        <CardDescription className="text-base font-medium">
                          {internship.company}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {internship.isRemote ? 'Remote' : internship.location}
                      </div>
                      {internship.stipend && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          ₹{internship.stipend.toLocaleString()}/month
                        </div>
                      )}
                      <div className="text-muted-foreground">{internship.duration}</div>
                    </div>
                    <p className="text-sm line-clamp-2">{internship.description}</p>
                    <div className="flex gap-2">
                      <Button onClick={() => handleApply(internship)} className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Apply Now
                      </Button>
                      <Button variant="outline" onClick={() => handleSave(internship.id)} className="gap-2">
                        <Bookmark className="w-4 h-4" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardContent className="py-12 text-center">
              <Bookmark className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Your saved internships will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applied">
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Your applications will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
