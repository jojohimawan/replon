import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { DrawingPinFilledIcon } from '@radix-ui/react-icons';
import {EmptyTabContent} from "@/components/custom/EmptyTabContent";

const Pilih = async ({ searchParams }) => {
    if(!searchParams.catat) {
        redirect('/home')
    }

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

    return(
        <>
            <div className="flex flex-col w-full h-full items-center justify-between gap-y-5">
                <h1 className="text-2xl font-bold text-center">{`Mau mencatat ${searchParams.catat} di greenhouse mana?`}</h1>

                <div className="w-full h-full overflow-y-auto">
                    <div className="w-full flex flex-col gap-y-3">
                        { greenhouses.length === 0 ? (
                                <EmptyTabContent
                                    title="data Greenhouse tercatat"
                                    url="/auth/register/greenhouse"
                                    btnPlaceholder="Tambahkan Greenhouse disini"
                                />
                            ) :
                            (
                                greenhouses.map((greenhouse, i) => (
                                    <Link key={i} href={`/${searchParams.catat}/${greenhouse.id}`}>
                                        <Card className="w-full pt-6 hover:bg-green-50 hover:border-primary hover:shadow-md transition-all active:bg-green-50">
                                            <CardContent className="flex flex-col justify-center gap-y-3">
                                                <CardTitle>
                                                    {greenhouse.nama_gh}
                                                </CardTitle>
                                                <CardDescription className='w-full flex items-center gap-x-2'><DrawingPinFilledIcon/> {greenhouse.lokasi}</CardDescription>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Pilih;