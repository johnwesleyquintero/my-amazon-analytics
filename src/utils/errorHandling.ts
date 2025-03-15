
import { toast } from "@/hooks/use-toast";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Error types that can be handled by the application
 */
export type AppError = 
  | PostgrestError 
  | Error 
  | unknown;

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: string;
  hint?: string;
}

/**
 * Formats different error types into a standard ErrorResponse
 * @param error Any error type
 * @returns Standardized ErrorResponse object
 */
export const formatError = (error: AppError): ErrorResponse => {
  if (error instanceof Error) {
    return {
      message: error.message,
      details: error.stack,
    };
  }
  
  // Handle Supabase PostgrestError
  if (typeof error === 'object' && error !== null) {
    const pgError = error as Partial<PostgrestError>;
    
    if (pgError.message) {
      return {
        message: pgError.message,
        code: pgError.code,
        details: pgError.details,
        hint: pgError.hint,
      };
    }
    
    // Handle any object with message prop
    if ('message' in error && typeof error.message === 'string') {
      return {
        message: error.message,
        ...(('code' in error && typeof error.code === 'string') ? { code: error.code } : {}),
      };
    }
  }
  
  // Fallback for unknown error types
  return {
    message: 'An unknown error occurred',
    details: String(error),
  };
};

/**
 * Handles and formats errors with toast notifications
 * @param error The error object
 * @param context Additional context for error reporting
 * @returns Formatted error message
 */
export const handleError = (error: AppError, context: string = "Operation"): string => {
  const formattedError = formatError(error);
  
  // Log full error details for debugging
  console.error(`${context} error:`, error);
  
  // Show user-friendly notification
  toast({
    title: `${context} Failed`,
    description: formattedError.message,
    variant: "destructive",
  });

  return formattedError.message;
};

/**
 * Safe data fetcher with built-in error handling
 * @param fetchFunction Async function that performs the data fetching
 * @param defaultValue Default value to return if fetching fails
 * @param context Context of the operation for error reporting
 * @returns Promise resolving to the fetched data or default value
 */
export async function safeDataFetch<T>(
  fetchFunction: () => Promise<T>,
  defaultValue: T,
  context: string = "Data fetch"
): Promise<T> {
  try {
    return await fetchFunction();
  } catch (error) {
    handleError(error, context);
    return defaultValue;
  }
}

/**
 * Creates a retry mechanism for async operations
 * @param operation The async operation to retry
 * @param maxAttempts Maximum number of retry attempts
 * @param delayMs Delay between retries in milliseconds
 * @returns Promise resolving to the operation result
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: AppError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt < maxAttempts) {
        console.warn(`Attempt ${attempt} failed, retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        // Exponential backoff
        delayMs *= 2;
      }
    }
  }
  
  throw lastError;
}
