import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { APIKeyManagement } from "@/components/admin/APIKeyManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Users } from "lucide-react";

const Admin = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-white">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2 font-spotify">Admin Dashboard</h1>
            <p className="text-gray-600">Manage API keys and users</p>
          </div>

          <Tabs defaultValue="api-keys" className="space-y-6">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="api-keys" className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                API Keys
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api-keys">
              <APIKeyManagement />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;