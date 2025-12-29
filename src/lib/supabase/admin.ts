import { createClient } from '@supabase/supabase-js'

// IMPORTANT: Never expose this client to the browser. It has admin privileges.
export function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
        throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
    }

    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseSecretKey) {
        throw new Error("Missing Supabase secret key. Please set SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY in your .env.local file");
    }

    return createClient(
        supabaseUrl,
        supabaseSecretKey,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false
            }
        }
    );
}
