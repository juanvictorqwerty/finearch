import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    const { email, password, full_name, adminCode } = await req.json();

    const role = adminCode ? "admin" : "user";

    // 🔐 Admin validation
    if (role === "admin" && adminCode !== process.env.ADMIN_SIGNUP_SECRET) {
        return NextResponse.json(
        { error: "Invalid admin code" },
        { status: 403 }
        );
    }

    // 1️⃣ Create auth user
    const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        });

    if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;

    // 2️⃣ Insert profile
    const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        email,
        full_name,
        role,
    });

    if (profileError) {
        // 🔥 rollback auth user
        await supabase.auth.admin.deleteUser(userId);

        return NextResponse.json(
        { error: profileError.message },
        { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
}
