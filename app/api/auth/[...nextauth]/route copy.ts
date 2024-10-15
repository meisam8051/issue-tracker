// 7-48-Setting Up NextAuth

import NextAuth from "next-auth"

//1-we copied this configuration from the documentaion of Nextauth
//(fig 48-1).To set up NexAuth,In this file, we create "a NextAuth 
//handler" and "export" it as a "GET and POST function".
const handler = NextAuth({
  //we use providers prop with an empty array for preventing syntax 
  //error at this time.
  providers:[]
})

export { handler as GET, handler as POST }

//Go to app/.env copy 2 