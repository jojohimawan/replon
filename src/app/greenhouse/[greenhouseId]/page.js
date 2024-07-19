import Image from "next/image";
import Link from "next/link";

import dateLibs from "@/lib/date";

import {
    fetchGreenhouseById,
    fetchTanamAndVarietasByGreenhouseId,
    fetchPanenAndVarietasByGreenhouseId,
    fetchEventAndPenyakitByGreenhouseId 
} from "@/utils/supabase/queries";

import {
    funCountVarietasInGreenhouse,
    funCountPanenInGreenhouse,
    funCountPenyakitInGreenhouse
} from "@/utils/supabase/rpc";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    ChevronLeftIcon,
    DrawingPinFilledIcon,
    BlendingModeIcon,
} from "@radix-ui/react-icons";
import { 
    Card,
    CardContent,
    CardTitle,
    CardDescription,
 } from "@/components/ui/card";
 import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs";
import GreenhouseTabContent from "@/components/custom/GreenhouseTabContent";
import { EmptyTabContent } from "@/components/custom/EmptyTabContent";

import greenhouse from "../../../../public/greenhouse.png";

import { GreenhouseSwitch } from "@/components/custom/GreenhouseSwitch";

export default async function GreenhousePage({ params }) {
    const greenhouseData = await fetchGreenhouseById(params.greenhouseId);

    const varietasCount = await funCountVarietasInGreenhouse(params.greenhouseId);
    const panenCount = await funCountPanenInGreenhouse(params.greenhouseId);
    const penyakitCount = await funCountPenyakitInGreenhouse(params.greenhouseId);

    const tanamDatas = await fetchTanamAndVarietasByGreenhouseId(params.greenhouseId);
    const panenDatas = await fetchPanenAndVarietasByGreenhouseId(params.greenhouseId);
    const penyakitDatas = await fetchEventAndPenyakitByGreenhouseId(params.greenhouseId);

    const { formatDateTime } = dateLibs();

    return (
        <>
            <div className="flex flex-col w-full h-full items-center gap-y-5">
                <section className="w-full py-5">
                    <Link href={`/home`}>
                        <Button size="lg" className="flex gap-x-2 bg-green-50 text-primary hover:text-white shadow-none">
                            <ChevronLeftIcon /> Kembali
                        </Button>
                    </Link>
                </section>

                <section className="w-full flex items-center mb-5">
                    <div className="w-3/4 flex flex-col space-y-5 pr-5">
                        <h1 className="text-4xl text-black font-semibold">{greenhouseData.nama_gh}</h1>
                        <div className="flex items-center gap-x-2 text-muted-foreground">
                            <DrawingPinFilledIcon/> {greenhouseData.lokasi}
                        </div>
                        <div className="w-full flex items-center justify-between text-sm text-primary h-5">
                            <div>
                                {`${varietasCount[0].jumlah_varietas} Varietas Tertanam`}
                            </div>
                            <Separator orientation="vertical"/>
                            <div>
                                {`${panenCount[0].jumlah_varietas} Varietas Dipanen`}
                            </div>
                            <Separator orientation="vertical"/>
                            <div>
                                {`${penyakitCount[0].jumlah_penyakit} Event Penyakit`}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/4">
                    <Image
                        src={greenhouse}
                        alt="Card Image"
                        className="w-full object-cover aspect-square hover:scale-105 transition-all rounded-xl"
                        width={200}
                        height={200}
                    />
                    </div>
                </section>

                <section className="w-full">
                    <Card className='w-full group hover:bg-green-500'>
                        <CardContent className='flex flex-row justify-between items-center pt-6 text-white'>
                            <div className='flex flex-col h-full gap-y-2'>
                                <div className="p-4 text-xl bg-green-50 text-primary max-w-max rounded-full">
                                    <BlendingModeIcon />
                                </div>
                                <CardTitle className='scroll-m-20 text-2xl font-semibold tracking-tight text-primary group-hover:text-white'>Kontrol Keran Air</CardTitle>
                                <CardDescription className='text-slate-500 group-hover:text-white'>Status: Mati</CardDescription>
                            </div>

                            <GreenhouseSwitch switchProps={false}/>

                        </CardContent>
                    </Card>
                </section>

                <section className="w-full overflow-hidden h-full">
                    <Tabs defaultValue="tanam" className="w-full h-full">
                        <TabsList className="grid grid-cols-3">
                            <TabsTrigger value="tanam">Tanam</TabsTrigger>
                            <TabsTrigger value="panen">Panen</TabsTrigger>
                            <TabsTrigger value="event">Penyakit</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tanam" className="h-full overflow-y-auto space-y-2">
                            {tanamDatas.length === 0 ? (
                                <EmptyTabContent 
                                    title='data tanam pada Greenhouse ini'
                                    url={`/tanam/${params.greenhouseId}`}
                                    btnPlaceholder='Catat event tanam disini'
                                />
                                ) : (
                                    tanamDatas.map((tanam, i) => (
                                        <GreenhouseTabContent 
                                            key={i}
                                            title={tanam.varietas.nama_varietas} 
                                            count={tanam.jumlah_tanaman} 
                                            time={formatDateTime(tanam.waktu_tanam)} 
                                        />
                                    ))
                                )
                            }
                        </TabsContent>
                        <TabsContent value="panen" className="h-full overflow-y-auto space-y-2">
                            {panenDatas.length === 0 ? (
                                <EmptyTabContent 
                                    title='data penyakit pada Greenhouse ini'
                                    url={`/panen/${params.greenhouseId}`}
                                    btnPlaceholder='Catat event penyakit disini'
                                />
                                ) : (
                                    panenDatas.map((panen, i) => (
                                        <GreenhouseTabContent 
                                            key={i}
                                            title={panen.varietas.nama_varietas}
                                            count={panen.jumlah_produksi}
                                            time={formatDateTime(panen.waktu_panen)}
                                        />
                                    ))
                                )
                            }
                        </TabsContent>
                        <TabsContent value="event" className="h-full overflow-y-auto space-y-2">
                            {penyakitDatas.length === 0 ? (
                                <EmptyTabContent 
                                    title='data panen pada Greenhouse ini'
                                    url={`/event/${params.greenhouseId}`}
                                    btnPlaceholder='Catat event panen disini'
                                />
                                ) : (
                                    penyakitDatas.map((penyakit, i) => (
                                        <GreenhouseTabContent 
                                            key={i}
                                            title={penyakit.penyakit.nama_penyakit}
                                            time={formatDateTime(penyakit.created_at)}
                                        />
                                    ))
                                )
                            }
                        </TabsContent>
                    </Tabs>
                </section>
            </div>
        </>
    )
}