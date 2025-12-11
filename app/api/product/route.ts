import { syncDB } from "@/lib/config/sync";
import { Product } from "@/lib/models/Product"
import { IProduct } from "@/lib/types/Product";
export const runtime = "nodejs";

export async function GET(){
    try {
        const products = await Product.findAll()
        return Response.json(products, {status: 200})
    } catch (error) {
        console.log(`find all products error: ${error}`)
        return Response.json({msg: 'Falha ao carregar produtos'}, {status: 404})
    }
}