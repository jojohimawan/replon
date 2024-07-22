import Link from "next/link";
import Image from 'next/image';

import greenhouseImage from "./../../../public/greenhouse.png";

import { fetchGreenhouseByUserId } from "@/utils/supabase/queries";

import { DrawingPinFilledIcon } from "@radix-ui/react-icons";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { EmptyTabContent } from './EmptyTabContent';

export async function GreenhouseGridList(userId) {
    const greenhouses = await fetchGreenhouseByUserId(userId);
    console.log(greenhouses);

  return (
    <section
      className={`w-full h-full md:justify-center overflow-y-auto ${
        greenhouses.length === 0
          ? ""
          : "grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-5"
      }`}
    >
      {greenhouses.length === 0 ? (
        <EmptyTabContent
          title="data Greenhouse tercatat"
          url="/auth/register/greenhouse"
          btnPlaceholder="Tambahkan Greenhouse disini"
        />
      ) : (
        greenhouses.map((greenhouse, i) => (
          <Link href={`/greenhouse/${greenhouse.id}`} key={i}>
            <Card className="w-full pt-6">
              <CardContent className="">
                <Image
                  src={greenhouseImage}
                  alt="Greenhouse Image"
                  className="w-full object-cover hover:scale-105 transition-all rounded-lg"
                  width={200}
                  height={200}
                />
              </CardContent>
              <CardFooter className="flex-col w-full gap-y-2">
                <CardTitle className="w-full ">{greenhouse.nama_gh}</CardTitle>
                <CardDescription className="w-full flex items-center gap-x-2">
                  <DrawingPinFilledIcon /> {greenhouse.lokasi}
                </CardDescription>
              </CardFooter>
            </Card>
          </Link>
        ))
      )}
    </section>
  );
}
