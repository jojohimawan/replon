'use client';

import { logout } from "@/utils/supabase/auth";

import { Button } from "../ui/button";

export function HomeLogoutBtn() {
    return(
        <>
            <Button variant="destructive" size="sm" onClick={async () => await logout()}>Keluar</Button> 
        </>
    )
}