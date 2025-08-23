import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, FileText, Image, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface AdFormData {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  packageType: string;
  duration: string;
  adTitle: string;
  adDescription: string;
  targetAudience: string;
  callToAction: string;
  files: File[];
}

const AdSubmission: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedPackage = location.state?.selectedPackage;

  const [formData, setFormData] = useState<AdFormData>({
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    packageType: selectedPackage?.title || '',
    duration: selectedPackage?.price || '',
    adTitle: '',
    adDescription: '',
    targetAudience: '',
    callToAction: '',
    files: []
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof AdFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      const validFiles = newFiles.filter(file => {
        const isValid = file.size <= 50 * 1024 * 1024; // 50MB limit
        if (!isValid) {
          toast({
            title: "File too large",
            description: `${file.name} exceeds 50MB limit`,
            variant: "destructive"
          });
        }
        return isValid;
      });
      
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...validFiles].slice(0, 5) // Max 5 files
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (file.type.startsWith('video/')) return <Video className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Submission Successful!",
        description: "Your ad creative has been submitted for review.",
      });

      navigate('/ad-confirmation', { 
        state: { 
          formData: {
            ...formData,
            files: [] // Don't pass files in navigation state
          },
          submissionId: `AD-${Date.now()}`
        }
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your ad. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Submit Your Ad Creative
              </CardTitle>
              <p className="text-muted-foreground text-center">
                Upload your advertising materials and provide campaign details
              </p>
              {selectedPackage && (
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <p className="font-semibold">Selected Package: {selectedPackage.title}</p>
                  <p className="text-sm text-muted-foreground">{selectedPackage.price}</p>
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company/Organization Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Select onValueChange={(value) => handleInputChange('targetAudience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="virginia-voters">Virginia Voters</SelectItem>
                        <SelectItem value="political-enthusiasts">Political Enthusiasts</SelectItem>
                        <SelectItem value="local-residents">Local Residents</SelectItem>
                        <SelectItem value="business-professionals">Business Professionals</SelectItem>
                        <SelectItem value="all-demographics">All Demographics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Ad Content */}
                <div>
                  <Label htmlFor="adTitle">Ad Title/Headline *</Label>
                  <Input
                    id="adTitle"
                    value={formData.adTitle}
                    onChange={(e) => handleInputChange('adTitle', e.target.value)}
                    placeholder="Enter compelling ad headline"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="adDescription">Ad Description/Copy *</Label>
                  <Textarea
                    id="adDescription"
                    value={formData.adDescription}
                    onChange={(e) => handleInputChange('adDescription', e.target.value)}
                    placeholder="Describe your ad content and message"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="callToAction">Call to Action</Label>
                  <Input
                    id="callToAction"
                    value={formData.callToAction}
                    onChange={(e) => handleInputChange('callToAction', e.target.value)}
                    placeholder="e.g., 'Visit our website', 'Call now', 'Learn more'"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <Label>Upload Creative Files (Images, Videos, Documents)</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">
                      Drag & drop files here, or click to select
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Support for images, videos, and documents (Max 50MB each, up to 5 files)
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*,video/*,.pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="fileUpload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('fileUpload')?.click()}
                    >
                      Select Files
                    </Button>
                  </div>

                  {/* File List */}
                  {formData.files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <Label>Uploaded Files:</Label>
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(file)}
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.companyName || !formData.contactEmail || !formData.adTitle || !formData.adDescription}
                    className="w-full md:w-auto px-8 py-3"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Ad for Review'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdSubmission;