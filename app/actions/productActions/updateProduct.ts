'use server'

import { Product } from "@/lib/models/Product"
import { IProduct } from "@/lib/types/Product"

export async function updateProduct(product: Partial<IProduct>): Promise<{success: boolean, msg: string}> {
    try {
        const result = await Product.update({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            desc: product.desc,
            img: product.img
        }, {
            where: {
                idproduct: product.idproduct
            }
        })
        return {
            success: true,
            msg: 'Produto atualizado com sucesso'
        }
    } catch (error) {
        console.log(`update product error ${error}`)
        return {
            success: false,
            msg: 'Falha ao atualizar produto'
        }
    }
}