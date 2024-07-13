import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const credentialsConfig = credentials({
  credentials: {
    email: {
      label: "Email",
      type: "email",
    },
    password: {
      label: "Password",
      type: "password",
    },
  },
  async authorize(credentials) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email as string,
        },
      });
      if (user) {
        const isPassword = await bcrypt.compare(
          credentials?.password as string,
          user?.password as string
        );
        if (!isPassword) return null;
        return user;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },
});

const config = {
  providers: [credentialsConfig],
  callbacks: {
    authorized({ request, auth }: any) {
      const { pathname } = request.nextUrl;
      if (
        pathname == "/app" ||
        pathname == "/app/profile" ||
        pathname == "/app/people" ||
        pathname == "/app/likedpost"
      )
        return !!auth;
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
