'use server'

import { Sale } from "@/lib/models/Sale"

export async function deleteSale(id: number): Promise<{success: boolean, msg: string}>  {
    
    try {
        const result = await Sale.destroy({
            where: {
                idsale: id
            }
        })
        return {
            success: true,
            msg: 'Venda removida com sucesso'
        }
    } catch (error) {
        console.log(`delete sale error ${error}`)
        return {
            success: true,
            msg: 'Falha ao remover venda'
        }
    }
}