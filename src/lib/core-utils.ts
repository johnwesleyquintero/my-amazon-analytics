
/**
 * Core Utility Functions
 * General purpose utilities used across the application
 */

/**
 * Format a number as currency
 * @param value The number to format
 * @param currency The currency symbol (default: $)
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number | undefined, currency = '$', decimals = 2): string {
  if (value === undefined || value === null || isNaN(value)) {
    return `${currency}0.00`;
  }
  
  return `${currency}${value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}`;
}

/**
 * Format a number as a percentage
 * @param value The number to format
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export function formatPercent(value: number | undefined, decimals = 2): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '0.00%';
  }
  
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a date string to a human-readable form
 * @param dateString Date string in ISO format
 * @param format Format to use (default: 'short')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, format: 'short' | 'medium' | 'long' = 'short'): string {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    switch (format) {
      case 'short':
        return date.toLocaleDateString();
      case 'medium':
        return date.toLocaleDateString(undefined, { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      case 'long':
        return date.toLocaleDateString(undefined, { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          weekday: 'long'
        });
      default:
        return date.toLocaleDateString();
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

/**
 * Truncate text to a specific length and add ellipsis if needed
 * @param text Text to truncate
 * @param maxLength Maximum length (default: 100)
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength = 100): string {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Create a debounced version of a function
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Safe access to nested object properties
 * @param obj Object to access
 * @param path Path to property (dot notation or array)
 * @param defaultValue Default value if path doesn't exist
 * @returns Property value or default value
 */
export function get(
  obj: Record<string, any> | null | undefined,
  path: string | string[],
  defaultValue?: any
): any {
  if (obj === null || obj === undefined) {
    return defaultValue;
  }
  
  const keys = Array.isArray(path) ? path : path.split('.');
  let result: any = obj;
  
  for (const key of keys) {
    result = result?.[key];
    
    if (result === undefined || result === null) {
      return defaultValue;
    }
  }
  
  return result;
}

/**
 * Generate a unique ID
 * @returns Unique ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value Value to check
 * @returns True if empty, false otherwise
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  
  return false;
}
