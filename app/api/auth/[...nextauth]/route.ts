import { User } from "@/lib/models/User";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import NextAuth from "next-auth";

const authOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { type: 'email', label: 'E-mail', placeholder: 'example@email.com' },
                password: { type: 'password', label: 'Senha' }
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null
                }
                const { email, password } = credentials

                const user = await User.findOne({
                    where: {
                        email: email
                    }
                })
                if (!user) {
                    return null
                }
                const isPasswordValid = await bcrypt.compare(password, user.password)
                if (isPasswordValid) {
                    return {
                        id: user.iduser.toString(),
                        email: user.email,
                        name: user.name || user.email
                    }
                } else {
                    return null
                }

            }
        })
    ],
    pages:{
        signIn: '/'
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };