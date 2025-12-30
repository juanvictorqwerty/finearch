import { createClient } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { email, password } = await request.json();

    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('role')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    if (userData.role !== 'admin' && userData.role !== 'staff') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }

    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
