'use server'
import { Product } from "@/lib/models/Product"

export async function deleteProduct(id: number): Promise<{success: boolean, msg: string}>  {
    try {
        const result = await Product.destroy({
            where: {
                idproduct: id
            }
        })
        return {
            success: true,
            msg: 'Produto removido com sucesso'
        }
    } catch (error) {
        console.log(`update product error ${error}`)
        return {
            success: false,
            msg: 'Falha ao remover produto'
        }
    }
}