
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/ui/theme-provider';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardContent } from './components/DashboardContent';
import { DataImport } from './components/DataImport';
import Dashboard from './pages/Dashboard';

function App() {
  // For now, we'll bypass authentication and route directly to the dashboard
  return (
    <ThemeProvider defaultTheme="light" storageKey="amazon-metrics-theme">
      <Router>
        <Routes>
          {/* Redirect from root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard routes - no auth check for now */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardContent />} />
            <Route path="import" element={<DataImport />} />
            {/* Add other dashboard routes as needed */}
          </Route>
        </Routes>
      </Router>
      
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;
