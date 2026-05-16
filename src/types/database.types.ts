export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          price: number;
          stock: number;
          category: 'Sabuk' | 'Tas Genggam' | 'Tas Slempang' | 'Aksesoris';
          images: string[];
          created_at: string;
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          stock?: number
          category: 'Sabuk' | 'Tas Genggam' | 'Tas Slempang' | 'Aksesoris'
          images?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          stock?: number
          category?: 'Sabuk' | 'Tas Genggam' | 'Tas Slempang' | 'Aksesoris'
          images?: string[]
          created_at?: string
        }
      }
    }
  }
}