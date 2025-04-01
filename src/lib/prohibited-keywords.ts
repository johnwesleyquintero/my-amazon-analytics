
/**
 * Utilities for detecting and handling prohibited keywords in Amazon listings
 */

/**
 * List of prohibited terms in Amazon listings categorized by reason
 */
export const PROHIBITED_TERMS = {
  trademark: [
    'FDA Approved',
    'FDA Cleared',
    'FDA',
    'EPA',
    'EPA Approved',
    'USDA Certified',
    'USDA Approved',
    'CE Certified',
    'UL Listed',
    'Energy Star'
  ],
  competition: [
    'Best Seller',
    '#1 Rated',
    'Number One',
    'Top Rated',
    'Bestselling'
  ],
  medical: [
    'Cure',
    'Prevent',
    'Treat',
    'Diagnose',
    'Healing',
    'Therapeutic',
    'Remedy',
    'Relieves',
    'Heals',
    'Eliminates'
  ],
  unsubstantiated: [
    'Guaranteed',
    'Clinically Proven',
    'Doctor Recommended',
    'Scientifically Proven',
    '100% Safe',
    'Risk Free',
    'No Side Effects',
    'Miracle',
    'Revolutionary',
    'Breakthrough'
  ]
};

/**
 * Scans text for prohibited keywords
 * @param text Text to scan for prohibited keywords
 * @returns Array of found prohibited keywords and their categories
 */
export function scanForProhibitedKeywords(text: string): Array<{term: string, category: string}> {
  const results: Array<{term: string, category: string}> = [];
  const lowerText = text.toLowerCase();
  
  Object.entries(PROHIBITED_TERMS).forEach(([category, terms]) => {
    terms.forEach(term => {
      if (lowerText.includes(term.toLowerCase())) {
        results.push({
          term,
          category
        });
      }
    });
  });
  
  return results;
}

/**
 * Gets recommended alternatives for prohibited terms
 * @param term Prohibited term to get alternatives for
 * @returns Array of suggested alternative phrases
 */
export function getAlternativePhrasing(term: string): string[] {
  const alternatives: Record<string, string[]> = {
    'FDA Approved': ['Manufactured in an FDA-registered facility', 'Formulated to FDA guidelines'],
    'Best Seller': ['Popular choice', 'Customer favorite', 'Highly rated'],
    'Cure': ['Supports', 'Helps with', 'Formulated for'],
    'Guaranteed': ['Designed to', 'Formulated to help with', 'May help with'],
    // Add more alternatives as needed
  };
  
  return alternatives[term] || ['Please remove this claim', 'Consider rephrasing without making claims'];
}

/**
 * Checks if a product listing is compliant with Amazon policies
 * @param listing Object containing listing details
 * @returns Object with compliance status and violations
 */
export function checkListingCompliance(listing: {
  title: string;
  description: string;
  bulletPoints: string[];
  keywords: string[];
}): {
  isCompliant: boolean;
  violations: Array<{term: string, category: string, location: string}>;
} {
  const violations: Array<{term: string, category: string, location: string}> = [];
  
  // Check title
  scanForProhibitedKeywords(listing.title).forEach(({term, category}) => {
    violations.push({term, category, location: 'title'});
  });
  
  // Check description
  scanForProhibitedKeywords(listing.description).forEach(({term, category}) => {
    violations.push({term, category, location: 'description'});
  });
  
  // Check bullet points
  listing.bulletPoints.forEach((bullet, index) => {
    scanForProhibitedKeywords(bullet).forEach(({term, category}) => {
      violations.push({term, category, location: `bulletPoint${index + 1}`});
    });
  });
  
  // Check keywords
  listing.keywords.forEach(keyword => {
    scanForProhibitedKeywords(keyword).forEach(({term, category}) => {
      violations.push({term, category, location: 'keywords'});
    });
  });
  
  return {
    isCompliant: violations.length === 0,
    violations
  };
}
