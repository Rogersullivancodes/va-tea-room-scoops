import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, Home, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdConfirmation: React.FC = () => {
  const location = useLocation();
  const { formData, submissionId } = location.state || {};
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Animation sequence
    const timers = [
      setTimeout(() => setAnimationPhase(1), 500),  // Show checkmark
      setTimeout(() => setAnimationPhase(2), 1500), // Show details
      setTimeout(() => setAnimationPhase(3), 2500), // Show final content
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!formData || !submissionId) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-16">
          <Card className="max-w-md">
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">No submission data found.</p>
              <Button asChild>
                <Link to="/ads">Return to Ads Page</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6 transition-all duration-1000 ${
              animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <CheckCircle className={`h-12 w-12 text-green-600 transition-all duration-500 delay-500 ${
                animationPhase >= 1 ? 'scale-100' : 'scale-0'
              }`} />
            </div>
            
            <div className={`transition-all duration-500 delay-1000 ${
              animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Submission Successful!
              </h1>
              <p className="text-lg text-muted-foreground">
                Your ad creative has been received and is under review.
              </p>
            </div>
          </div>

          {/* Submission Details */}
          <div className={`transition-all duration-500 delay-1500 ${
            animationPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Submission Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Submission ID</p>
                    <p className="font-medium">{submissionId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Package Type</p>
                    <p className="font-medium">{formData.packageType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Company Name</p>
                    <p className="font-medium">{formData.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Email</p>
                    <p className="font-medium">{formData.contactEmail}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Ad Title</p>
                  <p className="font-medium">{formData.adTitle}</p>
                </div>
              </CardContent>
            </Card>

            {/* Confirmation Message */}
            <Card className="bg-primary/5 border-primary/20 mb-8">
              <CardContent className="text-center py-8">
                <Mail className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  Email Confirmation Coming Soon
                </h2>
                <p className="text-muted-foreground mb-2">
                  <strong>You will receive an email confirmation within 24 hours regarding your submission.</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Our advertising team will review your materials and contact you with next steps.
                </p>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Review Process</p>
                      <p className="text-sm text-muted-foreground">
                        Our team will review your ad creative and ensure it meets our guidelines.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Email Confirmation</p>
                      <p className="text-sm text-muted-foreground">
                        You'll receive approval status and payment instructions within 24 hours.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Campaign Launch</p>
                      <p className="text-sm text-muted-foreground">
                        Once approved and payment is processed, your ad will go live on our platform.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild variant="outline">
                <Link to="/ads">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Submit Another Ad
                </Link>
              </Button>
              <Button asChild>
                <Link to="/home">
                  <Home className="h-4 w-4 mr-2" />
                  Return to Homepage
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdConfirmation;