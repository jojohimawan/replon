export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createClient } from "@/utils/supabase/server";

import dateLibs from "@/lib/date";

import greenhouseImage from "../../../public/greenhouse.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { HomeSection } from '@/components/section/Section';
import { Button } from '@/components/ui/button';

import { HomeLogoutBtn } from '@/components/custom/HomeLogoutBtn';

import { DrawingPinFilledIcon, BlendingModeIcon, CubeIcon, HobbyKnifeIcon, ScissorsIcon, SunIcon } from '@radix-ui/react-icons';

const Home = async () => {
    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();

    if(userError || !user) {
        redirect('/auth/login');
    }

    console.log(user);

    const { data: greenhouses, error: greenhousesError } = await supabase
        .from('greenhouse')
        .select()
        .eq('id_petani', user.user.id);

    if(greenhouses) {
        console.log(greenhouses)
    } else {
        console.log(greenhousesError);
    }

    const { getCurrentDate } = dateLibs();

    return (
        <>
            <div className='w-full h-full flex flex-col justify-between'>
                <section className="w-full flex flex-row items-center justify-between pt-2 mb-10">
                    <div className="flex flex-col gap-y-1">
                        <small className="text-sm font-medium leading-none text-slate-400">
                            {getCurrentDate()}
                        </small>
                        <div className='flex gap-x-5'>
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                Halo, <span>{user.user.user_metadata.display_name}</span> 👋
                            </h4>
                            <HomeLogoutBtn />
                        </div>
                    </div>
                    <div className="bg-green-200 p-2 rounded-full aspect-square">
                        <Avatar>
                            <AvatarImage alt="Replon" />
                            <AvatarFallback className="text-2xl">👨‍🌾</AvatarFallback>
                        </Avatar>
                    </div>
                </section>

                <section className='w-full flex flex-col gap-y-3 mb-10'>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Cuaca Hari Ini 🌄
                    </h4>

                    <Card className='w-full bg-primary'>
                        <CardContent className='flex flex-row justify-between items-center pt-6 text-white'>
                            <div className='flex flex-col h-full gap-y-2'>
                                <CardDescription className='text-sm font-light leading-none text-white'>Blitar, Jawa Timur</CardDescription>
                                <CardTitle className='scroll-m-20 text-2xl font-semibold tracking-tight '>25 C</CardTitle>
                                <CardDescription className='text-white'>Kelembapan 64%</CardDescription>
                            </div>

                            <SunIcon width={32} height={32} className='animate-bounce'/>
                        </CardContent>
                        <CardFooter className='w-full flex-col gap-y-2'>
                            <Separator />
                            <CardDescription className='w-full text-white'>Disarankan untuk melakukan penyiraman tanaman</CardDescription>
                        </CardFooter>
                    </Card>
                </section>

                <section className='w-full flex flex-col gap-y-3 mb-10'>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Fitur Utama 🍈
                    </h4>

                    <div className='w-full flex flex-row gap-x-2 justify-between items-center'>
                        <Link href="/" className='w-1/4'>
                            <Button variant='outline' className='w-full h-auto aspect-square flex-col gap-y-2 hover:bg-primary hover:scale-105 hover:text-white transition-all'>
                                <BlendingModeIcon className='' fill='#16a34a' width={20} height={20}/>
                                <h4 className="scroll-m-20 text-sm md:text-lg font-medium tracking-tight">
                                    Kontrol
                                </h4>
                            </Button>
                        </Link>
                        <Link href="/greenhouse/pilih?catat=tanam" className='w-1/4'>
                            <Button variant='outline' className='w-full h-auto aspect-square flex-col gap-y-2 hover:bg-primary hover:scale-105 hover:text-white transition-all'>
                                <HobbyKnifeIcon clascolor="#16a34a"width={20} height={20}/>
                                <h4 className="scroll-m-20 text-sm md:text-lg font-medium tracking-tight">
                                    Tanam
                                </h4>
                            </Button>
                        </Link>
                        <Link href="/greenhouse/pilih?catat=panen" className='w-1/4'>
                            <Button variant='outline' className='w-full h-auto aspect-square flex-col gap-y-2 hover:bg-primary hover:scale-105 hover:text-white transition-all'>
                                <CubeIcon fill='#16a34a' width={20} height={20}/>
                                <h4 className="scroll-m-20 text-sm md:text-lg font-medium tracking-tight">
                                    Panen
                                </h4>
                            </Button>
                        </Link>
                        <Link href="/greenhouse/pilih?catat=event" className='w-1/4'>
                            <Button variant='outline' className='w-full h-auto aspect-square flex-col gap-y-2 hover:bg-primary hover:scale-105 hover:text-white transition-all'>
                                <ScissorsIcon fill='#16a34a' width={20} height={20}/>
                                <h4 className="scroll-m-20 text-sm md:text-lg font-medium tracking-tight">
                                    Hama
                                </h4>
                            </Button>
                        </Link>
                    </div>
                </section>

                <HomeSection className='flex-col gap-y-3'>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Daftar Greenhouse 🏡
                    </h4>

                    <section className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-5 md:justify-center overflow-y-auto" >
                        {
                            greenhouses.map((greenhouse, i) => (
                                <Link href={`/greenhouse/${greenhouse.id}`} key={i}>
                                    <Card className="w-full pt-6" >
                                        <CardContent className=''>
                                            <Image
                                            src={greenhouseImage}
                                            alt="Greenhouse Image"
                                            className="w-full object-cover hover:scale-105 transition-all rounded-lg"
                                            width={200}
                                            height={200}
                                            />
                                        </CardContent>
                                        <CardFooter className='flex-col w-full gap-y-2'>
                                            <CardTitle className="w-full ">{greenhouse.nama_gh}</CardTitle>
                                            <CardDescription className='w-full flex items-center gap-x-2'><DrawingPinFilledIcon/> {greenhouse.lokasi}</CardDescription>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))
                        }
                    </section>
                </HomeSection>
            </div>
        </>
    )
}

export default Home;