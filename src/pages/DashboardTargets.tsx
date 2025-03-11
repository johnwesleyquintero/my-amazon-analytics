import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const DashboardTargets = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-white">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Targets & Search Terms</h1>
            <p className="text-gray-500">Manage your advertising targets and analyze search term performance.</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardTargets;