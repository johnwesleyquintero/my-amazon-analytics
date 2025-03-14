
// src/integrations/gemini/api.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSupabaseClient } from "@/utils/supabase";

// Rate limiting implementation
class RateLimiter {
  private tokens: number;
  private maxTokens: number;
  private refillRate: number;
  private lastRefill: number;

  constructor(maxTokens: number, refillRate: number) {
    this.tokens = maxTokens; // Initial tokens
    this.maxTokens = maxTokens; // Maximum tokens
    this.refillRate = refillRate; // Tokens per millisecond
    this.lastRefill = Date.now();
  }

  async consume(tokens: number = 1): Promise<boolean> {
    this.refill();
    
    if (this.tokens < tokens) {
      // If not enough tokens, wait and retry once
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.refill();
      
      if (this.tokens < tokens) {
        return false; // Still not enough tokens
      }
    }
    
    this.tokens -= tokens;
    return true;
  }

  private refill(): void {
    const now = Date.now();
    const elapsedTime = now - this.lastRefill;
    const tokensToAdd = elapsedTime * this.refillRate;
    
    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }
}

// Create a rate limiter: 10 requests per minute (1 token per 6000ms)
const rateLimiter = new RateLimiter(10, 1/6000);

// Initialize the Gemini API client
const initGeminiClient = async () => {
  try {
    // Fetch API key from Supabase Edge Function
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.functions.invoke('get-gemini-key', {
      body: { action: 'getKey' }
    });

    if (error) {
      console.error("Error fetching Gemini API key:", error);
      throw error;
    }

    const API_KEY = data.key;
    return new GoogleGenerativeAI(API_KEY);
  } catch (error) {
    console.error("Failed to initialize Gemini client:", error);
    throw error;
  }
}

export async function generateOptimizationSuggestion(prompt: string): Promise<string> {
  try {
    // Apply rate limiting
    const canProceed = await rateLimiter.consume();
    if (!canProceed) {
      return "Rate limit exceeded. Please try again later.";
    }

    const genAI = await initGeminiClient();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, there was an error generating suggestions. Please try again later.";
  }
}

export async function analyzeSearchTerms(searchTerms: any[]): Promise<string> {
  try {
    // Apply rate limiting
    const canProceed = await rateLimiter.consume(2); // Costs 2 tokens as it's more complex
    if (!canProceed) {
      return "Rate limit exceeded. Please try again later.";
    }

    const genAI = await initGeminiClient();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Analyze these Amazon advertising search terms and provide strategic recommendations:
      ${JSON.stringify(searchTerms, null, 2)}
      
      Focus on:
      1. Patterns in high-converting terms
      2. Opportunities to improve targeting
      3. Potential new keywords to explore
      4. Budget allocation suggestions
      
      Keep your analysis concise and actionable.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Search term analysis error:", error);
    return "Sorry, there was an error analyzing your search terms. Please try again later.";
  }
}
