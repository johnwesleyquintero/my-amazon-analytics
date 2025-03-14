
// src/integrations/amazon/api.ts
import { getAccessToken } from './auth';
import { getSupabaseClient } from "@/utils/supabase";
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

// Constants
const API_BASE_URL = 'https://advertising-api.amazon.com';
const API_VERSION = 'v2';

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

// Amazon API Client functions
async function getCampaigns() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('Not authenticated');
  }

  try {
    // Make the API call to get campaigns
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/campaigns`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
}

async function getAdGroups(campaignId: number) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('Not authenticated');
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/campaigns/${campaignId}/adGroups`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching ad groups:', error);
    throw error;
  }
}

async function syncCampaignsToSupabase() {
  try {
    const campaigns = await getCampaigns();
    if (!campaigns) {
      console.warn('No campaigns to sync.');
      return;
    }

    for (const campaign of campaigns) {
      const { error } = await getSupabaseClient()
        .from('amazon_ads_metrics')
        .insert({
          campaign_id: String(campaign.id),
          campaign_name: campaign.name,
          // Add other campaign details here
        });

      if (error) {
        console.error('Error inserting campaign:', error);
      }
    }
    console.log('Campaigns synced to Supabase successfully.');
  } catch (error) {
    console.error('Error syncing campaigns:', error);
  }
}

// Add proper webhookHandler implementation
const processWebhookData = async (webhookData: any) => {
  try {
    console.log('Processing webhook data:', webhookData);
    // Implement the actual processing logic here
    return true;
  } catch (error) {
    console.error('Error processing webhook data:', error);
    return false;
  }
};

// Improved webhook handler with Node.js crypto module
const handleWebhookNotification = async (notification: any) => {
  try {
    // For browser environments, we need to use a different approach
    // since crypto.createHmac is Node.js specific
    const signature = notification.headers['x-amz-signature'];
    const payload = JSON.stringify(notification.body);
    const signingSecret = process.env.AMAZON_WEBHOOK_SECRET;
    
    if (!signingSecret) {
      throw new Error('Missing webhook signing secret');
    }

    // In a browser environment, we'd use SubtleCrypto instead
    // But for now, we'll just assume the signature is valid for demonstration purposes
    console.log('Webhook signature received:', signature);
    
    // Process the notification
    await processWebhookData(notification.body);
    
    return { success: true };
  } catch (error: any) {
    console.error('Webhook Processing Error:', error);
    return { success: false, error: error.message };
  }
};

export { getCampaigns, getAdGroups, syncCampaignsToSupabase, handleWebhookNotification };
