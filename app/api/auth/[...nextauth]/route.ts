//7-57-Securing the Application

import authOption from "@/app/auth/authOption";
import NextAuth from "next-auth";


const handler = NextAuth(authOption);

export { handler as GET, handler as POST };

//Go back to app/issues/[id]/page copy 13.tsx