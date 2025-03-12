
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { APIKeyManagement } from "@/components/admin/APIKeyManagement";

const APIKeysPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">API Keys Management</h1>
        <p className="text-gray-500">
          Manage your API keys for various integrations. Keep your keys secure and never share them with unauthorized users.
        </p>
        
        <APIKeyManagement />
      </div>
    </DashboardLayout>
  );
};

export default APIKeysPage;
