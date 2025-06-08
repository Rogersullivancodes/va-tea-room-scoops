import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-red-700 dark:text-red-400 mb-4">
                  Contact CrabsFriedPolitically
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Have a story tip, feedback, or need help? We'd love to hear from you.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2 text-red-600" />
                      Send us a message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us more..."
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Mail className="h-5 w-5 text-red-600 mr-3" />
                        <div>
                          <h3 className="font-semibold">Email Us</h3>
                          <p className="text-gray-600 dark:text-gray-300">tips@crabsfriedpolitically.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <Phone className="h-5 w-5 text-red-600 mr-3" />
                        <div>
                          <h3 className="font-semibold">Call Us</h3>
                          <p className="text-gray-600 dark:text-gray-300">(555) 123-CRAB</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-red-600 mr-3" />
                        <div>
                          <h3 className="font-semibold">Visit Us</h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            123 Capitol Street<br />
                            Richmond, VA 23219
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">Quick Tips</h3>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Story tips: Use our secure tip line</li>
                        <li>• Technical issues: Include screenshots</li>
                        <li>• Account help: Mention your username</li>
                        <li>• Press inquiries: Mark as urgent</li>
                      </ul>
                    </CardContent>
                  </Card>
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

export default Contact;
