'use server'

import { Client } from "@/lib/models/Client"

export async function deleteClient(id: number): Promise<{success: boolean, msg: string}> {
    try {        
        const result = await Client.destroy({
            where: {
                idclient: id
            }
        })
        return {
            success: true,
            msg: 'Cliente removido com sucesso'
        }
    } catch (error) {
        console.log(`Delete client error ${error}`)
        return {
            success: false,
            msg: 'Falha ao remover cliente'
        }
    }
}