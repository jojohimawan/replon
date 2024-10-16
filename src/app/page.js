import Image from "next/image";
import Link from "next/link";

import heroSvg from "@/assets/hero_pic.svg"
import logo from './../../public/logo.png'
import { Button } from "@/components/ui/button";

export default async function App() {
  return (
    <>
    <div className="w-full flex gap-x-2 items-center justify-center">
    <Image 
        src={logo}
        width={32}
        height={32}
        alt="Logo"
      />
    <p className="text-xl font-bold text-center">Replon App</p>
    </div>

      <Image 
        src={heroSvg}
        width={500}
        height={500}
        alt="Petani"
      />

      <div className="flex flex-col gap-y-2 w-full items-center">
        <h1 className="text-3xl font-bold text-center">Selamat Datang di  Aplikasi Petani</h1>
        <p className="text-center text-slate-500">Aplikasi untuk membantu petani dalam mengelola Greenhouse</p>
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
