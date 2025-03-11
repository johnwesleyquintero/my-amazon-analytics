
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
      }
    };

    loadSettings();
  }, [user, form, toast]);

  const onSubmit = async (data: SettingsFormValues) => {
    if (!user) return;

    const { error } = await supabase
      .from('dashboard_settings')
      .upsert({
        user_id: user.id,
        ...data,
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
    });
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  };
}
