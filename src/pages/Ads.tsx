import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Eye, TrendingUp, Mail, Phone, Target } from 'lucide-react';

const Ads = () => {
  const adPackages = [
    {
      title: "Banner Ad - Top",
      price: "$299/month",
      description: "Premium placement at the top of every page",
      features: [
        "728x90 banner placement",
        "100% page visibility",
        "Click tracking included",
        "Virginia-focused audience"
      ],
      icon: <Target className="h-8 w-8 text-primary" />
    },
    {
      title: "Sidebar Premium",
      price: "$199/month", 
      description: "Consistent visibility in our sidebar",
      features: [
        "300x250 display ad",
        "Sticky positioning option",
        "Political audience targeting",
        "Monthly performance reports"
      ],
      icon: <Eye className="h-8 w-8 text-primary" />
    },
    {
      title: "Article Sponsorship",
      price: "$499/article",
      description: "Sponsor breaking political news",
      features: [
        "Brand mention in articles",
        "Logo placement",
        "Social media promotion",
        "Newsletter inclusion"
      ],
      icon: <TrendingUp className="h-8 w-8 text-primary" />
    }
  ];

  const stats = [
    { label: "Monthly Readers", value: "25,000+", icon: <Users className="h-6 w-6" /> },
    { label: "Page Views", value: "150,000+", icon: <Eye className="h-6 w-6" /> },
    { label: "Political Engagement", value: "85%", icon: <TrendingUp className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Advertise with Virginia Political News
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Reach thousands of politically engaged Virginia residents with targeted advertising opportunities.
            Connect with voters, decision-makers, and political influencers across the Commonwealth.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ad Packages */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Advertising Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adPackages.map((pkg, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    {pkg.icon}
                    <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                  </div>
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">
              Ready to Reach Virginia Voters?
            </CardTitle>
            <CardDescription className="text-lg">
              Contact our advertising team to discuss custom packages and political campaign opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <div className="flex items-center gap-2 text-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>ads@virginianews.com</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>(757) 555-0123</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8">
              Contact Advertising Team
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Ads;