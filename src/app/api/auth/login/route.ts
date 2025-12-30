import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        const cookieStore = await cookies(); // In modern Next.js, cookies() is async

        // 1. Create the modernized Server Client
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            );
                        } catch {
                            // The `setAll` method was called from a Server Component.
                            // This can be ignored if you have middleware refreshing
                            // user sessions.
                        }
                    },
                },
            }
        );

        // 2. Perform the sign in (This sets the cookies automatically via setAll)
        const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) {
            return NextResponse.json({ success: false, message: signInError.message }, { status: 401 });
        }

        if (user) {
            // 3. Check the role in your 'user' table
            const { data: userData, error: userError } = await supabase
                .from('user')
                .select('role')
                .eq('id', user.id)
                .single();

            if (userError || !userData) {
                return NextResponse.json({ success: false, message: 'Profile not found' }, { status: 404 });
            }

            // 4. Return the role so the frontend can redirect to the correct dashboard
            if (userData.role === 'staff') {
                return NextResponse.json({ 
                    success: true, 
                    role: userData.role, 
                    redirect: '/admin',
                    message: 'Login successful' 
                });
            }

            return NextResponse.json({ 
                success: true, 
                role: userData.role,
                message: 'Cookie stored' 
            });
        }

        return NextResponse.json({ success: false, message: 'Authentication failed' }, { status: 500 });

    } catch (err) {
        return NextResponse.json({ success: false, message: 'Invalid request', error: err}, { status: 400 });
    }
}