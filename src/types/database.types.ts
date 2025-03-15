
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      amazon_ads_metrics: {
        Row: {
          id: string;
          date: string | null;
          impressions: number | null;
          clicks: number | null;
          amount_spent: number | null;
          total_ad_sales: number | null;
          total_ad_orders: number | null;
          acos: number | null;
          account_id: string | null;
          created_at: string | null;
          updated_at: string | null;
          campaign_name: string | null;
          ad_group_name: string | null;
          advertised_asin: string | null;
          advertised_sku: string | null;
          keyword: string | null;
          search_term: string | null;
          advertised_product_category: string | null;
          marketplace: string | null;
        };
        Insert: {
          id?: string;
          date?: string | null;
          impressions?: number | null;
          clicks?: number | null;
          amount_spent?: number | null;
          total_ad_sales?: number | null;
          total_ad_orders?: number | null;
          acos?: number | null;
          account_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          campaign_name?: string | null;
          ad_group_name?: string | null;
          advertised_asin?: string | null;
          advertised_sku?: string | null;
          keyword?: string | null;
          search_term?: string | null;
          advertised_product_category?: string | null;
          marketplace?: string | null;
        };
        Update: {
          id?: string;
          date?: string | null;
          impressions?: number | null;
          clicks?: number | null;
          amount_spent?: number | null;
          total_ad_sales?: number | null;
          total_ad_orders?: number | null;
          acos?: number | null;
          account_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          campaign_name?: string | null;
          ad_group_name?: string | null;
          advertised_asin?: string | null;
          advertised_sku?: string | null;
          keyword?: string | null;
          search_term?: string | null;
          advertised_product_category?: string | null;
          marketplace?: string | null;
        };
        Relationships: [];
      };
      api_keys: {
        Row: {
          id: string;
          user_id: string;
          created_at: string | null;
          key_value: string;
          key_type: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string | null;
          key_value: string;
          key_type: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          created_at?: string | null;
          key_value?: string;
          key_type?: string;
        };
        Relationships: [];
      };
      dashboard_settings: {
        Row: {
          id: string;
          user_id: string;
          show_welcome_message: boolean;
          created_at: string;
          updated_at: string;
          notification_preferences: Json | null;
          theme: string;
          default_view: string;
          default_date_range: string | null;
          default_currency: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          show_welcome_message?: boolean;
          created_at?: string;
          updated_at?: string;
          notification_preferences?: Json | null;
          theme?: string;
          default_view?: string;
          default_date_range?: string | null;
          default_currency?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          show_welcome_message?: boolean;
          created_at?: string;
          updated_at?: string;
          notification_preferences?: Json | null;
          theme?: string;
          default_view?: string;
          default_date_range?: string | null;
          default_currency?: string | null;
        };
        Relationships: [];
      };
      google_workspace_settings: {
        Row: {
          updated_at: string | null;
          id: string;
          user_id: string;
          auto_sync: boolean | null;
          created_at: string | null;
          sheet_name: string | null;
          spreadsheet_id: string | null;
        };
        Insert: {
          updated_at?: string | null;
          id?: string;
          user_id: string;
          auto_sync?: boolean | null;
          created_at?: string | null;
          sheet_name?: string | null;
          spreadsheet_id?: string | null;
        };
        Update: {
          updated_at?: string | null;
          id?: string;
          user_id?: string;
          auto_sync?: boolean | null;
          created_at?: string | null;
          sheet_name?: string | null;
          spreadsheet_id?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          is_suspended: boolean | null;
          email: string;
          first_name: string | null;
          last_name: string | null;
          company_name: string | null;
          avatar_url: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          is_suspended?: boolean | null;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          company_name?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          is_suspended?: boolean | null;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          company_name?: string | null;
          avatar_url?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
