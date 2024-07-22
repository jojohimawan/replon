'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getUser } from '@/utils/supabase/auth';

import HomePage from '@/components/custom/HomePage';
import { LoadingUI } from '@/components/custom/LoadingUI';

export default function Home() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        (async function () {
            const user = await getUser();
            if (!user) {
                router.push('/auth/login');
                return;
            }

            setUser(user);
        })();
    }, [router]);

    if (!user) return (
       <LoadingUI />
    )  // Show a loading state while fetching data

    return (
        <HomePage user={user}/>
    )
}