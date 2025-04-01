
/**
 * Custom error types for Amazon-related operations
 */

// Base Amazon API error
export class AmazonApiError extends Error {
  statusCode?: number;
  apiRequestId?: string;

  constructor(message: string, statusCode?: number, apiRequestId?: string) {
    super(message);
    this.name = 'AmazonApiError';
    this.statusCode = statusCode;
    this.apiRequestId = apiRequestId;
  }
}

// Authentication error
export class AmazonAuthError extends AmazonApiError {
  constructor(message: string, statusCode?: number, apiRequestId?: string) {
    super(message, statusCode, apiRequestId);
    this.name = 'AmazonAuthError';
  }
}

// Rate limit error
export class AmazonRateLimitError extends AmazonApiError {
  retryAfter?: number;

  constructor(message: string, statusCode?: number, apiRequestId?: string, retryAfter?: number) {
    super(message, statusCode, apiRequestId);
    this.name = 'AmazonRateLimitError';
    this.retryAfter = retryAfter;
  }
}

// Data validation error
export class AmazonDataError extends Error {
  fieldErrors: Record<string, string>[];

  constructor(message: string, fieldErrors: Record<string, string>[] = []) {
    super(message);
    this.name = 'AmazonDataError';
    this.fieldErrors = fieldErrors;
  }
}

/**
 * Format error response for displaying to users
 * @param error Error object
 * @returns Formatted error message
 */
export function formatAmazonError(error: unknown): string {
  if (error instanceof AmazonApiError) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      return 'Authentication failed. Please check your Amazon API credentials.';
    }
    
    if (error.statusCode === 429) {
      return 'Rate limit exceeded. Please try again later.';
    }
    
    if (error.apiRequestId) {
      return `Amazon API Error (Request ID: ${error.apiRequestId}): ${error.message}`;
    }
    
    return `Amazon API Error: ${error.message}`;
  }
  
  if (error instanceof AmazonDataError) {
    if (error.fieldErrors.length > 0) {
      const fieldMessages = error.fieldErrors.map(fe => 
        Object.entries(fe).map(([field, msg]) => `${field}: ${msg}`).join(', ')
      );
      return `Data validation error: ${fieldMessages.join('; ')}`;
    }
    return `Data validation error: ${error.message}`;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred with the Amazon API';
}

/**
 * Check if error is a specific Amazon error type
 * @param error Error to check
 * @param errorType Error type to check against
 * @returns Boolean indicating if error is of the specified type
 */
export function isAmazonErrorType(error: unknown, errorType: string): boolean {
  return error instanceof Error && error.name === errorType;
}
