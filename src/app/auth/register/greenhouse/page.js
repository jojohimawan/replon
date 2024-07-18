'use client';

import Link from 'next/link';

import { useForm, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

import { getUser } from '@/utils/supabase/auth';
import { insertGreenhouse } from '@/utils/supabase/queries';

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

import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';

const greenhouseSchema = z.object({
    nama_gh: z.string().min(1, { message: 'Nama greenhouse tidak boleh kosong' }),
    lokasi: z.string().min(1, { message: 'Alamat greenhouse tidak boleh kosong' })
});

const formSchema = z.object({
    greenhouses: z.array(greenhouseSchema)
});

const Greenhouse = () => {
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            greenhouses: [{ nama_gh: 'Greenhouse Satu', lokasi: 'Blitar' }]  // Initial field count set to 1
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'greenhouses'
    });

    const onSubmit = async (data) => {
        const userId = await getUser();

        const greenhousesData = data.greenhouses.map(greenhouse => ({
            ...greenhouse,
            id_petani: userId.user.id
        }));

        await insertGreenhouse(greenhousesData);
    }

    return (
        <>
            <div className='flex flex-col justify-between gap-y-5'>
                <Form {...control}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mb-6">
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <h3 className='text-xl font-bold'>Data Greenhouse {index + 1}</h3>
                                <FormField
                                    control={control}
                                    name={`greenhouses.${index}.nama_gh`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Greenhouse</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama greenhouse anda" {...field} type="text" />
                                            </FormControl>
                                            <FormDescription>
                                                Nama greenhouse akan digunakan sebagai pengenal.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`greenhouses.${index}.lokasi`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alamat Greenhouse</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Alamat greenhouse anda (cth: Kesamben, Blitar)" {...field} type="text" />
                                            </FormControl>
                                            <FormDescription>
                                                Lokasi greenhouse anda.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {fields.length > 1 && (
                                    <Button variant='destructive' className='mt-2' onClick={() => remove(index)}>
                                        <MinusIcon /> &emsp;Kurangi Greenhouse
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            variant='outline'
                            className='w-full mt-4'
                            onClick={() => append({ nama_gh: '', lokasi: '' })}
                        >
                            <PlusIcon /> &emsp;Tambah Greenhouse
                        </Button>
                        <Button type="submit" className="w-full mt-4">Daftar Akun</Button>
                    </form>
                </Form>

                <span className='text-center leading-7'>Sudah mempunyai akun? <Link href='/auth/login' className='font-bold text-primary'>Masuk disini</Link></span>
            </div>
        </>
    )
}

export default Greenhouse;