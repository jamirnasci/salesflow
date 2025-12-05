import { loadDashboard } from "@/lib/models/Dashboard";

export async function GET(){
    try {
        const data = await loadDashboard()
        return Response.json(data, {status: 200})
    } catch (error) {
        console.log(`load dashboard error ${error}`)
        return Response.json({msg: 'Falha ao carregar dashboard'}, {status: 500})
    }
}