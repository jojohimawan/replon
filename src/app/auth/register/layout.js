export default function RegisterLayout({children}) {
    return(
        <>
            <div className="flex flex-col gap-y-2">
                <h1 className="text-4xl font-bold max-w-1/2">Selamat Datang di Replon!</h1>
                <p className="text-slate-400">Silahkan daftarkan akun anda untuk mengakses fitur aplikasi Replon</p>
            </div>

            <div className="flex flex-col h-full gap-y-5">
                {children}
            </div>
        </>
    )
}