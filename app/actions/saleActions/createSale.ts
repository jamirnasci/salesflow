'use server'

import { Product } from "@/lib/models/Product"
import { Sale } from "@/lib/models/Sale"
import { ISale } from "@/lib/types/Sale"

export async function createSale(sale: Partial<ISale>): Promise<{ success: boolean, msg: string }> {
    try {
        const product = await Product.findOne({
            where: {
                idproduct: sale.productId
            }
        })
        if (product?.quantity && sale.totalItems && sale.totalItems > product.quantity) {
            return { success: false, msg: 'Quantidade de itens maior que o estoque' }
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
        }, {
            where: {
                idproduct: sale.productId
            }
        })
        return { success: true, msg: 'Venda cadastrada com sucesso' }
    } catch (error) {
        console.log(`create sale erro ${error}`)
        return { success: false, msg: 'Falha ao cadastrar venda' }
    }
}