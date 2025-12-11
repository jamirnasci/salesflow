import { Product } from "@/lib/models/Product";
import { Sale } from "@/lib/models/Sale";
import { ISale } from "@/lib/types/Sale";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const sales = await Sale.findAll()
        return Response.json(sales, { status: 200 })
    } catch (error) {
        console.log(`findall sale erro ${error}`)
        return Response.json({ msg: 'Falha ao carregar vendas' }, { status: 500 })
    }
}