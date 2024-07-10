import { redirect } from 'next/navigation';

import { createClient } from "@/utils/supabase/server";

import HomePage from '@/components/custom/HomePage';


export default async function Home() {
    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();

    if(userError || !user) {
        console.error('user fetch error: ', userError);
        return redirect('/auth/login');
    }

    // console.log(user);

    const { data: greenhouses, error: greenhousesError } = await supabase
        .from('greenhouse')
        .select()
        .eq('id_petani', user.user.id);

    if(greenhouses) {
        // console.log(greenhouses)
    } else {
        console.error('gh fetch error: ', greenhousesError);
        return redirect('/error');
    }

    return (
        <HomePage user={user} greenhouses={greenhouses} />
    )
}