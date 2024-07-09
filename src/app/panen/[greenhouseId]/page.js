import PanenForm from "@/components/custom/PanenForm";

import { createClient } from "@/utils/supabase/server";

import { fetchGreenhouseById } from "@/utils/supabase/queries";

export default async function PanenGH({ params }) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('varietas')
        .select('*');

    if(data) {
        console.log(data);
    }

    const greenhouseData = await fetchGreenhouseById(params.greenhouseId);

    return(
        <PanenForm varietasData={data} greenhouseData={greenhouseData}/>
    )
}