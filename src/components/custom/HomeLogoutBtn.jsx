'use client';

import { useState } from "react";

import { logout } from "@/utils/supabase/auth";

import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";

export function HomeLogoutBtn() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogout() {
        setIsLoading(true);
        await logout();
        setIsLoading(false);
    }

    return(
        <>
            <Button disabled={isLoading} variant="destructive" size="sm" onClick={() => handleLogout()}>
            {isLoading ? (
                <>
                    Mohon tunggu &emsp; <ReloadIcon className="animate-spin" /> 
                </>
            ) : (
                'Keluar'
            )}
            </Button> 
        </>
    )
}