export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      amazon_ads_metrics: {
        Row: {
          acos: number | null
          ad_group_name: string | null
          amount_spent: number | null
          asin: string | null
          campaign_name: string | null
          cart_adds_1d_shipping_speed: string | null
          cart_adds_2d_shipping_speed: string | null
          cart_adds_asin_count: number | null
          cart_adds_asin_price_median: number | null
          cart_adds_asin_share: number | null
          cart_adds_price_median: number | null
          cart_adds_rate: number | null
          cart_adds_same_day_shipping_speed: string | null
          cart_adds_total_count: number | null
          click_thru_rate: number | null
          clicks: number | null
          clicks_1d_shipping_speed: string | null
          clicks_2d_shipping_speed: string | null
          clicks_asin_count: number | null
          clicks_asin_price_median: number | null
          clicks_asin_share: number | null
          clicks_price_median: number | null
          clicks_rate: number | null
          clicks_same_day_shipping_speed: string | null
          clicks_total_count: number | null
          cost_per_click: number | null
          currency: string | null
          customer_search_term: string | null
          date: string | null
          end_date: string | null
          id: number
          impressions: number | null
          impressions_asin_count: number | null
          impressions_asin_share: number | null
          impressions_total_count: number | null
          keyword: string | null
          marketplace: string | null
          match_type: string | null
          portfolio_name: string | null
          purchases_1d_shipping_speed: string | null
          purchases_2d_shipping_speed: string | null
          purchases_asin_count: number | null
          purchases_asin_price_median: number | null
          purchases_asin_share: number | null
          purchases_price_median: number | null
          purchases_rate: number | null
          purchases_same_day_shipping_speed: string | null
          purchases_total_count: number | null
          reporting_date: string | null
          search_query: string | null
          search_query_score: number | null
          search_query_volume: number | null
          search_term_impression_rank: number | null
          search_term_impression_share: number | null
          seven_day_conversion_rate: number | null
          seven_day_total_orders: number | null
          seven_day_total_sales: number | null
          spend: number | null
          start_date: string | null
          targeting: string | null
          total_acos: number | null
          total_ad_sales: number | null
          total_roas: number | null
          user_id: string | null
        }
        Insert: {
          acos?: number | null
          ad_group_name?: string | null
          amount_spent?: number | null
          asin?: string | null
          campaign_name?: string | null
          cart_adds_1d_shipping_speed?: string | null
          cart_adds_2d_shipping_speed?: string | null
          cart_adds_asin_count?: number | null
          cart_adds_asin_price_median?: number | null
          cart_adds_asin_share?: number | null
          cart_adds_price_median?: number | null
          cart_adds_rate?: number | null
          cart_adds_same_day_shipping_speed?: string | null
          cart_adds_total_count?: number | null
          click_thru_rate?: number | null
          clicks?: number | null
          clicks_1d_shipping_speed?: string | null
          clicks_2d_shipping_speed?: string | null
          clicks_asin_count?: number | null
          clicks_asin_price_median?: number | null
          clicks_asin_share?: number | null
          clicks_price_median?: number | null
          clicks_rate?: number | null
          clicks_same_day_shipping_speed?: string | null
          clicks_total_count?: number | null
          cost_per_click?: number | null
          currency?: string | null
          customer_search_term?: string | null
          date?: string | null
          end_date?: string | null
          id?: never
          impressions?: number | null
          impressions_asin_count?: number | null
          impressions_asin_share?: number | null
          impressions_total_count?: number | null
          keyword?: string | null
          marketplace?: string | null
          match_type?: string | null
          portfolio_name?: string | null
          purchases_1d_shipping_speed?: string | null
          purchases_2d_shipping_speed?: string | null
          purchases_asin_count?: number | null
          purchases_asin_price_median?: number | null
          purchases_asin_share?: number | null
          purchases_price_median?: number | null
          purchases_rate?: number | null
          purchases_same_day_shipping_speed?: string | null
          purchases_total_count?: number | null
          reporting_date?: string | null
          search_query?: string | null
          search_query_score?: number | null
          search_query_volume?: number | null
          search_term_impression_rank?: number | null
          search_term_impression_share?: number | null
          seven_day_conversion_rate?: number | null
          seven_day_total_orders?: number | null
          seven_day_total_sales?: number | null
          spend?: number | null
          start_date?: string | null
          targeting?: string | null
          total_acos?: number | null
          total_ad_sales?: number | null
          total_roas?: number | null
          user_id?: string | null
        }
        Update: {
          acos?: number | null
          ad_group_name?: string | null
          amount_spent?: number | null
          asin?: string | null
          campaign_name?: string | null
          cart_adds_1d_shipping_speed?: string | null
          cart_adds_2d_shipping_speed?: string | null
          cart_adds_asin_count?: number | null
          cart_adds_asin_price_median?: number | null
          cart_adds_asin_share?: number | null
          cart_adds_price_median?: number | null
          cart_adds_rate?: number | null
          cart_adds_same_day_shipping_speed?: string | null
          cart_adds_total_count?: number | null
          click_thru_rate?: number | null
          clicks?: number | null
          clicks_1d_shipping_speed?: string | null
          clicks_2d_shipping_speed?: string | null
          clicks_asin_count?: number | null
          clicks_asin_price_median?: number | null
          clicks_asin_share?: number | null
          clicks_price_median?: number | null
          clicks_rate?: number | null
          clicks_same_day_shipping_speed?: string | null
          clicks_total_count?: number | null
          cost_per_click?: number | null
          currency?: string | null
          customer_search_term?: string | null
          date?: string | null
          end_date?: string | null
          id?: never
          impressions?: number | null
          impressions_asin_count?: number | null
          impressions_asin_share?: number | null
          impressions_total_count?: number | null
          keyword?: string | null
          marketplace?: string | null
          match_type?: string | null
          portfolio_name?: string | null
          purchases_1d_shipping_speed?: string | null
          purchases_2d_shipping_speed?: string | null
          purchases_asin_count?: number | null
          purchases_asin_price_median?: number | null
          purchases_asin_share?: number | null
          purchases_price_median?: number | null
          purchases_rate?: number | null
          purchases_same_day_shipping_speed?: string | null
          purchases_total_count?: number | null
          reporting_date?: string | null
          search_query?: string | null
          search_query_score?: number | null
          search_query_volume?: number | null
          search_term_impression_rank?: number | null
          search_term_impression_share?: number | null
          seven_day_conversion_rate?: number | null
          seven_day_total_orders?: number | null
          seven_day_total_sales?: number | null
          spend?: number | null
          start_date?: string | null
          targeting?: string | null
          total_acos?: number | null
          total_ad_sales?: number | null
          total_roas?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string
          id: string
          key_type: string
          key_value: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          key_type: string
          key_value: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          key_type?: string
          key_value?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      "auth.users": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      cities: {
        Row: {
          country_id: number
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          country_id: number
          created_at?: string
          id?: never
          name: string
          updated_at?: string
        }
        Update: {
          country_id?: number
          created_at?: string
          id?: never
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_country"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: never
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: never
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      dashboard_settings: {
        Row: {
          created_at: string | null
          default_currency: string
          default_date_range: string
          id: string
          notification_preferences: Json
          theme: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          default_currency?: string
          default_date_range?: string
          id?: string
          notification_preferences?: Json
          theme?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          default_currency?: string
          default_date_range?: string
          id?: string
          notification_preferences?: Json
          theme?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      google_workspace_settings: {
        Row: {
          auto_sync: boolean | null
          created_at: string | null
          id: string
          sheet_name: string | null
          spreadsheet_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_sync?: boolean | null
          created_at?: string | null
          id?: string
          sheet_name?: string | null
          spreadsheet_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_sync?: boolean | null
          created_at?: string | null
          id?: string
          sheet_name?: string | null
          spreadsheet_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_2fa: {
        Row: {
          backup_codes: string[] | null
          id: number
          is_enabled: boolean | null
          secret: string | null
          user_id: string
        }
        Insert: {
          backup_codes?: string[] | null
          id?: never
          is_enabled?: boolean | null
          secret?: string | null
          user_id: string
        }
        Update: {
          backup_codes?: string[] | null
          id?: never
          is_enabled?: boolean | null
          secret?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          activity_timestamp: string | null
          activity_type: string
          details: Json | null
          id: number
          user_id: string
        }
        Insert: {
          activity_timestamp?: string | null
          activity_type: string
          details?: Json | null
          id?: never
          user_id: string
        }
        Update: {
          activity_timestamp?: string | null
          activity_type?: string
          details?: Json | null
          id?: never
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: number
          session_token: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: never
          session_token: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: never
          session_token?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_metrics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
