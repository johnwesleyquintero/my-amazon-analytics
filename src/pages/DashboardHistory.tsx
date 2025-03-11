import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const DashboardHistory = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-white">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">History</h1>
            <p className="text-gray-500">View your historical advertising performance data.</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardHistory;