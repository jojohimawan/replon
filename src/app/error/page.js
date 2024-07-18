import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ErrorPage() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-3">
          <h1>Ups! Terjadi kesalahan pada sistem ☹</h1>
          <Link href='/'>
            <Button>Kembali ke Halaman Utama</Button>
          </Link>
      </div>
    )
  }
  