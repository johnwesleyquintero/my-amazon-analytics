import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AuthProvider } from '../features/auth/context/AuthContext';
import App from '../App';

describe('Authentication Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('successful login redirects to dashboard', async () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
    });
  });

  test('failed login shows error message', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    require('@supabase/supabase-js').createClient().auth.signInWithPassword
      .mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});