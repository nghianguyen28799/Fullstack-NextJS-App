import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/db";
import { NextAuthOptions } from "next-auth";


const getGoogleCredentials = () => {
    const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID as string;
    const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET as string

    if (!clientId || clientId.length === 0) {
        throw new Error("No clientID for google provider set");
    }

    if (!clientSecret || clientSecret.length === 0) {
        throw new Error("No clientSecret for google provider set")
    }

    return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture

            }
            return session
        },

        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email
                }
            })

            console.log(dbUser);


            if (!dbUser) {
                token.id = user!.id
                return token
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image
            }
        },
        redirect() {
            return '/dashboard'
        }
    },
}