import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Handle POST requests to the signup endpoint
export async function POST(request: NextRequest) {
    try {
        //define the admin client
        const supabase = createAdminClient();
        // Ensure the request is JSON
        const contentType = request.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            return NextResponse.json({ success: false, message: 'Expected application/json' }, { status: 415 });
        }

        // Parse the JSON body from the request
        const body = await request.json();
        const email = body?.email?.toString().trim();
        const password = body?.password?.toString();
        const username = body?.username?.toString().trim();
        const acceptTerms = body?.acceptTerms;

        // Validate required fields
        if (!email || !password || !username) {
            return NextResponse.json({ success: false, message: 'email, password and username are required' }, { status: 400 });
        }

        if (acceptTerms !== true) {
            return NextResponse.json({ success: false, message: 'accept terms and conditions' }, { status: 400 });
        }
        
        if (password.length < 8) {
            return NextResponse.json({ success: false, message: 'password must be at least 8 characters' }, { status: 400 });
        }


        // Log the credentials (avoid logging passwords in production)
        console.log('Signup attempt:', { email, username });
        
        // 1) Create auth user using admin API so we can rollback on failures
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { username }
        });

        if (authError || !authData?.user?.id) {
            console.error('Supabase admin.createUser error:', authError);
            return NextResponse.json({ success: false, message: authError?.message || 'failed to create user' }, { status: 400 });
        }

        const userId = authData.user.id;

        // 2) Insert into `user` table (application profile)
        const { error: insertError } = await supabase.from('user').insert({
            id: userId,
            email,
            name: username,
            role: 'student'
        });

        if (insertError) {
            // Rollback: delete the auth user
            console.error('Failed to insert profile, rolling back user creation:', insertError);
            await supabase.auth.admin.deleteUser(userId);
            return NextResponse.json({ success: false, message: insertError.message }, { status: 400 });
        }

        // Success
        return NextResponse.json({ success: true, userId });
    } catch (err) {
        console.error('Signup error:', err);
        return NextResponse.json({ success: false, message: 'invalid request' }, { status: 400 });
    }
}
