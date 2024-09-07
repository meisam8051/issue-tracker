import { z } from "zod";


export const createdIssuesSchema = z.object({  
    title: z.string().min(1,"Title is required.").max(255),
    description: z.string().min(1,"Description is required.")
})

//2-here we can add all our validation schemas in this file.
//Go to app/issues/new/page copy 10.tsx