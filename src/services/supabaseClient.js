import { createClient } from '@supabase/supabase-js';

const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZ2NnYnpodnNlaGR0dmNtemVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ5NzcwMjQsImV4cCI6MjAxMDU1MzAyNH0.-n8Wp4dm87sIQ3GAiHEk88P0BXT56kF3SYStjUJvOt0';
export const supabaseUrl = 'https://kngcgbzhvsehdtvcmzec.supabase.co';
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
