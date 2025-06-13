
-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for admin users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Admins can manage admin users" 
  ON public.admin_users 
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Create admin sessions table
CREATE TABLE public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public.admin_users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for admin sessions
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for admin sessions
CREATE POLICY "Service role can manage admin sessions" 
  ON public.admin_sessions 
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Insert default admin user (password: 'admin')
-- Using bcrypt hash for password 'admin': $2b$10$rQ8QqQqQqQqQqQqQqQqQqO
INSERT INTO public.admin_users (email, password_hash, name, role)
VALUES ('cfp@crabsfriedpolitically.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin');

-- Update news_articles table to allow admin management
CREATE POLICY "Admins can manage all news articles" 
  ON public.news_articles 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_sessions 
      WHERE session_token = current_setting('request.jwt.claims', true)::json->>'session_token'
      AND expires_at > NOW()
    )
  );

-- Create settings table for site configuration
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for site settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for site settings (public read, admin write)
CREATE POLICY "Site settings are publicly readable" 
  ON public.site_settings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage site settings" 
  ON public.site_settings 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_sessions 
      WHERE session_token = current_setting('request.jwt.claims', true)::json->>'session_token'
      AND expires_at > NOW()
    )
  );

-- Insert default site settings
INSERT INTO public.site_settings (key, value, description) VALUES
('site_title', '"CrabsFriedPolitically"', 'Main site title'),
('site_description', '"Your source for political news and commentary"', 'Site description'),
('featured_articles_count', '6', 'Number of featured articles to display'),
('news_refresh_interval', '300000', 'News refresh interval in milliseconds'),
('enable_comments', 'true', 'Enable article comments'),
('maintenance_mode', 'false', 'Enable maintenance mode');
