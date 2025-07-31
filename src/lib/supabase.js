import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dwndlxjomryejopkicnj.supabase.co'
const supabaseKey = 'your-public-supabase-key'

export const supabase = createClient(supabaseUrl, supabaseKey)