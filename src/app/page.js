import Image from "next/image";
import Link from "next/link";

import heroSvg from "@/assets/hero_farm.svg"
import { Button } from "@/components/ui/button";

export default async function App() {
  return (
    <>
      <p className="text-xl font-bold text-center">🍈 Replon App</p>

      <Image 
        src={heroSvg}
        width={500}
        height={500}
        alt="Petani"
      />

      <div className="flex flex-col gap-y-2 w-full items-center">
        <h1 className="text-3xl font-bold text-center">Selamat Datang di  Aplikasi Replon</h1>
        <p className="text-center text-slate-500">Aplikasi untuk membantu petani dalam mengelola lahan pertanian</p>
      </div>
      
      <div className="flex flex-col gap-y-3 w-full">
        <Link href="/auth/login">
          <Button className="w-full"> Login </Button>
        </Link>
        
        <Link href="/auth/register">
          <Button variant="outline" className="w-full"> Daftar Akun </Button>
        </Link>
      </div>
    </>
  );
}
