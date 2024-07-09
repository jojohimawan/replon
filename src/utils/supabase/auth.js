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
        redirect('/error');
    }

    revalidatePath('/home', 'layout');
    redirect('/home');
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
        redirect('/error');
    }

    revalidatePath('/register/greenhouse', 'layout');
    redirect('/auth/register/greenhouse');
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if(error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');
}