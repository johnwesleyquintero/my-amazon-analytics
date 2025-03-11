import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardTabs() {
  return (
    <Tabs defaultValue="insights" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="insights">Insights</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="keywords">Keywords</TabsTrigger>
        <TabsTrigger value="competitors">Competitors</TabsTrigger>
      </TabsList>

      <TabsContent value="insights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {/* Revenue chart will go here */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Top products list will go here */}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="products">
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Product performance table will go here */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="keywords">
        <Card>
          <CardHeader>
            <CardTitle>Keyword Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Keyword analysis table will go here */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="competitors">
        <Card>
          <CardHeader>
            <CardTitle>Competitor Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Competitor analysis content will go here */}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}