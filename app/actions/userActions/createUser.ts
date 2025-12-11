'use server'

import { User } from "@/lib/models/User";
import { IUser } from "@/lib/types/User";
import bcrypt from 'bcrypt'

export async function createUser(user: Partial<IUser>): Promise<{ sucess: boolean, msg: string }> {
    try {
        if (user.email && user.password) {
            user.password = await bcrypt.hash(user.password, 10)
            const result = await User.create({
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone
            })
            return {
                sucess: true,
                msg: 'Usuário cadastrado com sucesso'
            }
        } else {
            return {
                sucess: false,
                msg: 'Falha ao cadastrar usuário, preencha todos os'
            }
        }
    } catch (error) {
        console.log(`error create user ${error}`)
        return {
            sucess: false,
            msg: 'Falha ao cadastrar usuário'
        }
    }
}