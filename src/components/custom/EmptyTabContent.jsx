import Link from "next/link";

import { Button } from "../ui/button";

export function EmptyTabContent({title, url, btnPlaceholder}) {
    return(
        <div className="w-full h-full flex flex-col gap-y-5 items-center justify-center">
            <p>{`Tidak ditemukan ${title}`}</p>
            <Button asChild className='w-1/2'>
                <Link href={url}>{btnPlaceholder}</Link>
            </Button>
        </div>
    )
}