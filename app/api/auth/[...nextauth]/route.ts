import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prismaSignleton";
import bcrypt from "bcryptjs";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    balance?: number;
    trigger?: "update"; // custom trigger for refreshing session
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        console.log("Received credentials:", credentials);

        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        try {
          const user = await prisma.user.findFirst({
            where: { email },
            include: { account: { select: { balance: true } } },
          });

          console.log("user found from db: ", user);
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            const { account, ...safeUser } = user;
            const returnUser = {
              ...safeUser,
              balance: account?.balance,
              id: user.id.toString(),
            };

            console.log("🔍 AUTHORIZE RETURNING USER:", returnUser);
            return returnUser;
          } else {
            return null;
          }
        } catch (e: any) {
          console.error("Prisma init error:", e.message);
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger }: { token: JWT; user?: any; trigger?: string }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.balance = user?.balance;
        
      }

      // Refresh user data when trigger is "update"
      if (trigger === "update" && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: parseInt(token.id) },
          include: { account: { select: { balance: true } } },
        });

        if (dbUser) {
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
          token.balance = dbUser.account?.balance;
          token.email = dbUser.email
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.balance = token.balance;
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url === baseUrl || url === `${baseUrl}/`) {
        return "/dashboard";
      }
      if (url.startsWith("/")) {
        return url;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
