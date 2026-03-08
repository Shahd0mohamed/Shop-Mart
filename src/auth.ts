import { Session } from "inspector";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Route",
            credentials: {
                email: { label: 'example@gmail.com', type: 'text' },
                password: { label: 'Enter your password', type: 'password' }
            },
            async authorize(data) {
                const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                    method: 'POST',
                    body: JSON.stringify({ email: data?.email, password: data?.password }),
                    headers: { "Content-Type": "application/json" }
                });
                const payload = await response.json();

                if (response.ok) {

                    return {
                        id: payload.user.email,
                        user: payload.user,
                        token: payload.token
                    }
                } else {
                    throw new Error(payload.message)
                }

            }

        })
    ],

    pages: {
        signIn: '/login',
        error: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user;
                token.token = user.token;
            }

            return token
        },

        async session({ session, token }: any) {
            // Pass the data from the token to the session
            if (session.user) {
                session.user = token.user;
                session.token = token.token;
            }
            return session
        },
    }

}