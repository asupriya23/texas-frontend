import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tqmleycumtcbcdlgagdq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxbWxleWN1bXRjYmNkbGdhZ2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTY2MDAsImV4cCI6MjA1ODA3MjYwMH0.gURr9x8DdoECXwVeU0qoI_iKwH-84kfYLse8Lgy7jwA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);