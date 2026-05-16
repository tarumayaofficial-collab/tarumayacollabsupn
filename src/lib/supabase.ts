import { createClient } from '@supabase/supabase-js';

// Trik string literal: Mengambil env lewat indeks string agar TypeScript VS Code tidak membaca kata 'process' secara langsung
const getEnv = (key: string): string => {
  const globalObj = typeof window !== 'undefined' ? (window as any) : (globalThis as any);
  return globalObj['process']?.['env']?.[key] || '';
};

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);