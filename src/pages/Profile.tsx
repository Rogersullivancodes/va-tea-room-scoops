
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Mail, 
  Calendar, 
  Bookmark, 
  History, 
  Bell, 
  Settings,
  CreditCard,
  Trophy
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import ArticleCard from '@/components/ArticleCard';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { bookmarks } = useBookmarks();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [readingHistory, setReadingHistory] = useState([]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchReadingHistory();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReadingHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('reading_history')
        .select(`
          *,
          articles:article_id (
            id,
            title,
            excerpt,
            category,
            published_at
          )
        `)
        .eq('user_id', user.id)
        .order('read_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setReadingHistory(data || []);
    } catch (err) {
      console.error('Error fetching reading history:', err);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardContent className="p-6 text-center">
                <h2 className="text-xl font-bold mb-2">Access Required</h2>
                <p className="text-gray-600 mb-4">Please sign in to view your profile.</p>
                <Button asChild>
                  <a href="/login">Sign In</a>
                </Button>
              </CardContent>
            </Card>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">
                  {profile?.first_name || profile?.last_name 
                    ? `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim()
                    : 'User Profile'
                  }
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <CreditCard className="h-3 w-3" />
                    <span>{profile?.credits || 0} Credits</span>
                  </Badge>
                  <Badge className="flex items-center space-x-1">
                    <Trophy className="h-3 w-3" />
                    <span className="capitalize">{profile?.subscription_tier || 'free'}</span>
                  </Badge>
                </div>
              </div>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                <TabsTrigger value="history">Reading History</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile?.first_name || ''}
                          onChange={(e) => setProfile(prev => prev ? {...prev, first_name: e.target.value} : null)}
                          onBlur={(e) => updateProfile({ first_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile?.last_name || ''}
                          onChange={(e) => setProfile(prev => prev ? {...prev, last_name: e.target.value} : null)}
                          onBlur={(e) => updateProfile({ last_name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profile?.email || user.email || ''}
                        disabled
                        className="bg-gray-100 dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile?.bio || ''}
                        onChange={(e) => setProfile(prev => prev ? {...prev, bio: e.target.value} : null)}
                        onBlur={(e) => updateProfile({ bio: e.target.value })}
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookmarks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bookmark className="h-5 w-5" />
                      <span>Bookmarked Articles</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bookmarks.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">
                        No bookmarked articles yet. Start bookmarking articles you want to read later!
                      </p>
                    ) : (
                      <div className="grid gap-4">
                        {bookmarks.map((bookmark) => (
                          <div key={bookmark.id} className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-2">{bookmark.articles?.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{bookmark.articles?.excerpt}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Category: {bookmark.articles?.category}</span>
                              <span>Bookmarked: {new Date(bookmark.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <History className="h-5 w-5" />
                      <span>Reading History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {readingHistory.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">
                        No reading history yet. Start reading articles to build your history!
                      </p>
                    ) : (
                      <div className="grid gap-4">
                        {readingHistory.map((history: any) => (
                          <div key={history.id} className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-2">{history.articles?.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{history.articles?.excerpt}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Category: {history.articles?.category}</span>
                              <span>Read: {new Date(history.read_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Notification Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                      <Switch
                        checked={profile?.notification_preferences?.email || false}
                        onCheckedChange={(checked) => 
                          updateProfile({ 
                            notification_preferences: { 
                              ...profile?.notification_preferences, 
                              email: checked 
                            } 
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Breaking News Alerts</Label>
                        <p className="text-sm text-gray-500">Get notified of breaking political news</p>
                      </div>
                      <Switch
                        checked={profile?.notification_preferences?.breaking || false}
                        onCheckedChange={(checked) => 
                          updateProfile({ 
                            notification_preferences: { 
                              ...profile?.notification_preferences, 
                              breaking: checked 
                            } 
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Profile;
