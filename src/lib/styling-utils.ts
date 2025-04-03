
/**
 * Styling Utilities
 * Helper functions for CSS-in-JS styling and Tailwind CSS class merging
 */

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine class names with Tailwind class merging
 * Properly merges conflicting Tailwind classes
 * @param inputs Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a color for a string based on its content
 * Useful for avatars, tags, labels that need consistent color by name
 * @param text Input text to derive color from
 * @param saturation Saturation value (0-100)
 * @param lightness Lightness value (0-100)
 * @returns HSL color string
 */
export function stringToColor(text: string, saturation = 70, lightness = 45): string {
  if (!text) return `hsl(0, ${saturation}%, ${lightness}%)`;
  
  // Generate a hash from the text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert hash to HSL color (using hue 0-360)
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Check if color is light or dark
 * @param color Color in hex format
 * @returns True if color is light
 */
export function isLightColor(color: string): boolean {
  // Remove # if present
  const hex = color.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness using HSP color model
  // See: http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );
  
  // Return true if light (>127.5), false if dark
  return hsp > 127.5;
}

/**
 * Generate a contrasting text color (black/white) based on background
 * @param backgroundColor Background color in hex format
 * @returns '#ffffff' or '#000000'
 */
export function getContrastText(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#000000' : '#ffffff';
}

/**
 * Convert hex color to RGBA with opacity
 * @param hex Hex color code
 * @param alpha Opacity value (0-1)
 * @returns RGBA color string
 */
export function hexToRgba(hex: string, alpha = 1): string {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const formattedHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);
  if (!result) return `rgba(0, 0, 0, ${alpha})`;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Calculate gradient stops for multi-step gradients
 * @param colors Array of colors for gradient
 * @param steps Number of steps in the gradient
 * @returns CSS gradient string
 */
export function createGradient(colors: string[], steps = colors.length): string {
  if (colors.length < 2) return colors[0] || 'transparent';
  
  const gradient: string[] = [];
  
  for (let i = 0; i < steps; i++) {
    const percentage = Math.round((i / (steps - 1)) * 100);
    const colorIndex = Math.min(Math.floor(i * (colors.length - 1) / (steps - 1)), colors.length - 1);
    gradient.push(`${colors[colorIndex]} ${percentage}%`);
  }
  
  return `linear-gradient(to right, ${gradient.join(', ')})`;
}

/**
 * Create Tailwind background classes based on theme
 * @param theme 'light' | 'dark' | 'system'
 * @param variants Base style variants
 * @returns Object with Tailwind class names for different elements
 */
export function getThemeClasses(
  theme: 'light' | 'dark' | 'system',
  variants: {
    primary?: string;
    secondary?: string;
    accent?: string;
  } = {}
): Record<string, string> {
  const isDark = theme === 'dark';
  
  // Default styles
  const defaultStyles = {
    primary: variants.primary || 'bg-blue-600',
    secondary: variants.secondary || 'bg-gray-600',
    accent: variants.accent || 'bg-purple-600'
  };
  
  return {
    // Base background
    background: isDark ? 'bg-gray-900' : 'bg-white',
    
    // Text colors
    text: isDark ? 'text-white' : 'text-gray-900',
    textMuted: isDark ? 'text-gray-300' : 'text-gray-600',
    textInverted: isDark ? 'text-gray-900' : 'text-white',
    
    // Card styles
    card: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    cardHover: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    
    // Button styles
    buttonPrimary: `${defaultStyles.primary} text-white`,
    buttonSecondary: isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800',
    buttonOutline: isDark ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800',
    
    // Input styles
    input: isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900',
    inputFocus: isDark ? 'focus:border-blue-500' : 'focus:border-blue-600',
    
    // Divider
    divider: isDark ? 'border-gray-700' : 'border-gray-200',
    
    // Table styles
    table: isDark ? 'border-gray-700' : 'border-gray-200',
    tableHeader: isDark ? 'bg-gray-800' : 'bg-gray-50',
    tableRow: isDark ? 'border-gray-700' : 'border-gray-200',
    tableRowHover: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
  };
}
