import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(req) {
    let supabaseResponse = NextResponse.next({
        req,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => req.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        req,
                    });
                    cookiesToSet.forEach(({ name, value, options }) => 
                        supabaseResponse.cookies.set(name, value, options)
                    );

                }
            }
        }
    );

    const { data } = await supabase.auth.getUser();

    if(!data && !req.nextUrl.pathname.endsWith('login') && !req.nextUrl.pathname.endsWith('register')) {
        const url = req.nextUrl.clone();
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}