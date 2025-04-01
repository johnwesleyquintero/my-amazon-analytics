
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and tailwind-merge
 * for optimal Tailwind CSS class handling
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Generates a style for a progress bar based on a percentage value
 * @param percentage Percentage value (0-100)
 * @returns CSS style object
 */
export function progressBarStyle(percentage: number): Record<string, string> {
  const validPercentage = Math.max(0, Math.min(100, percentage));
  return {
    width: `${validPercentage}%`,
  };
}

/**
 * Generates a color class based on a percentage value
 * @param percentage Percentage value (0-100)
 * @returns Tailwind CSS color class
 */
export function getColorByPercentage(percentage: number): string {
  if (percentage < 30) return "bg-red-500";
  if (percentage < 70) return "bg-yellow-500";
  return "bg-green-500";
}

/**
 * Generates a color class based on an ACOS value
 * @param acos ACOS value (percentage)
 * @param target Target ACOS (default: 30)
 * @returns Tailwind CSS color class
 */
export function getAcosColorClass(acos: number, target: number = 30): string {
  if (acos > target * 1.5) return "text-red-600";
  if (acos > target) return "text-amber-600";
  if (acos < target * 0.5) return "text-emerald-600";
  return "text-green-600";
}

/**
 * Generates a color class based on a ROAS value
 * @param roas ROAS value (multiplier)
 * @param target Target ROAS (default: 3)
 * @returns Tailwind CSS color class
 */
export function getRoasColorClass(roas: number, target: number = 3): string {
  if (roas < target * 0.5) return "text-red-600";
  if (roas < target) return "text-amber-600";
  if (roas > target * 2) return "text-emerald-600";
  return "text-green-600";
}
