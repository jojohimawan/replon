'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getUser } from '@/utils/supabase/auth';
import { fethGreenhouseByUserId } from '@/utils/supabase/queries';

import HomePage from '@/components/custom/HomePage';

export default function Home() {
    const [user, setUser] = useState(null);
    const [greenhouses, setGreenhouses] = useState([]);
    const router = useRouter();

    useEffect(() => {
        (async function () {
            const user = await getUser();
            if (!user) {
                router.push('/auth/login');
                return;
            }

            setUser(user);
            const greenhouses = await fethGreenhouseByUserId(user.user.id);
            setGreenhouses(greenhouses);
        })();
    }, [router]);

    if (!user) return <div>Loading...</div>;  // Show a loading state while fetching data

    return (
        <HomePage user={user} greenhouses={greenhouses} />
    )
}