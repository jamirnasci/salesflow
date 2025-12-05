import { Sale } from "@/lib/models/Sale";
import { ISale } from "@/lib/types/Sale";
import { NextRequest } from "next/server";

interface SaleEditableFields {
    status: string,
    desc: string,
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const params = await context.params
    try {
        const sale: SaleEditableFields = await req.json()
        const result = await Sale.update({
            status: sale.status,
            desc: sale.desc
        }, {
            where: {
                idsale: params.id
            }
        })
        return Response.json({ msg: 'Venda atualizada com sucesso' }, { status: 200 })
    } catch (error) {
        console.log(`update sale error ${error}`)
        return Response.json({ msg: 'Falha ao atualizar venda' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }){
    const params = await context.params
    try {
        const result = await Sale.destroy({
            where:{
                idsale: params.id
            }
        })
        return Response.json({ msg: 'Venda removida com sucesso' }, { status: 200 })
    } catch (error) {
        console.log(`delete sale error ${error}`)
        return Response.json({ msg: 'Falha ao remover venda' }, { status: 500 })
    }
}