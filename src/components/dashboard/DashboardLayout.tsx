
import React from 'react';
import { DashboardSidebar } from '../DashboardSidebar';
import { useAuth } from '@/components/AuthProvider';
import { Loader2 } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Provides the main dashboard layout structure with authentication-aware loading state
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Dashboard content components
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center" role="status" aria-label="Loading dashboard">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
        <span className="sr-only">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row w-full bg-gray-50 transition-all duration-300">
        <DashboardSidebar />
        <main 
          className="flex-1 p-4 md:p-8 overflow-x-hidden"
          role="main"
          aria-label="Dashboard content"
        >
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
