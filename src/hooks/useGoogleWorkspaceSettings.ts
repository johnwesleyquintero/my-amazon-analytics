
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface GoogleWorkspaceSettings {
  user_id: string;
  spreadsheet_id: string;
  sheet_name: string;
  auto_sync: boolean;
}

export function useGoogleWorkspaceSettings() {
  const { toast } = useToast();

  const { data: settings } = useQuery({
    queryKey: ['googleWorkspaceSettings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('google_workspace_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (newSettings: Partial<GoogleWorkspaceSettings>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('google_workspace_settings')
        .upsert(
          {
            user_id: user.id,
            ...newSettings
          },
          {
            onConflict: 'user_id',
            ignoreDuplicates: false
          }
        );

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Settings saved",
        description: "Your Google Workspace integration settings have been updated."
      });
    },
    onError: (error) => {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return {
    settings,
    saveMutation
  };
}
