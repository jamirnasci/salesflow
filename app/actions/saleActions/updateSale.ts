'use server'

import { Sale } from "@/lib/models/Sale"
import { ISale } from "@/lib/types/Sale"

export async function updateSale(sale: Partial<ISale>): Promise<{success: boolean, msg: string}> {    
    try {
        const result = await Sale.update({
            status: sale.status,
            desc: sale.desc
        }, {
            where: {
                idsale: sale.idsale
            }
        })
        return{
            success: true,
            msg: 'Venda Atualizada com sucesso'
        }
    } catch (error) {
        console.log(`update sale error ${error}`)
        return{
            success: false,
            msg: 'Falha ao atualizar venda'
        }
    }
}