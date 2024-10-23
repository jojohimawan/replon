import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => 
    createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY
    );

export const createDashboard = () =>
    createBrowserClient(
        process.env.NEXT_PUBLIC_DASHBOARD_URL,
        process.env.NEXT_DASHBOARD_ANON_KEY
    );