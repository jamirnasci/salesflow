import { Client } from "@/lib/models/Client";
import { IClient } from "@/lib/types/Client";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const client: IClient = await req.json()
        const {id} = await context.params
        const result = await Client.update({            
            name: client.name,
            cpf: client.cpf,
            email: client.email,
            phone: client.phone
        }, {
            where: {
                idclient: id
            }
        })
        return Response.json({ msg: 'Cliente atualizado com sucesso' }, { status: 200 })
    } catch (error) {
        console.log(`update client error ${error}`)
        return Response.json({ msg: 'Falha ao atualizar cliente' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await context.params
        const result = await Client.destroy({
            where:{
                idclient: id
            }
        })
        return Response.json({msg: 'Cliente removido com sucesso'}, {status: 200})
    } catch (error) {
        console.log(`Delete client error ${error}`)
        return Response.json({msg: 'Cliente removido com sucesso'}, {status: 200})
    }
}