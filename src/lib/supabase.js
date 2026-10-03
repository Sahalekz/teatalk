import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://wctcfhuihpebcjgqjnyl.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjdGNmaHVpaHBlYmNqZ3FqbnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5NzczNzcsImV4cCI6MjEwNjU1MzM3N30.7Fqx3SdkherY5wUcjkEgrcoPjOy9yJ9VDRosjVbSUMU';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = () => !!supabase;
