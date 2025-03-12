export interface APIKey {
  id: string;
  user_id: string;
  key_type: string;
  key_value: string;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
  company_name: string;
  created_at: string;
  updated_at: string;
}
