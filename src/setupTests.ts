
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { vi } from 'vitest';

// Validate test environment variables
try {
  if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_KEY) {
    throw new Error('Required environment variables are missing for tests:\n' +
      (!process.env.VITE_SUPABASE_URL ? '- VITE_SUPABASE_URL\n' : '') +
      (!process.env.VITE_SUPABASE_KEY ? '- VITE_SUPABASE_KEY\n' : ''));
  }
} catch (error) {
  console.error('Test environment setup failed:', error);
  process.exit(1);
}

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      signInWithPassword: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-id', email: 'test@example.com' } }, error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      onAuthStateChange: vi.fn().mockImplementation((callback) => {
        callback('SIGNED_IN', { user: { id: 'test-user-id', email: 'test@example.com' } });
        return { data: { subscription: { unsubscribe: vi.fn() } } };
      })
    }
  }))
}));
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
