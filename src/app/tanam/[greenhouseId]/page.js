import TanamForm from "@/components/custom/TanamForm";

import { createClient } from "@/utils/supabase/server";

import { fetchGreenhouseById } from "@/utils/supabase/queries";

export default async function TanamGH({ params }) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('varietas')
        .select('*');

    const greenhouseData = await fetchGreenhouseById(params.greenhouseId);

    if(data) {
        console.log(data);
    }

    return(
        <TanamForm varietasData={data} greenhouseData={greenhouseData}/>
    )
}