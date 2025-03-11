import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DataImport } from "@/components/DataImport";

const DashboardImport = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-white">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Import Amazon Ads</h1>
            <p className="text-gray-500 mb-6">Import your advertising data from various sources.</p>
            <DataImport />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardImport;