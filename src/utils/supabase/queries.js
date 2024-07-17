'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function insertGreenhouse(greenhouses) {
    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser()

    if(userError) {
        console.error('[AUTH] error insert greenhouse: ', userError);
        return redirect('/error');
    }

    const greenhouseData = greenhouses.map(greenhouse => ({
        ...greenhouse,
        id_petani: user.user.id
    }));

    const { data, error } = await supabase
        .from('greenhouse')
        .insert(greenhouseData);

    if(error) {
        console.error('[PG] error insert greenhouse: ', error);
        return redirect('/error');
    }

    revalidatePath('/');
    redirect('/home');
}

export async function insertEventPenyakit(penyakits) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('event_penyakit')
        .insert(penyakits);

    if(error) {
        throw new Error(error.message);
    }

    console.log(data);

    revalidatePath('/home', 'layout');
    redirect('/home');
}

export async function insertPanen(panens) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('panen')
        .insert(panens);

    if(error) {
        throw new Error(error.message);
    }

    console.log(data);

    revalidatePath('/home', 'layout');
    redirect('/home');
}

export async function insertTanam(tanams) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('tanam')
        .insert(tanams);

    if(error) {
        throw new Error(error.message);
    }

    console.log(data);

    revalidatePath('/home', 'layout');
    redirect('/home');
}

export async function fethGreenhouseByUserId(userId) {
    const supabase = createClient();
    const { data: greenhouses, error: greenhousesError } = await supabase
        .from('greenhouse')
        .select()
        .eq('id_petani', userId);
    
    if(greenhousesError || !greenhouses) {
        console.error('gh fetch error: ', greenhousesError);
        return;
    }

    return greenhouses;
}

export async function fetchGreenhouseById(greenhouseId) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('greenhouse')
        .select('*')
        .eq('id', greenhouseId)
        .single();

    if(error) {
        throw new Error(error.message);
    }

    console.log(data);

    return data;
}

export async function fetchTanamAndVarietasByGreenhouseId(greenhouseId) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('tanam')
        .select(`
            *,
            varietas (nama_varietas)    
        `)
        .eq('id_gh', greenhouseId);

    if(error) {
        throw new Error(error.message);
    }

    console.log(data);

    return data;
}

export async function fetchPanenAndVarietasByGreenhouseId(greenhouseId) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('panen')
        .select(`
            *,
            varietas (nama_varietas)    
        `)
        .eq('id_gh', greenhouseId);

    if(error) {
        throw new Error(error.message);
    }

    console.log(data);

    return data;
}

export async function fetchEventAndPenyakitByGreenhouseId(greenhouseId) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('event_penyakit')
        .select(`
            *,
            penyakit (nama_penyakit)    
        `)
        .eq('id_gh', greenhouseId);

    if(error) {
        throw new Error(error.message);
    }

    console.log(data);

    return data;
}