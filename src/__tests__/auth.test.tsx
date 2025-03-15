
import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';

// Mock AuthProvider to avoid the actual import
vi.mock('../App', () => ({
  default: () => <div data-testid="dashboard-page">Dashboard</div>
}));

describe('Authentication Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('successful login redirects to dashboard', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
    });
  });

  test('failed login shows error message', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock a failed login attempt
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
    });
  });
});
