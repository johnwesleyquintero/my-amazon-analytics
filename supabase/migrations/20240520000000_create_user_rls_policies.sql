-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for user data access
CREATE POLICY user_access_policy ON users
FOR ALL
TO authenticated
USING (auth.uid() = id);

-- Create policy for admin access
CREATE POLICY admin_access_policy ON users
FOR ALL
TO service_role
USING (true);

-- Create timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_google_workspace_settings_updated_at
BEFORE UPDATE ON public.google_workspace_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_dashboard_settings_updated_at
BEFORE UPDATE ON public.dashboard_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- Policies for amazon_users table
CREATE POLICY "Users can view their own amazon account" 
  ON auth.amazon_users FOR SELECT 
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update their own amazon account" 
  ON auth.amazon_users FOR UPDATE 
  USING ((select auth.uid()) = id);

-- Policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING ((select auth.uid()) = id);

-- Add missing columns to amazon_ads_metrics
ALTER TABLE public.amazon_ads_metrics ADD COLUMN IF NOT EXISTS date DATE;
ALTER TABLE public.amazon_ads_metrics ADD COLUMN IF NOT EXISTS acos DOUBLE PRECISION;
ALTER TABLE public.amazon_ads_metrics ADD COLUMN IF NOT EXISTS amount_spent NUMERIC;
ALTER TABLE public.amazon_ads_metrics ADD COLUMN IF NOT EXISTS total_ad_sales NUMERIC;
ALTER TABLE public.amazon_ads_metrics ADD COLUMN IF NOT EXISTS keyword TEXT;

-- Add company_name and updated_at columns to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Row Level Security for new tables

CREATE POLICY "Users can insert their own google workspace settings"
  ON public.google_workspace_settings FOR INSERT
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own google workspace settings"
  ON public.google_workspace_settings FOR UPDATE
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can view their own google workspace settings"
  ON public.google_workspace_settings FOR SELECT
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert their own dashboard settings"
  ON public.dashboard_settings FOR INSERT
  WITH CHECK ((select auth.uid()) = user_id);