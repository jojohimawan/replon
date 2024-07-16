'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function login(formData) {
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if(error) {
        console.error('error login: ', error);
        redirect('/error');
    }

    revalidatePath('/');
    redirect('/home');
}

export async function getUser() {
    const { data: user, error: userError } = await supabase.auth.getUser();
    
    if(userError || !user) {
        console.error('user fetch error: ', userError);
        return redirect('/auth/login');
    }

    return user;
}

export async function register(formData) {
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        options: {
            data: {
                display_name: formData.get('name')
            }
        }
    }

    const { error } = await supabase.auth.signUp(data);

    if(error) {
        console.error('error registering: ', error);
        redirect('/error');
    }

    revalidatePath('/');
    redirect('/auth/register/greenhouse');
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if(error) {
        console.error('error logout: ', error)
        redirect('/error');
    }

    revalidatePath('/');
    redirect('/');
}