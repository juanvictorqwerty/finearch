import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default async function CallbackHandler(){
    const supabase=createClient();

    const{
        data:{user},
        error,
    }=await supabase.auth.getUser();
    
    if (!user) redirect ("/auth/login");

    const {data:profile,error:profileError}=await supabase
        .from("user")
        .select("role")
        .eq("id",user.id)
        .single();

    if (!user) redirect ("/auth/login")

    if (profile?.role === "staff")
        redirect("/admin")
    if (profile?.role==="student")
        redirect("/")
}