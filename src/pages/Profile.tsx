import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bookmark, 
  History, 
  Settings, 
  CreditCard,
  Bell,
  Eye,
  Calendar,
  Mail
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Bookmark {
  id: string;
  user_id: string;
  article_id: string;
  created_at: string;
  article?: {
    id: string;
    title: string;
    excerpt: string;
    published_at: string;
    category: string;
  };
}

interface ReadingHistoryItem {
  id: string;
  user_id: string;
  article_id: string;
  read_at: string;
  read_duration: number;
  article?: {
    id: string;
    title: string;
    excerpt: string;
    published_at: string;
    category: string;
  };
}

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  credits: number;
  bio?: string;
  avatar_url?: string;
  theme_preference: 'light' | 'dark' | 'system';
  subscription_tier: 'free' | 'premium' | 'vip';
  notification_preferences: {
    email?: boolean;
    push?: boolean;
    breaking?: boolean;
  };
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchBookmarks();
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
      
      // Type conversion to ensure proper typing
      const typedProfile: UserProfile = {
        id: data.id,
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || '',
        credits: data.credits || 0,
        bio: data.bio,
        avatar_url: data.avatar_url,
        theme_preference: (data.theme_preference as 'light' | 'dark' | 'system') || 'system',
        subscription_tier: (data.subscription_tier as 'free' | 'premium' | 'vip') || 'free',
        notification_preferences: typeof data.notification_preferences === 'object' && data.notification_preferences !== null 
          ? data.notification_preferences as { email?: boolean; push?: boolean; breaking?: boolean; }
          : {}
      };
      
      setProfile(typedProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile information.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          *,
          article:articles(
            id,
            title,
            excerpt,
            published_at,
            category
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const fetchReadingHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('reading_history')
        .select(`
          *,
          article:articles(
            id,
            title,
            excerpt,
            published_at,
            category
          )
        `)
        .eq('user_id', user.id)
        .order('read_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setReadingHistory(data || []);
    } catch (error) {
      console.error('Error fetching reading history:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
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
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const removeBookmark = async (bookmarkId: string) => {
    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmarkId);

      if (error) throw error;

      setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
      toast({
        title: "Bookmark Removed",
        description: "Article has been removed from your bookmarks.",
      });
    } catch (error) {
      console.error('Error removing bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to remove bookmark.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading profile...</p>
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  if (!profile) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
              <p className="text-muted-foreground">Unable to load your profile information.</p>
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback>
                  {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">
                  {profile?.first_name} {profile?.last_name}
                </h1>
                <p className="text-muted-foreground">{profile?.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant={profile?.subscription_tier === 'free' ? 'secondary' : 'default'}>
                    {profile?.subscription_tier?.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {profile?.credits} credits
                  </span>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="bookmarks">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmarks ({bookmarks.length})
                </TabsTrigger>
                <TabsTrigger value="history">
                  <History className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile.first_name || ''}
                          onChange={(e) => setProfile(prev => prev ? {...prev, first_name: e.target.value} : null)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile.last_name || ''}
                          onChange={(e) => setProfile(prev => prev ? {...prev, last_name: e.target.value} : null)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email || ''}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        value={profile.bio || ''}
                        onChange={(e) => setProfile(prev => prev ? {...prev, bio: e.target.value} : null)}
                        rows={4}
                      />
                    </div>
                    <Button 
                      onClick={() => updateProfile({
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                        bio: profile.bio
                      })}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookmarks" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Bookmarks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bookmarks.length === 0 ? (
                      <div className="text-center py-8">
                        <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No bookmarks yet</p>
                        <p className="text-sm text-muted-foreground">
                          Bookmark articles to save them for later reading
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {bookmarks.map((bookmark) => (
                          <div key={bookmark.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-semibold mb-2">
                                  {bookmark.article?.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {bookmark.article?.excerpt}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                  <span>{bookmark.article?.category}</span>
                                  <span>
                                    {bookmark.article?.published_at && 
                                      format(new Date(bookmark.article.published_at), 'MMM dd, yyyy')
                                    }
                                  </span>
                                  <span>
                                    Bookmarked {format(new Date(bookmark.created_at), 'MMM dd, yyyy')}
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => removeBookmark(bookmark.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reading History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {readingHistory.length === 0 ? (
                      <div className="text-center py-8">
                        <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No reading history yet</p>
                        <p className="text-sm text-muted-foreground">
                          Your reading history will appear here as you read articles
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {readingHistory.map((item) => (
                          <div key={item.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-semibold mb-2">
                                  {item.article?.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {item.article?.excerpt}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                  <span>{item.article?.category}</span>
                                  <span>
                                    Read {format(new Date(item.read_at), 'MMM dd, yyyy')}
                                  </span>
                                  <span>
                                    {Math.round(item.read_duration / 60)} min read
                                  </span>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email updates about new articles and breaking news
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={profile.notification_preferences?.email || false}
                          onCheckedChange={(checked) => {
                            const newPrefs = { 
                              ...profile.notification_preferences, 
                              email: checked 
                            };
                            updateProfile({ notification_preferences: newPrefs });
                          }}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="breaking-notifications">Breaking News Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified immediately about breaking political news
                          </p>
                        </div>
                        <Switch
                          id="breaking-notifications"
                          checked={profile.notification_preferences?.breaking || false}
                          onCheckedChange={(checked) => {
                            const newPrefs = { 
                              ...profile.notification_preferences, 
                              breaking: checked 
                            };
                            updateProfile({ notification_preferences: newPrefs });
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Subscription Tier</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={profile.subscription_tier === 'free' ? 'secondary' : 'default'}>
                            {profile.subscription_tier.toUpperCase()}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <CreditCard className="h-3 w-3 mr-1" />
                            Upgrade
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Credits Balance</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-semibold">{profile.credits}</span>
                          <Button size="sm" variant="outline">
                            Buy Credits
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Profile;
