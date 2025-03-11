import { createClient } from '@supabase/supabase-js';

import { Database } from './type';

const SUPABASE_URL = process.env.SUPABASE_PROJECT_URL as string;
const SUPABASE_ANON_KEY = process.env.SUPABASE_API_KEY as string;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
