import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
const App = React.lazy(() => import('./App.tsx'));
import './index.css';

const ErrorBoundary: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const errorHandler = (error: Error) => {
      console.error('Error boundary caught:', error);
      setHasError(true);
    };
    window.addEventListener('error', (event) => errorHandler(event.error));
    return () => window.removeEventListener('error', (event) => errorHandler(event.error));
  }, []);

  return hasError ? (
    <div className="p-4 bg-red-50 text-red-900">
      <h2>Loading Error</h2>
      <p>Please refresh the page or check your network connection</p>
    </div>
  ) : (
    <>{children}</>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <React.Suspense fallback={<div className="p-4 text-gray-600">Loading...</div>}>
        <App />
      </React.Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);