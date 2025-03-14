
import { useEffect, useState } from 'react';
import { getSupabaseClient } from '../utils/supabase';
import type { PostgrestError, PostgrestResponse } from '@supabase/supabase-js';

type QueryResult<T> = {
  data: T | null;
  loading: boolean;
  error: PostgrestError | null;
  refresh: () => Promise<void>;
};

export function useSupabase<T>(
  queryFn: (client: ReturnType<typeof getSupabaseClient>) => Promise<PostgrestResponse<T>>
): QueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const executeQuery = async () => {
    try {
      setLoading(true);
      const { data: result, error } = await queryFn(getSupabaseClient());
      
      if (error) {
        throw error;
      }

      setData(result as T);
      setError(null);
    } catch (err) {
      setError(err as PostgrestError);
      console.error('Supabase query error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeQuery();
  }, []);

  return {
    data,
    loading,
    error,
    refresh: executeQuery
  };
}

export function useSupabaseSubscription<T>(
  tableName: string,
  filter: string = '*',
  callback: (payload: T) => void
) {
  useEffect(() => {
    const client = getSupabaseClient();
    const subscription = client
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: tableName, filter },
        (payload) => callback(payload.new as T)
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [tableName, filter, callback]);
}
