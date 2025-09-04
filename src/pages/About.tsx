import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Heart, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">About CrabsFriedPolitically</h1>
              <p className="text-xl text-muted-foreground">
                Your trusted source for Virginia political news and analysis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To provide comprehensive, unbiased coverage of Virginia politics, 
                    empowering citizens with the information they need to make informed decisions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Our Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A dedicated team of journalists, political analysts, and local experts 
                    committed to bringing you the latest developments in Virginia politics.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Our Values
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We believe in transparency, accountability, and the power of informed 
                    civic participation. Our reporting is guided by these principles.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Our Commitment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We're committed to providing accurate, timely, and relevant political 
                    news that matters to Virginians and the broader political landscape.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Why Choose CrabsFriedPolitically?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Local Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep coverage of Virginia politics from the state house to local elections.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Expert Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    In-depth analysis from experienced political reporters and commentators.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Community Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    Stories that matter to our readers, with community input and engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default About;