// 7-50-Adding the Prisma Adapter

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

//1----------
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
//-----------
const handler = NextAuth({
  //2----------
  adapter:PrismaAdapter(prisma),
  //Go to prisma/schema copy 3.prisma
  //-----------
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  //4----------
  session :{
    strategy:"jwt"
  }
});

export { handler as GET, handler as POST };

