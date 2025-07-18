import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, MegaphoneIcon, Users, TrendingUp, Eye, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

const Ads = () => {
  const adPackages = [
    {
      title: "Banner Ad",
      price: "$299/month",
      description: "Display your message prominently across our site",
      features: [
        "Header banner placement",
        "Mobile responsive design",
        "Click tracking & analytics",
        "Monthly performance reports"
      ],
      icon: <MegaphoneIcon className="h-8 w-8" />
    },
    {
      title: "Video Commercial",
      price: "$799/month",
      description: "15-30 second video ads in our dynamic news banner",
      features: [
        "Prime video banner placement",
        "Professional video hosting",
        "Autoplay capabilities",
        "Detailed engagement metrics"
      ],
      icon: <Eye className="h-8 w-8" />
    },
    {
      title: "Sponsored Content",
      price: "$1,299/month",
      description: "Native article placement in our news feed",
      features: [
        "Editorial-style content",
        "High engagement rates",
        "Social media promotion",
        "Extended reach guarantee"
      ],
      icon: <TrendingUp className="h-8 w-8" />
    }
  ];

  const stats = [
    { label: "Monthly Visitors", value: "125K+", icon: <Users className="h-5 w-5" /> },
    { label: "Avg. Session Time", value: "4.2 min", icon: <Clock className="h-5 w-5" /> },
    { label: "Political Engagement", value: "92%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Return Visitors", value: "68%", icon: <Eye className="h-5 w-5" /> }
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Advertise with CrabsFriedPolitically
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Reach thousands of politically engaged readers with our premium advertising solutions. 
                Get your message in front of the audience that matters most.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ad Packages */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Choose Your Advertising Package
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {adPackages.map((pkg, index) => (
                <Card key={index} className="relative hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4 text-primary">
                      {pkg.icon}
                    </div>
                    <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                    <CardDescription className="text-lg">{pkg.description}</CardDescription>
                    <div className="text-3xl font-bold text-primary mt-4">{pkg.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                Contact our advertising team to discuss custom packages and pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-primary-foreground/80">ads@crabsfriedpolitically.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-primary-foreground/80">(757) 555-CRAB</p>
                </div>
              </div>
              <Button variant="secondary" size="lg">
                Schedule a Consultation
              </Button>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Ads;