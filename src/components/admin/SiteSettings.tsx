
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SiteSettings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    site_title: 'CrabsFriedPolitically',
    site_description: 'Your source for political news and commentary',
    featured_articles_count: 6,
    news_refresh_interval: 300000,
    enable_comments: true,
    maintenance_mode: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('*');

      if (data) {
        const settingsObj = {};
        data.forEach(setting => {
          settingsObj[setting.key] = typeof setting.value === 'string' 
            ? JSON.parse(setting.value) 
            : setting.value;
        });
        setSettings(prev => ({ ...prev, ...settingsObj }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Update each setting
      for (const [key, value] of Object.entries(settings)) {
        await supabase
          .from('site_settings')
          .upsert({
            key,
            value: JSON.stringify(value),
            updated_at: new Date().toISOString()
          });
      }

      toast({
        title: "Settings Saved",
        description: "Site settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Site Settings</h2>
        <div className="flex space-x-2">
          <Button 
            onClick={loadSettings}
            variant="outline"
            className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload
          </Button>
          <Button 
            onClick={handleSaveSettings}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site_title" className="text-gray-300">Site Title</Label>
              <Input
                id="site_title"
                value={settings.site_title}
                onChange={(e) => setSettings({...settings, site_title: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="site_description" className="text-gray-300">Site Description</Label>
              <Textarea
                id="site_description"
                value={settings.site_description}
                onChange={(e) => setSettings({...settings, site_description: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="featured_articles_count" className="text-gray-300">Featured Articles Count</Label>
              <Input
                id="featured_articles_count"
                type="number"
                value={settings.featured_articles_count}
                onChange={(e) => setSettings({...settings, featured_articles_count: parseInt(e.target.value)})}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Feature Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="news_refresh_interval" className="text-gray-300">News Refresh Interval (ms)</Label>
              <Input
                id="news_refresh_interval"
                type="number"
                value={settings.news_refresh_interval}
                onChange={(e) => setSettings({...settings, news_refresh_interval: parseInt(e.target.value)})}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable_comments" className="text-gray-300">Enable Comments</Label>
              <Switch
                id="enable_comments"
                checked={settings.enable_comments}
                onCheckedChange={(checked) => setSettings({...settings, enable_comments: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance_mode" className="text-gray-300">Maintenance Mode</Label>
              <Switch
                id="maintenance_mode"
                checked={settings.maintenance_mode}
                onCheckedChange={(checked) => setSettings({...settings, maintenance_mode: checked})}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteSettings;
