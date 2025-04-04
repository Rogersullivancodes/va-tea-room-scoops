
import React from 'react';
import { Eye, EyeOff, FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const SubmitTeaForm: React.FC = () => {
  return (
    <section id="submit-tea" className="py-12 bg-gradient-to-r from-maroon to-navy text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Submit Your Tea</h2>
            <p className="text-white/80">
              Got screenshots, videos, or receipts? Drop them here anonymously and help us 
              keep Virginia politics transparent.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <form className="space-y-6">
              <div>
                <Label htmlFor="tip-title" className="text-white">Tip Headline</Label>
                <Input 
                  id="tip-title" 
                  placeholder="Give your tip a catchy headline" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              
              <div>
                <Label htmlFor="tip-details" className="text-white">Details</Label>
                <Textarea 
                  id="tip-details" 
                  placeholder="Describe what you know, when it happened, and who was involved..." 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-32"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="politician" className="text-white">Politician/Office Involved</Label>
                  <Input 
                    id="politician" 
                    placeholder="Name or position" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-white">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="City, district, or venue" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
              
              <div className="border border-dashed border-white/30 rounded-lg p-8 text-center">
                <Upload className="h-10 w-10 mx-auto mb-2 text-white/70" />
                <p className="text-white mb-2">Drop files here or click to upload</p>
                <p className="text-white/70 text-sm mb-4">
                  Support for images, videos, documents, and screenshots
                </p>
                <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  <FileText className="mr-2 h-4 w-4" />
                  Select Files
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remain-anonymous" defaultChecked />
                  <Label htmlFor="remain-anonymous" className="text-white cursor-pointer">
                    I want to remain anonymous
                  </Label>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-shrink-0 mt-1">
                    {true ? <EyeOff className="h-4 w-4 text-gold" /> : <Eye className="h-4 w-4 text-gold" />}
                  </div>
                  <p className="text-white/80 text-sm">
                    We take your privacy seriously. We never store IP addresses or identifying 
                    information for anonymous submissions. All metadata is stripped from uploaded files.
                  </p>
                </div>
              </div>
              
              <div className="pt-2">
                <Button className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-3">
                  Submit Your Tea Securely
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmitTeaForm;
