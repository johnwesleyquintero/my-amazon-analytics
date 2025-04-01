
import React from 'react';
import { DashboardSidebar } from '../DashboardSidebar';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

/**
 * Provides the main dashboard layout structure with navigation sidebar
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Dashboard content components
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
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
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
