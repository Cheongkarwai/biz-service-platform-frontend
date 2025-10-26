export interface SupabaseUserData {
  app_metadata?: Record<string, any>;
  aud?: string | null;
  banned_until?: Date | null;
  confirmation_sent_at?: Date | null;
  confirmed_at?: Date | null;
  created_at?: Date | null;
  email?: string | null;
  email_change_sent_at?: Date | null;
  email_confirmed_at?: Date | null;
  id?: string | null;
  identities?: Identity[];
  invited_at?: Date | null;
  last_sign_in_at?: Date | null;
  new_email?: string | null;
  new_phone?: string | null;
  phone?: string | null;
  phone_change_sent_at?: Date | null;
  phone_confirmed_at?: Date | null;
  reauthentication_sent_at?: Date | null;
  recovery_sent_at?: Date | null;
  role?: string | null;
  updated_at?: Date | null;
  user_metadata?: Record<string, any>;
}

export interface Identity {
  created_at: Date | null;
  id: string | null;
  identity_data: Record<string, any>;
  last_sign_in_at: Date | null;
  provider: string | null;
  updated_at: Date | null;
  user_id: string | null;
}
