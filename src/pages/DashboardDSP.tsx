import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const DashboardDSP = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-white">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">DSP</h1>
            <p className="text-gray-500">Manage your Demand-Side Platform settings and campaigns.</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardDSP;