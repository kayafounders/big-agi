import NextAuth, { AuthOptions, Profile } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // ...add more providers here
    ],
    pages: {
        // signIn page is the homepage
        signIn: '/',
    },
    callbacks: {
        signIn: async (params: { profile?: Profile }) => {
            const { profile } = params;
            if (profile?.email) {
              return profile?.email.endsWith('@kayafounders.com');
            }
            return false;
        },
    }
};

export default NextAuth(authOptions);
