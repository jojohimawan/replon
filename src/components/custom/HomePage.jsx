"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import dateLibs from "@/lib/date";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HomeSection } from "@/components/section/Section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";

import { HomeLogoutBtn } from "@/components/custom/HomeLogoutBtn";
import { GreenhouseGridList } from "./GreenhouseGridList";
import { WeatherCard } from "./WeatherCard";

import { BlendingModeIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import hama from "@/assets/hama.svg";
import sekop from "@/assets/sekop.svg";
import tanam from "@/assets/tanam.svg";
import watering from "@/assets/watering.svg";

export default function HomePage({ user }) {
  const { getCurrentDate } = dateLibs();
  console.log(user);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between">
        <section className="w-full flex flex-row items-center justify-between pt-2 mb-10">
          <div className="flex flex-col gap-y-1">
            <small className="text-sm font-medium leading-none text-slate-400">
              {getCurrentDate()}
            </small>
            <div className="flex gap-x-5">
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

        <section className="w-full flex flex-col gap-y-3 mb-10">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Cuaca Hari Ini 🌄
          </h4>

          <Suspense fallback={<Skeleton className="w-full h-24 rounded-2xl" />}>
            <WeatherCard />
          </Suspense>
        </section>

        <section className="w-full flex flex-col gap-y-3 mb-10">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Fitur Utama 🍈
          </h4>

          <div className="w-full flex flex-row gap-x-2 justify-between items-center">
            <Button
              variant="outline"
              onClick={() => toast.info("Fitur Masih Dalam Tahap Pengembangan")}
              className="w-1/4 h-auto aspect-square flex-col gap-y-2 hover:bg-primary hover:scale-105 hover:text-white transition-all"
            >
              <Image
                src={watering}
                width={24}
                height={24}
                alt="Kontrol Pompa"
              />
              <h4 className="scroll-m-20 text-sm md:text-lg font-bold tracking-tight">
                Pompa
              </h4>
            </Button>
            <Link href="/greenhouse/pilih?catat=tanam" className="w-1/4">
              <Button
                variant="outline"
                className="w-full h-auto aspect-square flex-col gap-y-2 hover:bg-primary hover:scale-105 hover:text-white transition-all"
              >
                <Image src={tanam} width={24} height={24} alt="Event Tanam" />
                <h4 className="scroll-m-20 text-sm md:text-lg font-bold tracking-tight">
                  Tanam
                </h4>
              </Button>
            </Link>
            <Link href="/greenhouse/pilih?catat=panen" className="w-1/4">
              <Button
                variant="outline"
                className="w-full h-auto aspect-square flex-col gap-y-2 hover:bg-primary hover:scale-105 hover:text-white transition-all"
              >
                <Image src={sekop} width={24} height={24} alt="Event Panen" />
                <h4 className="scroll-m-20 text-sm md:text-lg font-bold tracking-tight">
                  Panen
                </h4>
              </Button>
            </Link>
            <Link href="/greenhouse/pilih?catat=event" className="w-1/4">
              <Button
                variant="outline"
                className="w-full h-auto aspect-square flex-col gap-y-2 hover:bg-primary hover:scale-105 hover:text-white transition-all"
              >
                <Image src={hama} width={24} height={24} alt="Event Hama" />
                <h4 className="scroll-m-20 text-sm md:text-lg font-bold tracking-tight">
                  Hama
                </h4>
              </Button>
            </Link>
          </div>
        </section>

        <HomeSection className="flex-col gap-y-3 h-full">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Daftar Greenhouse 🏡
          </h4>

          <Suspense
            fallback={<Skeleton className="w-full h-full rounded-2xl" />}
          >
            <GreenhouseGridList userId={user.user.id} />
          </Suspense>
        </HomeSection>
      </div>
    </>
  );
}
