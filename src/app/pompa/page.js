import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import { ChevronLeftIcon, BlendingModeIcon } from "@radix-ui/react-icons";

import { PompaControl } from "@/components/custom/PompaControl";

export default function PompaPage() {

    return(
        <>
            <div className="flex flex-col w-full h-full items-center gap-y-5">
                <section className="w-full flex items-center justify-between py-5">
                    <Link href={`/home`}>
                        <Button size="lg" className="flex gap-x-2 bg-green-50 text-primary hover:text-white shadow-none">
                            <ChevronLeftIcon /> Kembali
                        </Button>
                    </Link>

                    <h1 className="text-2xl font-bold text-center">Kontrol Pompa</h1>
                </section>

                <section className="w-full h-full overflow-y-auto pb-12">
                    <div className="grid grid-cols-2 gap-3 items-center justify-center">
                        {
                            [...Array.from({length: 13}).map((_, index) => (
                                <Card className='' key={index}>
                                    <CardContent className='flex flex-col gap-y-3 pt-6 text-white'>
                                        <div className='flex flex-row h-full gap-x-3 items-center '>
                                            <div className="p-4 text-xl bg-green-50 text-primary max-w-max rounded-full">
                                                <BlendingModeIcon />
                                            </div>
                                            <CardTitle className='scroll-m-20 text-md md:text-2xl font-semibold tracking-tight text-primary'>{`Pompa Node ${index + 1}`}</CardTitle>
                                        </div>

                                        <PompaControl nodeId={index + 1}/>

                                    </CardContent>
                                </Card>
                            ))]
                        }
                    </div>
                </section>
            </div>
        </>
    )
}