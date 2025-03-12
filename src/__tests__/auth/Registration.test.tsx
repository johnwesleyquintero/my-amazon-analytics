import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Registration from '@/pages/auth/Registration';
import { supabase } from '@/lib/supabaseClient';

// Mock supabase client
vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
    },
  },
}));

// Wrap component with router for testing
const WrappedRegistration = () => (
  <BrowserRouter>
    <Registration />
  </BrowserRouter>
);

describe('Registration Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders registration form', () => {
    render(<WrappedRegistration />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('handles successful registration', async () => {
    const mockSignUp = vi.fn().mockResolvedValue({
      data: { user: { id: 'test-user' } },
      error: null,
    });
    supabase.auth.signUp = mockSignUp;

    render(<WrappedRegistration />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!',
      });
    });
  });

  it('handles registration error', async () => {
    const mockError = 'Registration failed';
    const mockSignUp = vi.fn().mockResolvedValue({
      data: { user: null },
      error: { message: mockError },
    });
    supabase.auth.signUp = mockSignUp;

    render(<WrappedRegistration />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(mockError)).toBeInTheDocument();
    });
  });
});