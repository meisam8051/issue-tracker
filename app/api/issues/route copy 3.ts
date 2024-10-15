// 3-19-Handling Errors

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createdIssues = z.object({
    //3-Now we can also customize these error messages.By adding the 
    //second argument to the "min() method",we can provide a "custom error".
    //(fig 19-3)
     
    title: z.string().min(1,"Title is required.").max(255),
    description: z.string().min(1,"Description is required.")
})

export async function POST(request: NextRequest) {
    const body = await request.json()
    //validation with zod
    const validation = createdIssues.safeParse(body)
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(newIssue, { status: 201 })
}

//4-this technique is useful in situations where we have to rely on the 
//backend to validate the data.For example, if you want to build a 
//"registration form", we want to make sure that the user selects a 
//"unique username".That's not something that we can validate on the 
//client.We have to rely on the backend.In those cases, this is how we 
//can read the error messages returned from the server and then we can 
//show that error to the user.
//Now, in this case, we don't really care about these error messages
//because we shouldn't be able to post the form if the form is invalid.
//For that we're going to use "Client-side validation".
//Go to app/issues/page copy 9.tsx 