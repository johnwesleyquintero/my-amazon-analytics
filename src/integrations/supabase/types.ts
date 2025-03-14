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
          account_id: string | null
          acos: number | null
          ad_group_name: string | null
          advertised_asin: string | null
          advertised_product_category: string | null
          advertised_sku: string | null
          amount_spent: number | null
          campaign_name: string | null
          clicks: number | null
          created_at: string | null
          date: string | null
          id: string
          impressions: number | null
          keyword: string | null
          marketplace: string | null
          search_term: string | null
          total_ad_orders: number | null
          total_ad_sales: number | null
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          acos?: number | null
          ad_group_name?: string | null
          advertised_asin?: string | null
          advertised_product_category?: string | null
          advertised_sku?: string | null
          amount_spent?: number | null
          campaign_name?: string | null
          clicks?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          impressions?: number | null
          keyword?: string | null
          marketplace?: string | null
          search_term?: string | null
          total_ad_orders?: number | null
          total_ad_sales?: number | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          acos?: number | null
          ad_group_name?: string | null
          advertised_asin?: string | null
          advertised_product_category?: string | null
          advertised_sku?: string | null
          amount_spent?: number | null
          campaign_name?: string | null
          clicks?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          impressions?: number | null
          keyword?: string | null
          marketplace?: string | null
          search_term?: string | null
          total_ad_orders?: number | null
          total_ad_sales?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string | null
          id: string
          key_type: string
          key_value: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key_type: string
          key_value: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key_type?: string
          key_value?: string
          user_id?: string
        }
        Relationships: []
      }
      Chat: {
        Row: {
          createdAt: string
          id: string
          title: string
          userId: string
          visibility: string
        }
        Insert: {
          createdAt: string
          id?: string
          title: string
          userId: string
          visibility?: string
        }
        Update: {
          createdAt?: string
          id?: string
          title?: string
          userId?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "Chat_userId_User_id_fk"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      configurations: {
        Row: {
          category: string
          id: number
          value: string
          variable: string
        }
        Insert: {
          category: string
          id?: never
          value: string
          variable: string
        }
        Update: {
          category?: string
          id?: never
          value?: string
          variable?: string
        }
        Relationships: []
      }
      dashboard_settings: {
        Row: {
          created_at: string
          default_currency: string | null
          default_date_range: string | null
          default_view: string
          id: string
          notification_preferences: Json | null
          show_welcome_message: boolean
          theme: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          default_currency?: string | null
          default_date_range?: string | null
          default_view?: string
          id?: string
          notification_preferences?: Json | null
          show_welcome_message?: boolean
          theme?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          default_currency?: string | null
          default_date_range?: string | null
          default_view?: string
          id?: string
          notification_preferences?: Json | null
          show_welcome_message?: boolean
          theme?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      Document: {
        Row: {
          content: string | null
          createdAt: string
          id: string
          text: string
          title: string
          userId: string
        }
        Insert: {
          content?: string | null
          createdAt: string
          id?: string
          text?: string
          title: string
          userId: string
        }
        Update: {
          content?: string | null
          createdAt?: string
          id?: string
          text?: string
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Document_userId_User_id_fk"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
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
      Message: {
        Row: {
          chatId: string
          content: Json
          createdAt: string
          id: string
          role: string
        }
        Insert: {
          chatId: string
          content: Json
          createdAt: string
          id?: string
          role: string
        }
        Update: {
          chatId?: string
          content?: Json
          createdAt?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "Message_chatId_Chat_id_fk"
            columns: ["chatId"]
            isOneToOne: false
            referencedRelation: "Chat"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          completed_tasks: number
          created_at: string
          id: string
          milestone_id: string
          name: string
          status: string
          target_date: string
          total_tasks: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_tasks?: number
          created_at?: string
          id?: string
          milestone_id?: string
          name: string
          status: string
          target_date: string
          total_tasks?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_tasks?: number
          created_at?: string
          id?: string
          milestone_id?: string
          name?: string
          status?: string
          target_date?: string
          total_tasks?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          inventory: number
          name: string
          price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          inventory?: number
          name: string
          price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          inventory?: number
          name?: string
          price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          is_suspended: boolean | null
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          is_suspended?: boolean | null
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          is_suspended?: boolean | null
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_metrics: {
        Row: {
          assignee: string
          created_at: string
          dependencies: string[] | null
          documentation_link: string | null
          id: string
          last_updated: string
          progress_percent: number
          status: string
          task_id: string
          task_name: string
          user_id: string
        }
        Insert: {
          assignee: string
          created_at?: string
          dependencies?: string[] | null
          documentation_link?: string | null
          id?: string
          last_updated?: string
          progress_percent: number
          status: string
          task_id?: string
          task_name: string
          user_id: string
        }
        Update: {
          assignee?: string
          created_at?: string
          dependencies?: string[] | null
          documentation_link?: string | null
          id?: string
          last_updated?: string
          progress_percent?: number
          status?: string
          task_id?: string
          task_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      Suggestion: {
        Row: {
          createdAt: string
          description: string | null
          documentCreatedAt: string
          documentId: string
          id: string
          isResolved: boolean
          originalText: string
          suggestedText: string
          userId: string
        }
        Insert: {
          createdAt: string
          description?: string | null
          documentCreatedAt: string
          documentId: string
          id?: string
          isResolved?: boolean
          originalText: string
          suggestedText: string
          userId: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          documentCreatedAt?: string
          documentId?: string
          id?: string
          isResolved?: boolean
          originalText?: string
          suggestedText?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Suggestion_documentId_documentCreatedAt_Document_id_createdAt_f"
            columns: ["documentId", "documentCreatedAt"]
            isOneToOne: false
            referencedRelation: "Document"
            referencedColumns: ["id", "createdAt"]
          },
          {
            foreignKeyName: "Suggestion_userId_User_id_fk"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          email: string
          id: string
          password: string | null
        }
        Insert: {
          email: string
          id?: string
          password?: string | null
        }
        Update: {
          email?: string
          id?: string
          password?: string | null
        }
        Relationships: []
      }
      Vote: {
        Row: {
          chatId: string
          isUpvoted: boolean
          messageId: string
        }
        Insert: {
          chatId: string
          isUpvoted: boolean
          messageId: string
        }
        Update: {
          chatId?: string
          isUpvoted?: boolean
          messageId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Vote_chatId_Chat_id_fk"
            columns: ["chatId"]
            isOneToOne: false
            referencedRelation: "Chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Vote_messageId_Message_id_fk"
            columns: ["messageId"]
            isOneToOne: false
            referencedRelation: "Message"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
