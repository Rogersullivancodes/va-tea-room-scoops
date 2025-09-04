import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Upload, Calendar, DollarSign, Target, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface AdSubmissionFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  adType: string;
  campaignName: string;
  targetAudience: string;
  budget: string;
  startDate: string;
  endDate: string;
  adContent: string;
  specialRequests: string;
  agreeToTerms: boolean;
}

const AdSubmission: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<AdSubmissionFormData>();

  const selectedAdType = watch('adType');
  const agreeToTerms = watch('agreeToTerms');

  const onSubmit = async (data: AdSubmissionFormData) => {
    if (!data.agreeToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Ad Submitted Successfully!",
        description: "Our team will review your submission and contact you within 24 hours.",
      });
      navigate('/ad-confirmation');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your ad. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const adTypes = [
    { value: 'banner', label: 'Banner Ad - $250/week', description: 'Homepage banner placement' },
    { value: 'sponsored', label: 'Sponsored Content - $500/article', description: 'Native content format' },
    { value: 'newsletter', label: 'Newsletter Ad - $150/edition', description: 'Weekly newsletter placement' },
    { value: 'custom', label: 'Custom Package', description: 'Tailored advertising solution' },
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Submit Your Advertisement</h1>
              <p className="text-xl text-muted-foreground">
                Join our growing network of advertisers and reach engaged political readers
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Your company name"
                        {...register('companyName', {
                          required: 'Company name is required'
                        })}
                      />
                      {errors.companyName && (
                        <p className="text-sm text-red-600">{errors.companyName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        placeholder="Your full name"
                        {...register('contactName', {
                          required: 'Contact name is required'
                        })}
                      />
                      {errors.contactName && (
                        <p className="text-sm text-red-600">{errors.contactName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@company.com"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Please enter a valid email'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        {...register('phone')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Campaign Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adType">Advertisement Type *</Label>
                    <Select onValueChange={(value) => setValue('adType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ad type" />
                      </SelectTrigger>
                      <SelectContent>
                        {adTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-muted-foreground">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.adType && (
                      <p className="text-sm text-red-600">Please select an ad type</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaignName">Campaign Name *</Label>
                    <Input
                      id="campaignName"
                      placeholder="Name for your advertising campaign"
                      {...register('campaignName', {
                        required: 'Campaign name is required'
                      })}
                    />
                    {errors.campaignName && (
                      <p className="text-sm text-red-600">{errors.campaignName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select onValueChange={(value) => setValue('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-500">Under $500</SelectItem>
                          <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                          <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                          <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                          <SelectItem value="over-5000">Over $5,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetAudience">Target Audience</Label>
                      <Select onValueChange={(value) => setValue('targetAudience', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Political Readers</SelectItem>
                          <SelectItem value="virginia">Virginia Residents</SelectItem>
                          <SelectItem value="democrats">Democratic Voters</SelectItem>
                          <SelectItem value="republicans">Republican Voters</SelectItem>
                          <SelectItem value="independents">Independent Voters</SelectItem>
                          <SelectItem value="young-adults">Young Adults (18-35)</SelectItem>
                          <SelectItem value="professionals">Working Professionals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Preferred Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        {...register('startDate')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">Preferred End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        {...register('endDate')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ad Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Advertisement Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adContent">Ad Content Description *</Label>
                    <Textarea
                      id="adContent"
                      placeholder="Describe your advertisement content, including key messages, call-to-action, and any specific requirements..."
                      className="min-h-[120px]"
                      {...register('adContent', {
                        required: 'Ad content description is required',
                        minLength: {
                          value: 50,
                          message: 'Please provide at least 50 characters'
                        }
                      })}
                    />
                    {errors.adContent && (
                      <p className="text-sm text-red-600">{errors.adContent.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Special Requests or Requirements</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requirements, design preferences, or additional information..."
                      {...register('specialRequests')}
                    />
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Next Steps:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Our team will review your submission within 24 hours</li>
                      <li>• We'll contact you to discuss creative assets and finalize details</li>
                      <li>• Once approved, your ad will go live on the scheduled date</li>
                      <li>• You'll receive performance reports throughout the campaign</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Submit */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Checkbox
                      id="agreeToTerms"
                      onCheckedChange={(checked) => setValue('agreeToTerms', !!checked)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm">
                      I agree to the{' '}
                      <a href="/terms-of-use" className="text-primary hover:underline">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={loading || !agreeToTerms}
                  >
                    {loading ? 'Submitting...' : 'Submit Advertisement'}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AdSubmission;