'use server';

import { createClient } from "@/utils/supabase/server";

export async function funCountVarietasInGreenhouse(greenhouseId) {
    const supabase = createClient();
    const { data, error } = await supabase.rpc('count_varietas_in_greenhouse', { greenhouse_id: greenhouseId });

    if(error) {
        throw new Error(error.message);
    }

    console.log(data);

    return data;
}

export async function funCountPanenInGreenhouse(greenhouseId) {
    const supabase = createClient();
    const { data, error } = await supabase.rpc('count_varpanen_in_greenhouse', { greenhouse_id: greenhouseId });

    if(error) {
        throw new Error(error.message);
    }

    console.log(data);

    return data;
}

export async function funCountPenyakitInGreenhouse(greenhouseId) {
    const supabase = createClient();
    const { data, error } = await supabase.rpc('count_penyakit_in_greenhouse', { greenhouse_id: greenhouseId });

    if(error) {
        throw new Error(error.message);
    }

    console.log(data);

    return data;
}