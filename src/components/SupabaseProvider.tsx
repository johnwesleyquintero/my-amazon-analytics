
import { createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

// Create a context for the Supabase client
const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

/**
 * Hook to access the Supabase client
 * @returns The Supabase client instance
 * 
 * @example
 * const supabase = useSupabase();
 * const { data } = await supabase.from('table').select('*');
 */
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

/**
 * Provider component that makes Supabase client available to any
 * child component that calls useSupabase().
 */
export function SupabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}
