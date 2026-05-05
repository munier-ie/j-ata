export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_read: boolean | null
          message: string
          phone: string | null
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_read?: boolean | null
          message: string
          phone?: string | null
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_read?: boolean | null
          message?: string
          phone?: string | null
          subject?: string
        }
        Relationships: []
      }
      farmers: {
        Row: {
          community: string
          created_at: string
          farmer_id: string
          first_name: string
          herd_size: number
          id: string
          last_name: string
          lga: string
          livestock_types: string[]
          nin: string | null
          phone: string
          status: string
          updated_at: string
          ward: string
        }
        Insert: {
          community: string
          created_at?: string
          farmer_id: string
          first_name: string
          herd_size?: number
          id?: string
          last_name: string
          lga: string
          livestock_types?: string[]
          nin?: string | null
          phone: string
          status?: string
          updated_at?: string
          ward: string
        }
        Update: {
          community?: string
          created_at?: string
          farmer_id?: string
          first_name?: string
          herd_size?: number
          id?: string
          last_name?: string
          lga?: string
          livestock_types?: string[]
          nin?: string | null
          phone?: string
          status?: string
          updated_at?: string
          ward?: string
        }
        Relationships: []
      }
      management_members: {
        Row: {
          id: string
          name: string
          role: string
          image_url: string | null
          bio: string
          is_commissioner: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          image_url?: string | null
          bio: string
          is_commissioner?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          image_url?: string | null
          bio?: string
          is_commissioner?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          category: string
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ranches: {
        Row: {
          address: string | null
          budget_allocated: number | null
          budget_spent: number | null
          capacity_cattle: number | null
          completion_percentage: number | null
          created_at: string
          has_feed_facilities: boolean | null
          has_health_center: boolean | null
          has_power: boolean | null
          has_school: boolean | null
          has_veterinary_clinic: boolean | null
          has_water: boolean | null
          id: string
          latitude: number | null
          lga: string
          longitude: number | null
          name: string
          status: Database["public"]["Enums"]["facility_status"]
          total_hectares: number | null
          updated_at: string
          zone: string | null
        }
        Insert: {
          address?: string | null
          budget_allocated?: number | null
          budget_spent?: number | null
          capacity_cattle?: number | null
          completion_percentage?: number | null
          created_at?: string
          has_feed_facilities?: boolean | null
          has_health_center?: boolean | null
          has_power?: boolean | null
          has_school?: boolean | null
          has_veterinary_clinic?: boolean | null
          has_water?: boolean | null
          id?: string
          latitude?: number | null
          lga: string
          longitude?: number | null
          name: string
          status?: Database["public"]["Enums"]["facility_status"]
          total_hectares?: number | null
          updated_at?: string
          zone?: string | null
        }
        Update: {
          address?: string | null
          budget_allocated?: number | null
          budget_spent?: number | null
          capacity_cattle?: number | null
          completion_percentage?: number | null
          created_at?: string
          has_feed_facilities?: boolean | null
          has_health_center?: boolean | null
          has_power?: boolean | null
          has_school?: boolean | null
          has_veterinary_clinic?: boolean | null
          has_water?: boolean | null
          id?: string
          latitude?: number | null
          lga?: string
          longitude?: number | null
          name?: string
          status?: Database["public"]["Enums"]["facility_status"]
          total_hectares?: number | null
          updated_at?: string
          zone?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          category: string
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          is_published: boolean | null
          title: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          is_published?: boolean | null
          title: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          is_published?: boolean | null
          title?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      veterinary_clinics: {
        Row: {
          address: string | null
          budget_allocated: number | null
          budget_spent: number | null
          capacity: number | null
          completion_percentage: number | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          facility_type: Database["public"]["Enums"]["facility_type"]
          has_power: boolean | null
          has_water: boolean | null
          id: string
          latitude: number | null
          lga: string
          longitude: number | null
          name: string
          services: string[] | null
          status: Database["public"]["Enums"]["facility_status"]
          updated_at: string
          zone: string | null
        }
        Insert: {
          address?: string | null
          budget_allocated?: number | null
          budget_spent?: number | null
          capacity?: number | null
          completion_percentage?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          facility_type: Database["public"]["Enums"]["facility_type"]
          has_power?: boolean | null
          has_water?: boolean | null
          id?: string
          latitude?: number | null
          lga: string
          longitude?: number | null
          name: string
          services?: string[] | null
          status?: Database["public"]["Enums"]["facility_status"]
          updated_at?: string
          zone?: string | null
        }
        Update: {
          address?: string | null
          budget_allocated?: number | null
          budget_spent?: number | null
          capacity?: number | null
          completion_percentage?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          facility_type?: Database["public"]["Enums"]["facility_type"]
          has_power?: boolean | null
          has_water?: boolean | null
          id?: string
          latitude?: number | null
          lga?: string
          longitude?: number | null
          name?: string
          services?: string[] | null
          status?: Database["public"]["Enums"]["facility_status"]
          updated_at?: string
          zone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      facility_status:
        | "planned"
        | "under_construction"
        | "operational"
        | "rehabilitated"
      facility_type:
        | "lga_clinic"
        | "zonal_clinic"
        | "central_referral"
        | "ranch"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      facility_status: [
        "planned",
        "under_construction",
        "operational",
        "rehabilitated",
      ],
      facility_type: [
        "lga_clinic",
        "zonal_clinic",
        "central_referral",
        "ranch",
      ],
    },
  },
} as const
