'use server'

import { Product } from "@/lib/models/Product"
import { IProduct } from "@/lib/types/Product"

export async function createProduct(product: Partial<IProduct>): Promise<{success: boolean, msg: string}> {
    try {        
        const result = await Product.create({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            desc: product.desc,
            img: product.img
        })
        return {
            success: true,
            msg: 'Produto cadastrado com sucesso'
        }
    } catch (error) {
        console.log(`create product error: ${error}`)
        return {
            success: false,
            msg: 'Falha ao cadastrar produto'
        }
    }
}