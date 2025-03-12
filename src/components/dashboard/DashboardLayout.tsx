
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
 * 
 * Features:
 * - Shows loading spinner while authenticating
 * - Provides responsive sidebar layout
 * - Manages sidebar state context
 * 
 * @example
 * <DashboardLayout>
 *   <DashboardContent />
 * </DashboardLayout>
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
