
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Send, Edit, Trash2, Users, BarChart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { sanitizeInput } from '@/utils/security';

const NewsletterManagement: React.FC = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    subject: '',
    content: ''
  });

  useEffect(() => {
    fetchCampaigns();
    fetchSubscribers();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('is_active', true)
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (err) {
      console.error('Error fetching subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async () => {
    try {
      // Sanitize inputs
      const sanitizedCampaign = {
        title: sanitizeInput(newCampaign.title),
        subject: sanitizeInput(newCampaign.subject),
        content: sanitizeInput(newCampaign.content),
        recipients_count: subscribers.length,
        user_id: 'admin' // For now, using 'admin' as user_id since this is admin functionality
      };

      const { error } = await supabase
        .from('newsletter_campaigns')
        .insert([sanitizedCampaign]);

      if (error) throw error;

      toast({
        title: "Campaign Created",
        description: "Newsletter campaign has been created successfully.",
      });

      setIsCreateDialogOpen(false);
      setNewCampaign({ title: '', subject: '', content: '' });
      fetchCampaigns();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create campaign.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-600">Sent</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-600">Scheduled</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{subscribers.length}</div>
            <p className="text-xs text-green-400">Active subscribers</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Campaigns Sent</CardTitle>
            <Send className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {campaigns.filter(c => c.status === 'sent').length}
            </div>
            <p className="text-xs text-blue-400">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Open Rate</CardTitle>
            <BarChart className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {campaigns.length > 0 
                ? Math.round(campaigns.reduce((acc, c) => acc + (c.open_rate || 0), 0) / campaigns.length)
                : 0}%
            </div>
            <p className="text-xs text-green-400">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Newsletter Management</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Newsletter Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                  className="bg-gray-700 border-gray-600"
                  rows={8}
                  placeholder="Write your newsletter content here..."
                />
              </div>
              <div className="bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-300">
                  This campaign will be sent to {subscribers.length} active subscribers.
                </p>
              </div>
              <Button onClick={handleCreateCampaign} className="w-full bg-blue-600 hover:bg-blue-700">
                Create Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Newsletter Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Title</TableHead>
                <TableHead className="text-gray-300">Subject</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Recipients</TableHead>
                <TableHead className="text-gray-300">Open Rate</TableHead>
                <TableHead className="text-gray-300">Created</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">
                    {campaign.title}
                  </TableCell>
                  <TableCell className="text-gray-300">{campaign.subject}</TableCell>
                  <TableCell>
                    {getStatusBadge(campaign.status)}
                  </TableCell>
                  <TableCell className="text-gray-300">{campaign.recipients_count || 0}</TableCell>
                  <TableCell className="text-gray-300">
                    {campaign.open_rate ? `${Math.round(campaign.open_rate)}%` : '-'}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {format(new Date(campaign.created_at), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-400">
                        <Edit className="h-3 w-3" />
                      </Button>
                      {campaign.status === 'draft' && (
                        <Button size="sm" variant="outline" className="border-green-600 text-green-400">
                          <Send className="h-3 w-3" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Subscribed</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.slice(0, 10).map((subscriber) => (
                <TableRow key={subscriber.id} className="border-gray-700">
                  <TableCell className="text-white">{subscriber.email}</TableCell>
                  <TableCell className="text-gray-300">{subscriber.name || '-'}</TableCell>
                  <TableCell className="text-gray-300">
                    {format(new Date(subscriber.subscribed_at), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-600">Active</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterManagement;
