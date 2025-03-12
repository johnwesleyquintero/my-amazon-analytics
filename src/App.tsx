import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardInsights from "./pages/DashboardInsights";
import DashboardTargets from "./pages/DashboardTargets";
import DashboardHistory from "./pages/DashboardHistory";
import DashboardDSP from "./pages/DashboardDSP";
import DashboardImport from "./pages/DashboardImport";
import DashboardReports from "./pages/DashboardReports";
import DashboardSettings from "./pages/DashboardSettings";
import Admin from "./pages/Admin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected route with auth check
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Admin route protection
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user || !isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/insights"
                  element={
                    <ProtectedRoute>
                      <DashboardInsights />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/targets"
                  element={
                    <ProtectedRoute>
                      <DashboardTargets />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/history"
                  element={
                    <ProtectedRoute>
                      <DashboardHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/dsp"
                  element={
                    <ProtectedRoute>
                      <DashboardDSP />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/import"
                  element={
                    <ProtectedRoute>
                      <DashboardImport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/reports"
                  element={
                    <ProtectedRoute>
                      <DashboardReports />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/settings"
                  element={
                    <ProtectedRoute>
                      <DashboardSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;