
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../Register';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
    },
  },
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}));

describe('Registration Submission', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles successful registration', async () => {
    const mockSignUp = supabase.auth.signUp as unknown as ReturnType<typeof vi.fn>;
    mockSignUp.mockResolvedValueOnce({
      data: { user: { id: '123' } },
      error: null,
    });

    const { getByPlaceholderText, getByRole } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    await userEvent.type(getByPlaceholderText(/email/i), 'test@example.com');
    await userEvent.type(getByPlaceholderText(/company name/i), 'Test Company');
    await userEvent.type(getByPlaceholderText(/^password$/i), 'password123');
    await userEvent.type(getByPlaceholderText(/confirm password/i), 'password123');

    await userEvent.click(getByRole('button', { name: /create account/i }));

    expect(toast.success).toHaveBeenCalledWith(
      'Registration successful! Please check your email to verify your account.'
    );
  });

  it('handles registration error', async () => {
    const mockSignUp = supabase.auth.signUp as unknown as ReturnType<typeof vi.fn>;
    const errorMessage = 'Registration failed';
    mockSignUp.mockResolvedValueOnce({
      data: null,
      error: { message: errorMessage },
    });

    const { getByPlaceholderText, getByRole } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    await userEvent.type(getByPlaceholderText(/email/i), 'test@example.com');
    await userEvent.type(getByPlaceholderText(/company name/i), 'Test Company');
    await userEvent.type(getByPlaceholderText(/^password$/i), 'password123');
    await userEvent.type(getByPlaceholderText(/confirm password/i), 'password123');

    await userEvent.click(getByRole('button', { name: /create account/i }));

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
