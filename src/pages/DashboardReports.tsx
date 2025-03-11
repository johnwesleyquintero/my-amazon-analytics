import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const DashboardReports = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-white">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Download Reports</h1>
            <p className="text-gray-500">Generate and download custom reports for your advertising campaigns.</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardReports;