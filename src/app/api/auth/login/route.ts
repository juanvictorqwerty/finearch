import { NextRequest, NextResponse } from 'next/server';

// Handle GET requests to the login endpoint
export async function GET(request: NextRequest) {
    // Get email and password from query parameters
    const email = request.nextUrl.searchParams.get('email');
    const password = request.nextUrl.searchParams.get('password');

    // Log the credentials (for debugging purposes)
    console.log('Login attempt:', { email, password });

    // Always respond with success
    return NextResponse.json({
        success: true,
        message: 'yes'
    });
}
