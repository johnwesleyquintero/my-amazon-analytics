
/**
 * Amazon Errors
 * Custom error classes and error handling utilities for Amazon-related operations
 */

/**
 * Base Amazon API Error
 */
export class AmazonAPIError extends Error {
  public status: number;
  public code: string;
  
  constructor(message: string, status = 500, code = 'UNKNOWN_ERROR') {
    super(message);
    this.name = 'AmazonAPIError';
    this.status = status;
    this.code = code;
    
    // Ensure proper prototype chain
    Object.setPrototypeOf(this, AmazonAPIError.prototype);
  }
}

/**
 * Rate limit exceeded error
 */
export class AmazonRateLimitError extends AmazonAPIError {
  public retryAfter: number;
  
  constructor(message: string, retryAfter = 60, status = 429) {
    super(message, status, 'RATE_LIMIT_EXCEEDED');
    this.name = 'AmazonRateLimitError';
    this.retryAfter = retryAfter;
    
    // Ensure proper prototype chain
    Object.setPrototypeOf(this, AmazonRateLimitError.prototype);
  }
}

/**
 * Authentication error
 */
export class AmazonAuthError extends AmazonAPIError {
  constructor(message: string, status = 401) {
    super(message, status, 'AUTHENTICATION_ERROR');
    this.name = 'AmazonAuthError';
    
    // Ensure proper prototype chain
    Object.setPrototypeOf(this, AmazonAuthError.prototype);
  }
}

/**
 * Invalid parameter error
 */
export class AmazonInvalidParameterError extends AmazonAPIError {
  public invalidParams: string[];
  
  constructor(message: string, invalidParams: string[] = [], status = 400) {
    super(message, status, 'INVALID_PARAMETER');
    this.name = 'AmazonInvalidParameterError';
    this.invalidParams = invalidParams;
    
    // Ensure proper prototype chain
    Object.setPrototypeOf(this, AmazonInvalidParameterError.prototype);
  }
}

/**
 * Data import error
 */
export class AmazonDataImportError extends AmazonAPIError {
  public originalData: any;
  
  constructor(message: string, originalData: any = null, status = 400) {
    super(message, status, 'DATA_IMPORT_ERROR');
    this.name = 'AmazonDataImportError';
    this.originalData = originalData;
    
    // Ensure proper prototype chain
    Object.setPrototypeOf(this, AmazonDataImportError.prototype);
  }
}

// Utility functions

/**
 * Parse an Amazon API error response
 * @param error Raw error from API
 * @returns Appropriate error instance
 */
export function parseAmazonAPIError(error: any): AmazonAPIError {
  if (!error) {
    return new AmazonAPIError('Unknown error occurred');
  }
  
  // Extract error details
  const statusCode = error.status || error.statusCode || 500;
  const errorCode = error.code || error.errorCode || 'UNKNOWN_ERROR';
  const message = error.message || 'An error occurred with the Amazon API';
  
  // Handle specific error types
  switch (errorCode) {
    case 'RATE_LIMIT_EXCEEDED':
    case 'TOO_MANY_REQUESTS':
      const retryAfter = error.retryAfter || error.headers?.['retry-after'] || 60;
      return new AmazonRateLimitError(message, parseInt(retryAfter, 10), statusCode);
    
    case 'UNAUTHORIZED':
    case 'INVALID_TOKEN':
    case 'ACCESS_DENIED':
      return new AmazonAuthError(message, statusCode);
    
    case 'INVALID_PARAMETER':
    case 'VALIDATION_ERROR':
      const invalidParams = error.invalidParams || error.validationErrors || [];
      return new AmazonInvalidParameterError(message, invalidParams, statusCode);
    
    case 'DATA_IMPORT_ERROR':
    case 'INVALID_DATA_FORMAT':
      return new AmazonDataImportError(message, error.originalData, statusCode);
    
    default:
      return new AmazonAPIError(message, statusCode, errorCode);
  }
}

/**
 * Format error message for user display
 * @param error Error object
 * @returns User-friendly error message
 */
export function getUserFriendlyErrorMessage(error: any): string {
  if (!error) {
    return 'An unknown error occurred. Please try again.';
  }
  
  // Handle Amazon API errors
  if (error instanceof AmazonAPIError) {
    switch (error.code) {
      case 'RATE_LIMIT_EXCEEDED':
        return `Rate limit exceeded. Please try again in ${(error as AmazonRateLimitError).retryAfter} seconds.`;
      
      case 'AUTHENTICATION_ERROR':
        return 'Authentication failed. Please check your credentials and try again.';
      
      case 'INVALID_PARAMETER':
        const params = (error as AmazonInvalidParameterError).invalidParams;
        if (params.length > 0) {
          return `Invalid parameters: ${params.join(', ')}. Please check your input.`;
        }
        return 'Invalid parameters provided. Please check your input.';
      
      case 'DATA_IMPORT_ERROR':
        return 'Error importing data. Please check your file format and try again.';
      
      default:
        return error.message || 'An error occurred with the Amazon API.';
    }
  }
  
  // Handle network errors
  if (error.name === 'NetworkError' || error.message?.includes('network')) {
    return 'A network error occurred. Please check your internet connection and try again.';
  }
  
  // Handle timeout errors
  if (error.name === 'TimeoutError' || error.message?.includes('timeout')) {
    return 'The request timed out. Please try again later.';
  }
  
  // Default error message
  return error.message || 'An error occurred. Please try again.';
}

/**
 * Log error with context for monitoring
 * @param error Error object
 * @param context Additional context
 */
export function logAmazonError(error: any, context: Record<string, any> = {}): void {
  const timestamp = new Date().toISOString();
  const errorCode = error?.code || 'UNKNOWN';
  const errorName = error?.name || 'Error';
  const errorMessage = error?.message || 'Unknown error';
  const errorStack = error?.stack || '';
  
  // Log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${timestamp}] ${errorName} (${errorCode}): ${errorMessage}`, {
      context,
      stack: errorStack
    });
    return;
  }
  
  // In production we would send to error monitoring service
  // This is a placeholder for actual error reporting implementation
  console.error(`[${timestamp}] ${errorName} (${errorCode}): ${errorMessage}`);
  
  // Mock error reporting service (replace with actual implementation)
  const errorReport = {
    timestamp,
    name: errorName,
    code: errorCode,
    message: errorMessage,
    stack: errorStack,
    context
  };
  
  // Here you would send to your error monitoring service
  // Example: ErrorReportingService.report(errorReport);
}
