import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY,
        {
            cookies: {
                getAll() {
                    try {
                        return cookieStore.getAll();
                    } catch (error) {
                        console.error("Error getting cookies:", error);
                        return [];
                    }
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => 
                            cookieStore.set(name, value, options)
                        )
                    } catch (error) {
                        console.error("Error setting cookies:", error);
                    }
                }
            }
        }
    )
}