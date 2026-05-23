import { createClient } from '@supabase/supabase-js'
import { ENV } from "./config";

export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_PUBLISHABLE_KEY);