import NextAuth, { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apolloServerClient } from "@/app/graphql/config.server";
import { LOGIN_QUERY } from "@/app/(auth)/queries";
import { cookies } from "next/headers";
import { __access_token, __refresh_token } from "../../../constants/values";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Enter email ",
          type: "email",
          placeholder: "Your email...",
        },
        password: {
          label: "Enter password",
          type: "password",
          placeholder: "Your password...",
        },
      },
      async authorize(credentials) {
        const body = {
          email: credentials?.email,
          password: credentials?.password,
        };
        try {
          const result = await apolloServerClient.mutate({
            mutation: LOGIN_QUERY,
            variables: { body },
          });
          const { user, accessToken, refreshToken } = result.data.signIn;
          const cookieMap = await cookies();
          cookieMap.set(__access_token, accessToken);
          cookieMap.set(__refresh_token, refreshToken);
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ user, token }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      if (token && token.user) session.user = token.user as Session["user"];
      return session;
    },
    signIn() {
      return true;
    },
  },
  session: { strategy: "jwt" },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
