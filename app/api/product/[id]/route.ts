import { Product } from "@/lib/models/Product";
import { IProduct } from "@/lib/types/Product";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const p: IProduct = await req.json()
        const { id } = await context.params

        const result = await Product.update({
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            desc: p.desc,
            img: p.img
        }, {
            where: {
                idproduct: id
            }
        })
        return Response.json({ msg: 'Produto atualizado com sucesso' }, { status: 200 })
    } catch (error) {
        console.log(`update product error ${error}`)
        return Response.json({ msg: 'Falha ao atualizar produto' }, { status: 500 })
    }
}
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params

        const result = await Product.destroy({
            where: {
                idproduct: id
            }
        })
        return Response.json({ msg: 'Produto removido com sucesso' }, { status: 200 })
    } catch (error) {
        console.log(`update product error ${error}`)
        return Response.json({ msg: 'Falha ao remover produto' }, { status: 500 })
    }
}
export function POST() {

}