import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const DashboardInsights = () => {
  const { data: insights, isLoading } = useQuery({
    queryKey: ['insights'],
    queryFn: async () => {
      // Fetch insights data
      return [];
    }
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-white">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <DashboardLayout>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold tracking-tight" id="page-title">Insights</h1>
                  <p className="text-muted-foreground">View detailed insights about your Amazon advertising performance.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {isLoading ? (
                    <>
                      <Card className="p-6">
                        <Skeleton className="h-4 w-[250px] mb-4" />
                        <Skeleton className="h-8 w-[200px]" />
                      </Card>
                      <Card className="p-6">
                        <Skeleton className="h-4 w-[250px] mb-4" />
                        <Skeleton className="h-8 w-[200px]" />
                      </Card>
                      <Card className="p-6">
                        <Skeleton className="h-4 w-[250px] mb-4" />
                        <Skeleton className="h-8 w-[200px]" />
                      </Card>
                    </>
                  ) : (
                    <Card className="p-6">
                      <p className="text-sm text-muted-foreground mb-4">No insights available yet.</p>
                    </Card>
                  )}
                </div>
              </div>
            </DashboardLayout>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardInsights;