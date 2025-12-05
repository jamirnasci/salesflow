import { Sale } from "@/lib/models/Sale";
import { ISale } from "@/lib/types/Sale";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const sale: ISale = await req.json()
        const result = await Sale.create({
            totalItems: sale.totalItems,
            totalSale: sale.totalSale,
            status: sale.status,
            desc: sale.desc,
            clientId: sale.clientId,
            productId: sale.productId
        })
        return Response.json({ msg: 'Venda cadastrada com sucesso' }, { status: 200 })
    } catch (error) {
        console.log(`create sale erro ${error}`)
        return Response.json({ msg: 'Falha ao cadastrar venda' }, { status: 500 })
    }
}