import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xuasafsmafmtfwtjgakx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YXNhZnNtYWZtdGZ3dGpnYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODEwMTAsImV4cCI6MjA5NTQ1NzAxMH0.b3kfkwlLGoa9xg1U1QsByOUkmb7ZxAvrRopCGC1e1lk';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: { params: { eventsPerSecond: 10 } }
});

export const isSupabaseReady = true;
