// 5-37-Building an API

import { z } from "zod";

//3-We called our schema, "createIssueSchema", but this name no longer 
//applies here.So let's rename it to something more general 
//==>IssuesSchema
//Then we should change the name of it for all place we import it to use.
//Go back to api/issues/[id]/route.ts

export const IssuesSchema = z.object({  
    title: z.string().min(1,"Title is required.").max(255),
    description: z.string().min(1,"Description is required.")
})

