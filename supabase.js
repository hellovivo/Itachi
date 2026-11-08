import { createClient } from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL, key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const configured=!!url&&!!key&&!url.includes('YOUR_PROJECT');
export const supabase=configured?createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null;
export const alias=u=>`${u.trim().toLowerCase()}@users.shinobistream.invalid`;
