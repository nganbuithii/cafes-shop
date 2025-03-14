// src\app\api\auth\login\route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/config/supabaseClient";
import { LoginFormData } from "@/validation/auth";

export async function POST(req: Request) {
    try {
        const body: LoginFormData = await req.json();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: body.email,
            password: body.password,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ user: data.user, session: data.session });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
