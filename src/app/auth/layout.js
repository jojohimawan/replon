export default function AuthLayout({children}) {
    return(
        <main className="flex min-h-full flex-col gap-y-12 justfify-between px-5 py-4 bg-white md:max-w-[640px] md:mx-auto overflow-y-auto">
            {children}
        </main>
    )
}