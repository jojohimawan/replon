'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createDashboard } from "./server";

export async function fetchLatestPompaState(nodeId) {
    const supabase = createDashboard();

    try {
    const { data, error } = await supabase
        .from('pompa')
        .select('*')
        .eq('id_gh', nodeId)
        .order('time', { ascending: false })
        .limit(1);

        if(error) {
            console.error('[POMPA] error fetching pompa: ', error);
            throw new Error(error.message);
        }

        
        return data;
    } catch (error) {
        console.error('[POMPA] error fetching pompa: ', error);
        
        return [];
    }
}

export async function insertPompa({payload, nodeId}) {
    const supabase = createDashboard();

   try {
        const { data, error } = await supabase
            .from('pompa')
            .insert({ status_pompa: payload, id_gh: nodeId })
            .select()

        if(error) {
            console.error('[POMPA] error inserting pompa: ', error);
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('[POMPA] error inserting pompa: ', error);
        
        return;
    }
}