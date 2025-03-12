import React from 'react';
import { UserProfile } from '@/components/settings/UserProfile';
import { GoogleIntegrationSettings } from '@/components/settings/GoogleIntegrationSettings';

const DashboardSettings = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="grid gap-6">
        <UserProfile />
        <GoogleIntegrationSettings />
      </div>
    </div>
  );
};

export default DashboardSettings;