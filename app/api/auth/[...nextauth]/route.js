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
        const res = await fetch(`http://localhost:3000/api/auth/login`, {
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
    // transfer user data to token object
    async jwt({ token, user, account }) {
      // console.log("INSIDE JWT FUNCTION");
      // console.log("token jwt", token);
      // console.log("user jwt", user);
      // console.log("account jwt", account);
      if (account?.provider === "credentials") {
        //token.accessToken = user.token;
        token.userId = user.user._id;
        token.profilePicUrl = user.user.profilePicUrl;
        // console.log("u signed in with credentials. token is now ", token);
      }
      return token;
    },
    // transfer token data to session object
    async session({ session, token }) {
      // console.log("IN SESSION FUNCTION");
      // console.log("session is ", session);
      // console.log("token is ", token);
      //session.accessToken = token.accessToken;
      session.user.userId = token.userId;
      session.user.profilePicUrl = token.profilePicUrl;
      // session stores user object (name, email, image, userID), accessToken, and expires
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
