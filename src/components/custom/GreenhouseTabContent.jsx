import {
    EyeOpenIcon,
    Pencil1Icon,
    TrashIcon
} from "@radix-ui/react-icons";

import { 
    Card,
    CardContent,
    CardTitle,
    CardDescription,
    CardHeader,
 } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GreenhouseTabContent({ title, count, time }) {
    return (
        <Card className="flex items-center justify-between hover:shadow-md">
            <CardHeader className='w-4/6'>
                <CardTitle>{title}</CardTitle>
                {
                    count === undefined ? '' : <CardDescription>{`Jumlah Tercatat: ${count}`}</CardDescription>
                }
                <CardDescription>{`Waktu Catat: ${time}`}</CardDescription>
            </CardHeader>
                {/* <CardContent className="px-6 py-0 grid grid-cols-2 gap-4 md:grid-cols-3">
                    <Button size="icon" className="bg-amber-100 text-amber-500 hover:bg-amber-500 hover:text-white"><Pencil1Icon/></Button>
                    <Button size="icon" className="bg-red-100 text-red-500 hover:bg-red-500 hover:text-white"><TrashIcon/></Button>
                    <Button size="icon" className="bg-green-100 text-primary hover:text-white"><EyeOpenIcon/></Button>
                </CardContent> */}
        </Card>
    )
}