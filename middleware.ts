import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log("MIDDLEWARE RUNNING ON:", request.nextUrl.pathname);
  // 1. Initialize the response object
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Create the Supabase client specifically for Middleware
  // Using the new getAll/setAll pattern (replaces deprecated get/set/remove)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Sync cookies to the request so the server can see them immediately
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          
          // Create a new response to apply the updated cookies
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          
          // Set the cookies on the outgoing response so the browser saves them
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Authenticate the user safely
  // IMPORTANT: Use getUser(), not getSession(), for security as it re-verifies with Supabase
  const { data: { user } } = await supabase.auth.getUser()

  // 4. PROTECTION LOGIC for '/admin' routes
  // Check for exactly /admin or /admin/ to avoid partial matches like /admin-dashboard
  // Use toLowerCase() to handle case sensitivity (e.g., /Admin vs /admin)
  if (request.nextUrl.pathname.toLowerCase() === '/admin' || request.nextUrl.pathname.toLowerCase().startsWith('/admin/')) {
    
    // GATE 1: Is the user even logged in?
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // GATE 2: Check the database for the 'staff' role
    // This is the "Truth" check. Even if a user hacks their browser token, 
    // the database check on the server will catch them.
    const { data: userData, error } = await supabase
      .from('user')
      .select('role')
      .eq('id', user.id)
      .single()

    // If there is an error or the role isn't 'staff', kick them to the homepage
    // (Note: In your previous code you checked for 'admin', ensure this matches your DB value)
    
      if (!userData || userData.role !== 'staff') {
      console.log("Access denied for role:", userData?.role);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response
}

// 5. Matcher configuration
// This ensures the middleware only runs on sensitive routes to save performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}