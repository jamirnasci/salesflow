import { Product } from "@/lib/models/Product";
import { Sale } from "@/lib/models/Sale";
import { ISale } from "@/lib/types/Sale";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const sale: ISale = await req.json()
        const product = await Product.findOne({
            where:{
                idproduct: sale.productId
            }
        })
        if(product?.quantity && sale.totalItems > product.quantity){
            return Response.json({ msg: 'Quantidade de itens maior que o estoque' }, { status: 200 })
        }
        const result = await Sale.create({
            totalItems: sale.totalItems,
            totalSale: sale.totalSale,
            status: sale.status,
            desc: sale.desc,
            clientId: sale.clientId,
            productId: sale.productId
        })
        const productDecrementResult = await Product.decrement({
            quantity: sale.totalItems
        },{
            where:{
                idproduct: sale.productId
            }
        })
        return Response.json({ msg: 'Venda cadastrada com sucesso' }, { status: 200 })
    } catch (error) {
        console.log(`create sale erro ${error}`)
        return Response.json({ msg: 'Falha ao cadastrar venda' }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const sales = await Sale.findAll()
        return Response.json(sales, { status: 200 })
    } catch (error) {
        console.log(`findall sale erro ${error}`)
        return Response.json({ msg: 'Falha ao carregar vendas' }, { status: 500 })
    }
}