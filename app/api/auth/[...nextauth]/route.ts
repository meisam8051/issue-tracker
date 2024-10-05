// 7-49-Configuring Google Provider

import NextAuth from "next-auth";
//2-
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    //3-here we have an error saying type, string, or undefined is not 
    //assignable to type, string.So the TypeScript compiler doesn't know
    //that we have this variable in our ENV file.So here we have to add 
    //an exclamation mark at the end to sell the TypeScript compiler 
    //that yes, we do have a value for this environment variable.
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };


