
/**
 * Prohibited Keywords Utilities
 * Functions for checking and managing prohibited keywords in Amazon listings
 */

// List of prohibited keywords based on Amazon's policies
const PROHIBITED_KEYWORDS = [
  // Brand infringement terms
  'apple', 'nike', 'adidas', 'samsung', 'sony', 'gucci', 'louis vuitton',
  'chanel', 'rolex', 'disney', 'nintendo', 'playstation', 'xbox',
  
  // Misleading terms
  'cure', 'prevent', 'treat', 'diagnose', 'healing', 'miracle', 'guaranteed',
  'authentic', 'genuine', 'official', 'authorized', 'originally',
  
  // Restricted medical terms
  'coronavirus', 'covid', 'cancer', 'diabetes', 'arthritis', 'alzheimer',
  'heart disease', 'asthma', 'migraine',
  
  // Trademark, copyright issues
  'patented', 'trademarked', 'registered', 'patent pending',
  
  // Restricted promotional terms
  'best seller', '#1', 'top rated', 'lowest price', 'cheapest'
];

// Categories of prohibited terms
export const PROHIBITED_CATEGORIES = {
  BRAND_INFRINGEMENT: 'brand_infringement',
  MEDICAL_CLAIMS: 'medical_claims',
  IP_VIOLATION: 'ip_violation',
  MISLEADING: 'misleading',
  PROMOTIONAL: 'promotional'
};

/**
 * Check if text contains prohibited keywords
 * @param text Text to check
 * @returns Array of found prohibited keywords
 */
export function checkForProhibitedKeywords(text: string): string[] {
  if (!text) return [];
  
  const lowercaseText = text.toLowerCase();
  return PROHIBITED_KEYWORDS.filter(keyword => 
    lowercaseText.includes(keyword.toLowerCase())
  );
}

/**
 * Get detailed violations with categories
 * @param text Text to check
 * @returns Array of violation objects with keyword and category
 */
export function getDetailedViolations(text: string): Array<{
  keyword: string;
  category: string;
  severity: 'high' | 'medium' | 'low';
}> {
  if (!text) return [];
  
  const lowercaseText = text.toLowerCase();
  const violations: Array<{
    keyword: string;
    category: string;
    severity: 'high' | 'medium' | 'low';
  }> = [];
  
  // Brand infringement (high severity)
  const brandTerms = [
    'apple', 'nike', 'adidas', 'samsung', 'sony', 'gucci', 'louis vuitton',
    'chanel', 'rolex', 'disney', 'nintendo', 'playstation', 'xbox'
  ];
  
  // Medical claims (high severity)
  const medicalTerms = [
    'cure', 'prevent', 'treat', 'diagnose', 'healing', 'miracle',
    'coronavirus', 'covid', 'cancer', 'diabetes', 'arthritis', 'alzheimer',
    'heart disease', 'asthma', 'migraine'
  ];
  
  // IP violation (medium severity)
  const ipTerms = [
    'patented', 'trademarked', 'registered', 'patent pending'
  ];
  
  // Misleading (medium severity)
  const misleadingTerms = [
    'guaranteed', 'authentic', 'genuine', 'official', 'authorized', 'originally'
  ];
  
  // Promotional (low severity)
  const promotionalTerms = [
    'best seller', '#1', 'top rated', 'lowest price', 'cheapest'
  ];
  
  // Check each category
  brandTerms.forEach(term => {
    if (lowercaseText.includes(term)) {
      violations.push({
        keyword: term,
        category: PROHIBITED_CATEGORIES.BRAND_INFRINGEMENT,
        severity: 'high'
      });
    }
  });
  
  medicalTerms.forEach(term => {
    if (lowercaseText.includes(term)) {
      violations.push({
        keyword: term,
        category: PROHIBITED_CATEGORIES.MEDICAL_CLAIMS,
        severity: 'high'
      });
    }
  });
  
  ipTerms.forEach(term => {
    if (lowercaseText.includes(term)) {
      violations.push({
        keyword: term,
        category: PROHIBITED_CATEGORIES.IP_VIOLATION,
        severity: 'medium'
      });
    }
  });
  
  misleadingTerms.forEach(term => {
    if (lowercaseText.includes(term)) {
      violations.push({
        keyword: term,
        category: PROHIBITED_CATEGORIES.MISLEADING,
        severity: 'medium'
      });
    }
  });
  
  promotionalTerms.forEach(term => {
    if (lowercaseText.includes(term)) {
      violations.push({
        keyword: term,
        category: PROHIBITED_CATEGORIES.PROMOTIONAL,
        severity: 'low'
      });
    }
  });
  
  return violations;
}

/**
 * Suggest alternatives for prohibited keywords
 * @param keyword Prohibited keyword
 * @returns Array of suggested alternatives
 */
export function suggestAlternatives(keyword: string): string[] {
  const alternatives: Record<string, string[]> = {
    // Brand alternatives
    'apple': ['fruit', 'produce', 'mobile device'],
    'nike': ['athletic shoes', 'sports footwear', 'running shoes'],
    
    // Medical alternatives
    'cure': ['may help with', 'designed for', 'supports'],
    'prevent': ['designed for', 'helps with', 'supports'],
    'treat': ['designed for', 'helps with', 'intended for'],
    
    // Misleading alternatives
    'authentic': ['premium quality', 'high-quality'],
    'genuine': ['premium quality', 'high-quality'],
    'official': ['premium quality', 'high-quality'],
    
    // Promotional alternatives
    'best seller': ['popular choice', 'customer favorite'],
    '#1': ['popular choice', 'customer favorite'],
    'top rated': ['highly rated', 'well-reviewed']
  };
  
  return alternatives[keyword.toLowerCase()] || ['premium quality', 'high-quality'];
}

/**
 * Create a sanitized version of text with prohibited keywords replaced
 * @param text Original text
 * @returns Sanitized text
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  
  let sanitized = text;
  const violations = checkForProhibitedKeywords(text);
  
  violations.forEach(keyword => {
    const alternatives = suggestAlternatives(keyword);
    const replacement = alternatives[0] || '[redacted]';
    
    // Replace with regex to catch variations in case
    const regex = new RegExp(keyword, 'gi');
    sanitized = sanitized.replace(regex, replacement);
  });
  
  return sanitized;
}

/**
 * Check if a listing is compliant with Amazon's policies
 * @param listing Listing object with title, description, and bullets
 * @returns Compliance status and violations
 */
export function checkListingCompliance(listing: {
  title: string;
  description: string;
  bulletPoints?: string[];
}): {
  isCompliant: boolean;
  violations: Array<{
    field: string;
    keywords: string[];
    suggestions: Record<string, string[]>;
  }>;
} {
  const violations: Array<{
    field: string;
    keywords: string[];
    suggestions: Record<string, string[]>;
  }> = [];
  
  // Check title
  const titleViolations = checkForProhibitedKeywords(listing.title);
  if (titleViolations.length > 0) {
    const suggestions: Record<string, string[]> = {};
    titleViolations.forEach(keyword => {
      suggestions[keyword] = suggestAlternatives(keyword);
    });
    
    violations.push({
      field: 'title',
      keywords: titleViolations,
      suggestions
    });
  }
  
  // Check description
  const descriptionViolations = checkForProhibitedKeywords(listing.description);
  if (descriptionViolations.length > 0) {
    const suggestions: Record<string, string[]> = {};
    descriptionViolations.forEach(keyword => {
      suggestions[keyword] = suggestAlternatives(keyword);
    });
    
    violations.push({
      field: 'description',
      keywords: descriptionViolations,
      suggestions
    });
  }
  
  // Check bullet points
  if (listing.bulletPoints && listing.bulletPoints.length > 0) {
    const bulletViolations: string[] = [];
    
    listing.bulletPoints.forEach(bullet => {
      const bulletKeywords = checkForProhibitedKeywords(bullet);
      bulletViolations.push(...bulletKeywords);
    });
    
    if (bulletViolations.length > 0) {
      const suggestions: Record<string, string[]> = {};
      bulletViolations.forEach(keyword => {
        suggestions[keyword] = suggestAlternatives(keyword);
      });
      
      violations.push({
        field: 'bulletPoints',
        keywords: bulletViolations,
        suggestions
      });
    }
  }
  
  return {
    isCompliant: violations.length === 0,
    violations
  };
}
