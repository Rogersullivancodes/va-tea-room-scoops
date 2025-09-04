import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Eye, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Ads: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Advertise with CrabsFriedPolitically</h1>
              <p className="text-xl text-muted-foreground">
                Reach engaged political readers across Virginia and beyond
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardHeader className="text-center">
                  <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                  <CardTitle className="text-3xl font-bold">50K+</CardTitle>
                  <p className="text-muted-foreground">Monthly Readers</p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Eye className="h-8 w-8 mx-auto text-primary mb-2" />
                  <CardTitle className="text-3xl font-bold">200K+</CardTitle>
                  <p className="text-muted-foreground">Page Views</p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Target className="h-8 w-8 mx-auto text-primary mb-2" />
                  <CardTitle className="text-3xl font-bold">85%</CardTitle>
                  <p className="text-muted-foreground">Engagement Rate</p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
                  <CardTitle className="text-3xl font-bold">25%</CardTitle>
                  <p className="text-muted-foreground">Growth Rate</p>
                </CardHeader>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Why Advertise With Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Targeted Political Audience</h3>
                    <p className="text-muted-foreground text-sm">
                      Reach politically engaged readers who are actively interested in Virginia politics and current events.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Premium Placement</h3>
                    <p className="text-muted-foreground text-sm">
                      Your ads will be strategically placed alongside high-quality political content for maximum visibility.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Flexible Options</h3>
                    <p className="text-muted-foreground text-sm">
                      Choose from banner ads, sponsored content, newsletter placements, or custom advertising solutions.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Our Audience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Age 25-44:</span>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age 45-64:</span>
                    <span>35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>College Educated:</span>
                    <span>78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Virginia Residents:</span>
                    <span>62%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Political Engagement:</span>
                    <span>High</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Banner Ads</CardTitle>
                  <Badge>Popular</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">$250</div>
                  <div className="text-muted-foreground mb-4">per week</div>
                  <ul className="space-y-2 text-sm">
                    <li>• Prime homepage placement</li>
                    <li>• 728x90 leaderboard format</li>
                    <li>• 50,000+ weekly impressions</li>
                    <li>• Performance analytics</li>
                  </ul>
                  <Button className="w-full mt-4" asChild>
                    <Link to="/ad-submission">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sponsored Content</CardTitle>
                  <Badge className="bg-yellow-600">Premium</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">$500</div>
                  <div className="text-muted-foreground mb-4">per article</div>
                  <ul className="space-y-2 text-sm">
                    <li>• Native content format</li>
                    <li>• Editorial team collaboration</li>
                    <li>• Social media promotion</li>
                    <li>• Newsletter inclusion</li>
                  </ul>
                  <Button className="w-full mt-4" asChild>
                    <Link to="/ad-submission">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Newsletter Ads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">$150</div>
                  <div className="text-muted-foreground mb-4">per edition</div>
                  <ul className="space-y-2 text-sm">
                    <li>• Weekly newsletter placement</li>
                    <li>• 5,000+ subscribers</li>
                    <li>• High open rates (45%+)</li>
                    <li>• Click tracking included</li>
                  </ul>
                  <Button className="w-full mt-4" asChild>
                    <Link to="/ad-submission">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Ready to Get Started?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Contact our advertising team to discuss custom packages and bulk discounts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/ad-submission">Submit Your Ad</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">Contact Sales Team</Link>
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

export default Ads;