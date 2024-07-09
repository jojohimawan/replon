import EventPenyakitForm from "@/components/custom/EventPenyakitForm";

import { createClient } from "@/utils/supabase/server";

import { fetchGreenhouseById } from "@/utils/supabase/queries";

export default async function PanenGH({ params }) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('penyakit')
        .select('*');

    if(data) {
        console.log(data);
    }

    const greenhouseData = await fetchGreenhouseById(params.greenhouseId);

    return(
        <EventPenyakitForm
            penyakitData={data}
            greenhouseData={greenhouseData}
        />
    )
}