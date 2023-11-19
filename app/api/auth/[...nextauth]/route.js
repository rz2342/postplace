import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        password: { label: "password", type: "password" },
      },
      // this will be called when we sign in with normal credentials
      async authorize(credentials, req) {
        const res = await fetch(`https://postplace.vercel.app/api/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
        });
        // should either return user retrieved from database, or error
        const data = await res.json();

        // If no error and we have user data, return it
        if (res.ok && data.user) {
          return data;
        }
        // Return null if user data could not be retrived
        console.log("cannot log in");
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "credentials") {
        // we already have all the necessary data from authorize(), just return true
        return true;
      }
    },
    // transfer user data to token object. Only store static info in session
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.userId = user.user._id;
        token.username = user.user.username;
      }
      return token;
    },
    // transfer token data to session object. Only store static info in session
    async session({ session, token }) {
      session.user.userId = token.userId;
      session.user.username = token.username;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
