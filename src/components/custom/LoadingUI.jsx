import { ReloadIcon } from "@radix-ui/react-icons";

export function LoadingUI() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-3">
            <h1>Memuat...</h1>
            <ReloadIcon className='animate-spin' />
        </div>
    )
}