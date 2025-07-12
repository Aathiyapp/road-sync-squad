-- Drop existing tables
DROP TABLE IF EXISTS admin_settings CASCADE;
DROP TABLE IF EXISTS bets CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS referrals CASCADE;
DROP TABLE IF EXISTS rounds CASCADE;
DROP TABLE IF EXISTS tournaments CASCADE;

-- USERS (replaces profiles)
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  avatar_url TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RIDE GROUPS
CREATE TABLE public.ride_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
  is_live BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- GROUP MEMBERSHIP
CREATE TABLE public.group_members (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.ride_groups(id) ON DELETE CASCADE,
  is_admin BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (user_id, group_id)
);

-- LOCATIONS
CREATE TABLE public.live_locations (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.ride_groups(id) ON DELETE CASCADE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  speed_kmph DOUBLE PRECISION DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (user_id, group_id)
);

-- ROUTE WAYPOINTS
CREATE TABLE public.route_waypoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.ride_groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  added_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
  stop_type TEXT CHECK (stop_type IN ('fuel', 'food', 'photo', 'rest', 'destination')),
  added_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RIDE LOGS
CREATE TABLE public.ride_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.ride_groups(id) ON DELETE CASCADE,
  distance_km DOUBLE PRECISION DEFAULT 0,
  top_speed DOUBLE PRECISION DEFAULT 0,
  avg_speed DOUBLE PRECISION DEFAULT 0,
  total_time INTERVAL,
  log_date TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- SOS SIGNALS
CREATE TABLE public.sos_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.ride_groups(id) ON DELETE CASCADE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  message TEXT,
  is_resolved BOOLEAN DEFAULT FALSE
);

-- CHAT / MESSAGES
CREATE TABLE public.group_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.ride_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  message TEXT,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'voice', 'ping', 'sos')),
  media_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ride_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_waypoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ride_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view all ride groups" ON public.ride_groups FOR SELECT USING (true);
CREATE POLICY "Users can create ride groups" ON public.ride_groups FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Group creators can update groups" ON public.ride_groups FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can view group members" ON public.group_members FOR SELECT USING (true);
CREATE POLICY "Users can join groups" ON public.group_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave groups" ON public.group_members FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Group members can view locations" ON public.live_locations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.group_members WHERE group_id = live_locations.group_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own location" ON public.live_locations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own location" ON public.live_locations FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Group members can view waypoints" ON public.route_waypoints FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.group_members WHERE group_id = route_waypoints.group_id AND user_id = auth.uid())
);
CREATE POLICY "Group members can add waypoints" ON public.route_waypoints FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.group_members WHERE group_id = route_waypoints.group_id AND user_id = auth.uid())
);

CREATE POLICY "Users can view own ride logs" ON public.ride_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own ride logs" ON public.ride_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Group members can view SOS alerts" ON public.sos_alerts FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.group_members WHERE group_id = sos_alerts.group_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create SOS alerts" ON public.sos_alerts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Group members can view messages" ON public.group_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.group_members WHERE group_id = group_messages.group_id AND user_id = auth.uid())
);
CREATE POLICY "Group members can send messages" ON public.group_messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.group_members WHERE group_id = group_messages.group_id AND user_id = auth.uid()) AND auth.uid() = user_id
);

-- Enable realtime for live features
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_locations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.group_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sos_alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.route_waypoints;

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Rider'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();