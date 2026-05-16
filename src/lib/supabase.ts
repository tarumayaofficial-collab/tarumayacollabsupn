import { createClient } from '@supabase/supabase-js';

// Menggunakan globalThis untuk menghindari error 'process' di editor VS Code Anda
const env = (globalThis as any).process?.env || {};

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || 'https://rsixdyrhffxjqnrexltf.supabase.co';
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_kl7kEOTULfXApSslhjHjKg_BI4omEpU';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Kunci Supabase belum dikonfigurasi dengan benar.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);