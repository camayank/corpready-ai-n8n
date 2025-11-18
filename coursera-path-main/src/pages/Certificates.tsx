// Certificates Page - View and download certificates

import { useQuery } from '@tanstack/react-query';
import { certificateService } from '@/services/certificate.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Download, ExternalLink, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Certificates() {
  const { toast } = useToast();

  const { data: certificates, isLoading } = useQuery({
    queryKey: ['certificates'],
    queryFn: () => certificateService.getMyCertificates(),
  });

  const handleDownload = async (certificateId: string, courseName: string) => {
    try {
      const blob = await certificateService.downloadCertificate(certificateId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${courseName.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast({
        title: 'Downloaded!',
        description: 'Your certificate has been downloaded.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Download failed',
        description: 'Unable to download certificate.',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Certificates</h1>
        <p className="text-muted-foreground">View and download your earned certificates</p>
      </div>

      {!certificates || certificates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="w-16 h-16 mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Complete courses and pass quizzes to earn certificates.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((cert) => (
            <Card key={cert.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="flex items-start justify-between">
                  <Award className="w-8 h-8 text-primary" />
                  <Badge>Verified</Badge>
                </div>
                <CardTitle className="mt-4">{cert.certificateCode}</CardTitle>
                <CardDescription>
                  Issued on {new Date(cert.issueDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Issued by</p>
                  <p className="font-medium">{cert.issuedBy}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleDownload(cert.id, cert.certificateCode)}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(cert.shareableUrl, '_blank')}
                    className="gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
