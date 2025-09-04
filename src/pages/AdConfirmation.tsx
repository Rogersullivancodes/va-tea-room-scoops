import React from 'react';
import { CheckCircle, Calendar, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdConfirmation: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-600 rounded-full">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">
                Advertisement Submitted Successfully!
              </h1>
              <p className="text-xl text-muted-foreground">
                Thank you for choosing CrabsFriedPolitically for your advertising needs
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    What Happens Next?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Review Process</h4>
                      <p className="text-sm text-muted-foreground">
                        Our advertising team will review your submission within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Initial Contact</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll reach out to discuss creative assets and campaign details
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Campaign Setup</h4>
                      <p className="text-sm text-muted-foreground">
                        Finalize ad creatives, placement, and scheduling
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Go Live</h4>
                      <p className="text-sm text-muted-foreground">
                        Your advertisement goes live on the scheduled date
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-sm text-muted-foreground">ads@crabsfriedpolitically.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                      <p className="text-xs text-muted-foreground">Monday - Friday, 9AM - 5PM EST</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                      Questions or Changes?
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-400">
                      If you need to modify your submission or have any questions, 
                      please contact our advertising team directly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Average Response Time</h3>
                  <div className="text-3xl font-bold text-primary mb-2">4 Hours</div>
                  <p className="text-sm text-muted-foreground">Initial contact from our team</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Campaign Success Rate</h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                  <p className="text-sm text-muted-foreground">Client satisfaction rating</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Average CTR</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">2.8%</div>
                  <p className="text-sm text-muted-foreground">Click-through rate</p>
                </CardContent>
              </Card>
            </div>

            <Card className="text-center">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Ready to Explore More?</h2>
                <p className="text-muted-foreground mb-6">
                  While you wait for our team to contact you, explore our platform and see what your ads will be alongside.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/" className="flex items-center gap-2">
                      Browse Articles <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/news">Latest News</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/ads">View Ad Packages</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AdConfirmation;