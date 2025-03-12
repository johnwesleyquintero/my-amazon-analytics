
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { SettingsFormValues, settingsFormSchema, defaultValues } from './schema';

export function useSettings() {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const loadSettings = async () => {
      // First try to load settings from localStorage for non-authenticated users
      const themeFromLocalStorage = localStorage.getItem('theme');
      if (themeFromLocalStorage) {
        form.setValue('theme', themeFromLocalStorage as 'light' | 'dark' | 'system');
      }
      
      // If authenticated, load settings from database
      if (!user) return;
      
      const { data, error } = await supabase
        .from('dashboard_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading settings:', error);
        toast({
          title: "Error loading settings",
          description: "Please try again later.",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        const formattedData: SettingsFormValues = {
          default_date_range: data.default_date_range as '1d' | '7d' | '30d' | '90d',
          default_currency: data.default_currency as 'USD' | 'EUR' | 'GBP',
          notification_preferences: data.notification_preferences as {
            email: boolean;
            in_app: boolean;
          },
          theme: data.theme as 'light' | 'dark' | 'system',
        };
        form.reset(formattedData);
        
        // Save theme to localStorage for persistence across sessions
        localStorage.setItem('theme', formattedData.theme);
        
        // Apply theme
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        
        if (formattedData.theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
            ? 'dark' 
            : 'light';
          root.classList.add(systemTheme);
        } else {
          root.classList.add(formattedData.theme);
        }
      }
    };

    loadSettings();
  }, [user, form, toast]);

  const onSubmit = async (data: SettingsFormValues) => {
    // Save theme to localStorage for persistence across sessions
    localStorage.setItem('theme', data.theme);
    
    if (!user) {
      toast({
        title: "Settings saved locally",
        description: "Your theme preference has been saved.",
        className: "bg-shakespeare border-shakespeare text-white",
      });
      return;
    }

    const { error } = await supabase
      .from('dashboard_settings')
      .upsert({
        user_id: user.id,
        default_date_range: data.default_date_range,
        default_currency: data.default_currency,
        notification_preferences: data.notification_preferences,
        theme: data.theme
      });

    if (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error saving settings",
        description: "Please try again later.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Settings saved",
      description: "Your dashboard settings have been updated.",
      className: "bg-shakespeare border-shakespeare text-white",
    });
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  };
}
