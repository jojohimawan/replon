import { NextResponse } from "next/server";
import { createDashboard } from "@/utils/supabase/server";

export async function POST(request) {
    const supabase = createDashboard();
    const req = await request.json();

    try {
        const { data, error } = await supabase
            .from('pompa')
            .insert({ status_pompa: req.payload, id_gh: req.nodeId })
            .select()

        if(error) {
            console.error('[POMPA] error: ', error);
            return NextResponse.json(error);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('[POMPA] error: ', error);
        
        return NextResponse.json({
            error: 'Failed to update pompa'
        }, {
            status: 500
        });
    }
}