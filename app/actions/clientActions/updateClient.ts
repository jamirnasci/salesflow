'use server'

import { Client } from "@/lib/models/Client"
import { IClient } from "@/lib/types/Client"

export async function updateClient(client: Partial<IClient>): Promise<{success: boolean, msg: string}>{
        try {        
        const result = await Client.update({            
            name: client.name,
            cpf: client.cpf,
            email: client.email,
            phone: client.phone
        }, {
            where: {
                idclient: client.idclient
            }
        })
        return {
            success: true,
            msg: 'Cliente atualizado com sucesso'
        }
    } catch (error) {
        console.log(`update client error ${error}`)
        return {
            success: false,
            msg: 'Falha ao atualizar cliente'
        }
    }
}