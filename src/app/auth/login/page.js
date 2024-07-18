'use client';

import { useState } from 'react';

import Link from 'next/link';

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import { login } from '@/utils/supabase/auth';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { ReloadIcon } from '@radix-ui/react-icons';

const formSchema = z.object({
    email: z.string().email().min(1, { message: 'Email tidak boleh kosong' }),
    password: z.string().min(6, { message: 'Password minimal terdiri dari 6 karakter' })
})

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleLogin = async (data) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);

        await login(formData);
        setIsLoading(false);
    }

    return (
        <>
            <div className="flex flex-col gap-y-2">
                <h1 className="text-4xl font-bold max-w-1/2">Selamat Datang Kembali!</h1>
                <p className="text-slate-400">Silahkan masuk akun anda untuk mengakses fitur aplikasi Replon</p>
            </div>

            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ketikkan email anda (cth: replon@gmail.com)" {...field} type="email"/>
                                </FormControl>
                                <FormDescription>
                                    Email wajib diisi
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kata sandi</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ketikkan password anda" {...field} type="password"/>
                                </FormControl>
                                <FormDescription>
                                    Sandi terdiri dari minimal 6 huruf, wajib diisi.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading ? (
                        <>
                            Mohon tunggu &emsp; <ReloadIcon className="animate-spin" /> 
                        </>
                    ) : (
                        'Masuk Akun'
                    )}
                    </Button>
                </form>
            </Form>

            <Link href={'/auth/register'} className="text-slate-700 text-center">Belum mempunyai akun? <span className="font-bold text-primary">Buat akun disini</span></Link>
        </>
    )
}

export default Login;