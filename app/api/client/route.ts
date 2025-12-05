import { sequelize} from "@/lib/config/DB";
import { syncDB } from "@/lib/config/sync";
import { Client } from "@/lib/models/Client";
import { loadDashboard } from "@/lib/models/Dashboard";
import { IClient } from "@/lib/types/Client";

export const runtime = "nodejs";

export async function GET() {
    await loadDashboard()
    try {
        const clients = await Client.findAll()
        return Response.json(clients, {status: 200})
    } catch (error) {
        console.log(`findall clients error ${error}`)
        return Response.json({}, {status: 500})
    }
}

export async function POST(req: Request) {
    try {
        const client: IClient = await req.json()
        const result = await Client.create({
            name: client.name,
            cpf: client.phone,
            email: client.email,
            phone: client.phone
        })
        return Response.json({msg: 'Cliente cadastrado com sucesso'}, {status: 200})
    } catch (error) {
        console.log(`create client error ${error}`)
        return Response.json({msg: 'Falha ao cadastrar cliente'}, {status: 500})
    }
}