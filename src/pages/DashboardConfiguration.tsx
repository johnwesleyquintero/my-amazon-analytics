import { DataImport } from "@/components/DataImport";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { WorkspaceIntegration } from "@/components/google/WorkspaceIntegration";

const DashboardConfiguration = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Data Configuration</h1>
        
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Data Import</h2>
            <DataImport />
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Integrations</h2>
            <WorkspaceIntegration />
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardConfiguration;