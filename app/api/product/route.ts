import { syncDB } from "@/lib/config/sync";
import { Product } from "@/lib/models/Product"
import { IProduct } from "@/lib/types/Product";
export const runtime = "nodejs";

export async function POST(req: Request) {
    //await syncDB()
    try {
        const product: IProduct = await req.json()
        console.log(product)
        const result = await Product.create({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            desc: product.desc,
            img: product.img
        })
    } catch (error) {
        console.log(`create product error: ${error}`)
        return Response.json({ msg: 'ok' }, { status: 500 })
    }
    return Response.json({ msg: 'ok' }, { status: 200 })
}

export async function GET(){
    try {
        const products = await Product.findAll()
        return Response.json(products, {status: 200})
    } catch (error) {
        console.log(`find all products error: ${error}`)
        return Response.json({msg: 'Falha ao carregar produtos'}, {status: 404})
    }
}