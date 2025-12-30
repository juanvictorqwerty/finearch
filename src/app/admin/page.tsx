import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Admin = async () => {
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login')
    }

    const { data: userData, error } = await supabase
        .from('user')
        .select('role')
        .eq('id', user.id)
        .single()

    if (error || !userData || userData.role !== 'staff') {
        redirect('/')
    }

    return(
        <div>
            Admin Page
        </div>
    )
}
export default Admin