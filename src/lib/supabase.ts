import { createClient } from '@supabase/supabase-js';

// Kredensial Asli & Valid dari Proyek Tarumaya Leather Kamu
const SUPABASE_URL_ASLI = 'https://rsixdyrhffxjqnrexltf.supabase.co';
const SUPABASE_ANON_KEY_ASLI = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzaXhkeXJoZmZ4anFucmV4bHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5Mzk1NTksImV4cCI6MjA5NDUxNTU1OX0.uyflBhYEn6_-DrJUeev-3f033pBMb6UbXE1S2vyD5VE';

// Membaca dari environment variable, jika kosong otomatis menggunakan cadangan asli di atas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL_ASLI;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY_ASLI;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);