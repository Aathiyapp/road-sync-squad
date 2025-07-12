export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          bonuses_enabled: boolean | null
          id: string
          jackpot_trigger: number | null
          max_bet: number | null
          min_bet: number | null
          rtp_percentage: number | null
          updated_at: string | null
          volatility: string | null
        }
        Insert: {
          bonuses_enabled?: boolean | null
          id?: string
          jackpot_trigger?: number | null
          max_bet?: number | null
          min_bet?: number | null
          rtp_percentage?: number | null
          updated_at?: string | null
          volatility?: string | null
        }
        Update: {
          bonuses_enabled?: boolean | null
          id?: string
          jackpot_trigger?: number | null
          max_bet?: number | null
          min_bet?: number | null
          rtp_percentage?: number | null
          updated_at?: string | null
          volatility?: string | null
        }
        Relationships: []
      }
      bets: {
        Row: {
          amount: number
          auto_cashout_multiplier: number | null
          cashout_multiplier: number | null
          cashout_time: string | null
          created_at: string | null
          id: string
          is_winner: boolean | null
          payout: number | null
          round_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          amount: number
          auto_cashout_multiplier?: number | null
          cashout_multiplier?: number | null
          cashout_time?: string | null
          created_at?: string | null
          id?: string
          is_winner?: boolean | null
          payout?: number | null
          round_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          auto_cashout_multiplier?: number | null
          cashout_multiplier?: number | null
          cashout_time?: string | null
          created_at?: string | null
          id?: string
          is_winner?: boolean | null
          payout?: number | null
          round_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bets_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_user_id_fkey"
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
          balance: number | null
          created_at: string | null
          id: string
          referral_code: string | null
          referred_by: string | null
          total_bets: number | null
          total_profit: number | null
          updated_at: string | null
          username: string | null
          win_ratio: number | null
        }
        Insert: {
          avatar_url?: string | null
          balance?: number | null
          created_at?: string | null
          id: string
          referral_code?: string | null
          referred_by?: string | null
          total_bets?: number | null
          total_profit?: number | null
          updated_at?: string | null
          username?: string | null
          win_ratio?: number | null
        }
        Update: {
          avatar_url?: string | null
          balance?: number | null
          created_at?: string | null
          id?: string
          referral_code?: string | null
          referred_by?: string | null
          total_bets?: number | null
          total_profit?: number | null
          updated_at?: string | null
          username?: string | null
          win_ratio?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          clicks: number | null
          created_at: string | null
          deposits: number | null
          earnings: number | null
          id: string
          referred_id: string
          referrer_id: string
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          deposits?: number | null
          earnings?: number | null
          id?: string
          referred_id: string
          referrer_id: string
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          deposits?: number | null
          earnings?: number | null
          id?: string
          referred_id?: string
          referrer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rounds: {
        Row: {
          client_seed: string | null
          crash_multiplier: number | null
          created_at: string | null
          end_time: string | null
          hash: string
          id: string
          nonce: number | null
          round_number: number
          server_seed: string
          start_time: string | null
          status: string | null
        }
        Insert: {
          client_seed?: string | null
          crash_multiplier?: number | null
          created_at?: string | null
          end_time?: string | null
          hash: string
          id?: string
          nonce?: number | null
          round_number?: number
          server_seed: string
          start_time?: string | null
          status?: string | null
        }
        Update: {
          client_seed?: string | null
          crash_multiplier?: number | null
          created_at?: string | null
          end_time?: string | null
          hash?: string
          id?: string
          nonce?: number | null
          round_number?: number
          server_seed?: string
          start_time?: string | null
          status?: string | null
        }
        Relationships: []
      }
      tournaments: {
        Row: {
          created_at: string | null
          current_participants: number | null
          end_time: string
          entry_fee: number
          id: string
          max_participants: number | null
          name: string
          prize_pool: number | null
          start_time: string
          status: string | null
          winners: Json | null
        }
        Insert: {
          created_at?: string | null
          current_participants?: number | null
          end_time: string
          entry_fee: number
          id?: string
          max_participants?: number | null
          name: string
          prize_pool?: number | null
          start_time: string
          status?: string | null
          winners?: Json | null
        }
        Update: {
          created_at?: string | null
          current_participants?: number | null
          end_time?: string
          entry_fee?: number
          id?: string
          max_participants?: number | null
          name?: string
          prize_pool?: number | null
          start_time?: string
          status?: string | null
          winners?: Json | null
        }
        Relationships: []
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
    Enums: {},
  },
} as const
