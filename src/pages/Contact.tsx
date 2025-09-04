import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    console.log('Contact form submitted:', data);
    toast({
      title: "Message sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    reset();
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-muted-foreground">
                Get in touch with our team for questions, tips, or feedback
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        {...register('name', {
                          required: 'Name is required',
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                          }
                        })}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Please enter a valid email'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="What's this about?"
                        {...register('subject', {
                          required: 'Subject is required'
                        })}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more..."
                        className="min-h-[120px]"
                        {...register('message', {
                          required: 'Message is required',
                          minLength: {
                            value: 10,
                            message: 'Message must be at least 10 characters'
                          }
                        })}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">contact@crabsfriedpolitically.com</p>
                        <p className="text-sm text-muted-foreground">For general inquiries</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">News Tips</h3>
                        <p className="text-muted-foreground">tips@crabsfriedpolitically.com</p>
                        <p className="text-sm text-muted-foreground">Send us your story tips</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Phone className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-muted-foreground">(555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Monday - Friday, 9AM - 5PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-muted-foreground">
                          123 Political Plaza<br />
                          Richmond, VA 23219
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Editorial Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      We welcome feedback and story suggestions. All tips are treated confidentially. 
                      For advertising inquiries, please use our dedicated advertising contact form.
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