'use client';

import { useState } from "react";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import { register } from "@/utils/supabase/auth";

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

import { ReloadIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
    name: z.string(),
    email: z.string().email().min(1, { message: 'Email tidak boleh kosong' }),
    password: z.string().min(6, { message: 'Password harus terdiri dari 6 huruf' })
})

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "Petani Replon",
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);

        await register(formData);
        setIsLoading(false);
    }

    return (
        <>
            <h3 className='text-xl font-bold'>Data Petani</h3>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ketikkan nama anda" {...field} type="text"/>
                                </FormControl>
                                <FormDescription>
                                    Nama akan ditampilkan pada halaman beranda anda.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                    Email digunakan sebagai kredensial login.
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
                                    <div className="flex space-x-1">
                                        <Input placeholder="Ketikkan password anda" {...field} type={showPassword ? "text" : "password"}/>
                                        <Button 
                                            size='icon' 
                                            variant='ghost' 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowPassword(!showPassword);
                                            }}
                                        >
                                            {showPassword ? <EyeOpenIcon/> : <EyeClosedIcon/>}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Sandi terdiri dari minimal 6 huruf, digunakan sebagai kredensial login.
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
                        'Daftar Akun'
                    )}
                    </Button>
                </form>
            </Form>

            <Link href={'/auth/login'} className="text-slate-700 text-center">Sudah mempunyai akun? <span className="font-bold text-primary">Login disini</span></Link>
        </>
    )
}

export default Register;