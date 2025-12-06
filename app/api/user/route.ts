import { User } from "@/lib/models/User";
import { IUser } from "@/lib/types/User";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest){
    try {
        const user: IUser = await req.json()
        user.password = await bcrypt.hash(user.password, 10)
        const result = await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone
        })
        return Response.json({msg: 'Usuário cadastrado com sucesso'}, {status: 200})
    } catch (error) {
        console.log(`error create user ${error}`)
        return Response.json({msg: 'Falha ao cadastrar usuário'}, {status: 500})
    }
}

export async function GET(){

}