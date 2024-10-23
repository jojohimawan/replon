import { NextResponse } from "next/server";
import { createDashboard } from "@/utils/supabase/server";

export async function GET(request, { params }) {
    const supabase = createDashboard();
    const id = (await params).nodeId
    
    try {
        const { data, error } = await supabase
        .from('pompa')
        .select('*')
        .eq('id_gh', id)
        .order('time', { ascending: false })
        .limit(1);

        if(error) {
            console.error('[POMPA] error fetching pompa: ', error);
            return NextResponse.json(error);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('[POMPA] error fetching pompa: ', error);
        
        return NextResponse.json({
            error: 'Failed to update pompa'
        }, {
            status: 500
        });
    }
}