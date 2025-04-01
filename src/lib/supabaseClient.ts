
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

/**
 * Creates and configures the Supabase client
 * with proper typing from the Database interface.
 */
export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        'X-Client-Info': 'my-amazon-analytics'
      }
    }
  }
);

/**
 * Returns a fresh Supabase client instance
 * Useful for cases where you need to ensure you have a session
 */
export const getSupabaseClient = (): typeof supabase => supabase;

/**
 * Type definition for common Supabase response patterns
 */
export type SupabaseResponse<T> = {
  data: T | null;
  error: Error | null;
};

/**
 * Helper function to handle Supabase responses with proper error handling
 * @param promise The Supabase promise to be handled
 * @returns A promise that resolves to the data or rejects with an error
 */
export async function handleSupabaseResponse<T>(
  promise: Promise<{ data: T | null; error: Error | null }>
): Promise<T> {
  const { data, error } = await promise;
  
  if (error) {
    console.error('Supabase operation failed:', error);
    throw error;
  }
  
  if (data === null) {
    throw new Error('No data returned from operation');
  }
  
  return data;
}
