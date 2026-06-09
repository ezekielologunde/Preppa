/**
 * Supabase schema types (hand-written to match supabase/migrations/0001).
 * Covers the tables the app currently reads/writes. Extend as new screens land.
 * (Auto-gen via `supabase gen types` once CLI/cert access is sorted.)
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type OrderStatus =
  | 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'completed' | 'cancelled';
export type MealStatus = 'draft' | 'published' | 'paused' | 'archived';
export type FulfillmentType = 'delivery' | 'pickup';

type Timestamps = { created_at: string };

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; email: string | null; phone: string | null; full_name: string | null; avatar_url: string | null; status: string } & Timestamps;
        Insert: { id: string; email?: string | null; full_name?: string | null; avatar_url?: string | null };
        Update: Partial<{ full_name: string | null; avatar_url: string | null; phone: string | null }>;
        Relationships: [];
      };
      prepper_profiles: {
        Row: { id: string; user_id: string; display_name: string; bio: string | null; verified: boolean; delivery_radius_km: number | null; specialties: string[] | null } & Timestamps;
        Insert: { user_id: string; display_name: string; bio?: string | null; specialties?: string[] | null };
        Update: Partial<{ display_name: string; bio: string | null; specialties: string[] | null }>;
        Relationships: [];
      };
      prepper_rating_summary: {
        Row: { prepper_id: string; average_rating: number; total_reviews: number; five_star: number; updated_at: string };
        Insert: { prepper_id: string; average_rating?: number; total_reviews?: number; five_star?: number };
        Update: Partial<{ average_rating: number; total_reviews: number; five_star: number }>;
        Relationships: [];
      };
      meal_categories: {
        Row: { id: number; key: string; name: string };
        Insert: { key: string; name: string };
        Update: Partial<{ key: string; name: string }>;
        Relationships: [];
      };
      meals: {
        Row: { id: string; prepper_id: string; category_id: number | null; title: string; description: string | null; base_price: number; prep_time_min: number | null; status: MealStatus } & Timestamps & { updated_at: string };
        Insert: { prepper_id: string; title: string; base_price: number; category_id?: number | null; description?: string | null; prep_time_min?: number | null; status?: MealStatus };
        Update: Partial<{ title: string; description: string | null; base_price: number; category_id: number | null; prep_time_min: number | null; status: MealStatus }>;
        Relationships: [];
      };
      meal_images: {
        Row: { id: string; meal_id: string; url: string; order_index: number; alt_text: string | null };
        Insert: { meal_id: string; url: string; order_index?: number; alt_text?: string | null };
        Update: Partial<{ url: string; order_index: number; alt_text: string | null }>;
        Relationships: [];
      };
      meal_variants: {
        Row: { id: string; meal_id: string; name: string; price_delta: number; is_default: boolean };
        Insert: { meal_id: string; name: string; price_delta?: number; is_default?: boolean };
        Update: Partial<{ name: string; price_delta: number; is_default: boolean }>;
        Relationships: [];
      };
      carts: {
        Row: { id: string; user_id: string } & Timestamps & { updated_at: string };
        Insert: { user_id: string };
        Update: Partial<{ user_id: string }>;
        Relationships: [];
      };
      cart_items: {
        Row: { id: string; cart_id: string; meal_id: string; variant_id: string | null; quantity: number; price_snapshot: number } & Timestamps;
        Insert: { cart_id: string; meal_id: string; quantity: number; price_snapshot: number; variant_id?: string | null };
        Update: Partial<{ quantity: number; variant_id: string | null }>;
        Relationships: [];
      };
      orders: {
        Row: { id: string; customer_id: string; prepper_id: string; status: OrderStatus; fulfillment_type: FulfillmentType; address_id: string | null; subtotal: number; tax: number; delivery_fee: number; service_fee: number; tip: number; total: number } & Timestamps & { updated_at: string };
        Insert: never; // created only via create_order() RPC
        Update: never; // mutated only via advance_order()/cancel_order() RPCs
        Relationships: [];
      };
      order_items: {
        Row: { id: string; order_id: string; meal_id: string; variant_id: string | null; quantity: number; unit_price: number; total: number };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      reviews: {
        Row: { id: string; order_id: string; author_id: string; prepper_id: string; meal_id: string | null; rating: number; body: string | null } & Timestamps;
        Insert: { order_id: string; author_id: string; prepper_id: string; rating: number; meal_id?: string | null; body?: string | null };
        Update: Partial<{ rating: number; body: string | null }>;
        Relationships: [];
      };
      follows: {
        Row: { id: string; follower_id: string; prepper_id: string } & Timestamps;
        Insert: { follower_id: string; prepper_id: string };
        Update: never;
        Relationships: [];
      };
      notifications: {
        Row: { id: string; user_id: string; type: string; title: string; body: string | null; data: Json | null; read: boolean } & Timestamps;
        Insert: { user_id: string; type: string; title: string; body?: string | null; data?: Json | null };
        Update: Partial<{ read: boolean }>;
        Relationships: [];
      };
      addresses: {
        Row: { id: string; user_id: string; label: string | null; line1: string; line2: string | null; city: string | null; state: string | null; postal_code: string | null; country: string | null; lat: number | null; lng: number | null; is_default: boolean } & Timestamps;
        Insert: { user_id: string; line1: string; label?: string | null; line2?: string | null; city?: string | null; state?: string | null; postal_code?: string | null; is_default?: boolean };
        Update: Partial<{ label: string | null; line1: string; line2: string | null; city: string | null; state: string | null; postal_code: string | null; is_default: boolean }>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_order: { Args: { p_address_id?: string | null; p_tip?: number }; Returns: string };
      advance_order: { Args: { p_order_id: string; p_next: OrderStatus }; Returns: undefined };
      cancel_order: { Args: { p_order_id: string }; Returns: undefined };
    };
    Enums: {
      order_status: OrderStatus;
      meal_status: MealStatus;
      fulfillment_type: FulfillmentType;
    };
    CompositeTypes: Record<string, never>;
  };
}
