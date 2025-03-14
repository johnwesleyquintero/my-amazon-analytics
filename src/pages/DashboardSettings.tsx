
import React from 'react';
import { UserProfile } from '@/components/settings/UserProfile';
import { GoogleIntegrationSettings } from '@/components/settings/GoogleIntegrationSettings';
import { toast } from '@/components/ui/use-toast';

const DashboardSettings = () => {
  const handleGoogleIntegrationSave = (data: any) => {
    // Handle save logic here
    toast({
      title: "Settings saved",
      description: "Your Google integration settings have been updated successfully."
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="grid gap-6">
        <UserProfile />
        <GoogleIntegrationSettings onSave={handleGoogleIntegrationSave} />
      </div>
    </div>
  );
};

export default DashboardSettings;
