
import { toast } from "@/hooks/use-toast";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Handles and formats Supabase errors
 * @param error The Supabase error object
 * @param context Additional context for error reporting
 */
export const handleSupabaseError = (error: PostgrestError | Error | unknown, context: string = "Operation") => {
  let message = "An unknown error occurred";
  
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    message = (error as { message: string }).message;
  }

  console.error(`${context} error:`, error);
  
  toast({
    title: `${context} Failed`,
    description: message,
    variant: "destructive",
  });

  return message;
};

/**
 * Safe data fetcher for Supabase queries
 * @param fetchFunction Async function that performs the actual data fetching
 * @param defaultValue Default value to return if fetching fails
 * @param context Context of the operation for error reporting
 */
export async function safeDataFetch<T>(
  fetchFunction: () => Promise<T>,
  defaultValue: T,
  context: string = "Data fetch"
): Promise<T> {
  try {
    return await fetchFunction();
  } catch (error) {
    handleSupabaseError(error, context);
    return defaultValue;
  }
}
