'use server'

import { Client } from "@/lib/models/Client";
import { IClient } from "@/lib/types/Client";

export async function createClient(client: Partial<IClient>): Promise<{ success: boolean; msg: string; }> {

    try {
        const existingCpf = await Client.findOne({
            where: {
                cpf: client.cpf
            }
        })
        if (existingCpf) {
            return {
                success: false,
                msg: 'Cliente já cadastrado com esse CPF'
            }
        }
        const result = await Client.create({
            name: client.name,
            cpf: client.cpf,
            email: client.email,
            phone: client.phone
        })
        return {
            success: true,
            msg: 'Cliente cadastrado com sucesso'
        }
    } catch (error) {
        console.log(`create client error ${error}`)
        return {
            success: false,
            msg: 'Falha ao cadastrar cliente'
        }
    }
}