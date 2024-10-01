// 7-48-Setting Up NextAuth

import NextAuth from "next-auth"

//1-we copied this from the documentaion of Nextauth(fig 48-1).
//To set up NixAuth,In this file, we create a NextAuth handler 
//and export it as a get and post function.
const handler = NextAuth({
  providers:[]
})

export { handler as GET, handler as POST }

//Go to app/.env copy 2 