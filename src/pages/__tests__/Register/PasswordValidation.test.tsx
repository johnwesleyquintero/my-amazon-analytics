
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../Register';
import { toast } from 'sonner';
import { vi, describe, it, expect, beforeEach } from 'vitest';

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

describe('Password Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows error when passwords do not match', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    await userEvent.type(getByPlaceholderText(/^password$/i), 'password123');
    await userEvent.type(getByPlaceholderText(/confirm password/i), 'password456');
    await userEvent.click(getByRole('button', { name: /create account/i }));

    expect(toast.error).toHaveBeenCalledWith('Passwords do not match');
  });
});
