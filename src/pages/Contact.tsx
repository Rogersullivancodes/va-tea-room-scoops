
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-1 py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-red-700 dark:text-red-400 mb-4">
                Contact CrabsFriedPolitically
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Have a tip? Question? Complaint? We want to hear from you!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-red-700 dark:text-red-400">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
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
                        type="text"
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
                        placeholder="Tell us what's on your mind..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-red-700 dark:text-red-400">
                      Get In Touch
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center">
                      <Mail className="h-6 w-6 text-red-600 mr-4" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-gray-600 dark:text-gray-300">cfp@crabsfriedpolitically.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-6 w-6 text-red-600 mr-4" />
                      <div>
                        <h3 className="font-semibold">News Tip Hotline</h3>
                        <p className="text-gray-600 dark:text-gray-300">(804) 555-CRAB</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 text-red-600 mr-4" />
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-gray-600 dark:text-gray-300">Richmond, Virginia</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">
                      Submit Anonymous Tips
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Got political tea to spill? Use our secure anonymous tip line to share information safely.
                    </p>
                    <Button className="w-full bg-gray-800 hover:bg-gray-700">
                      Anonymous Tip Form
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">
                      Media Inquiries
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Press and media representatives can reach our editorial team directly.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      cfp@crabsfriedpolitically.com
                    </p>
                  </CardContent>
                </Card>
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
