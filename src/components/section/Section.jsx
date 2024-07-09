import { cn } from "@/lib/utils"

const HomeSection = ({children, className}) => {
    return (
        <section className={cn("w-full flex overflow-hidden", className)}>
            {children}
        </section>
    );
};

export { HomeSection }