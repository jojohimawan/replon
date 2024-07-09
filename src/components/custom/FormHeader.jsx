import Link from "next/link"
import Image from "next/image";

import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, DrawingPinFilledIcon } from "@radix-ui/react-icons";

import greenhouse from "./../../../public/greenhouse.png";

export default function FormHeader({ greenhouseData }) {
    return(
        <>
            <section className="w-full py-5">
                <Link href="/home">
                    <Button size="lg" className="flex gap-x-2 bg-green-50 text-primary hover:text-white shadow-none">
                        <ChevronLeftIcon /> Kembali
                    </Button>
                </Link>
            </section>

            <section className="w-full flex items-center">
                <div className="w-3/4 flex flex-col gap-y-2">
                    <h1 className="text-2xl text-black font-semibold">{greenhouseData.nama_gh}</h1>
                    <div className="flex items-center gap-x-2 text-muted-foreground">
                        <DrawingPinFilledIcon/> {greenhouseData.lokasi}
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
        </>
    )
}