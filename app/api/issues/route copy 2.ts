// 3-19-Handling Errors

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createdIssues = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function POST(request: NextRequest) {
    const body = await request.json()
    //validation with zod
    const validation = createdIssues.safeParse(body)
    if (!validation.success) {
        //2-if you don't like the structure, if you think this is too 
        //complicated, here we can call the "format() method".And with 
        //this,we'll get a simpler structure.(fig 19-2).Now for each 
        //field in our form, we have a property,here like "title" and 
        //"description".We also have a "generic error" property (here 
        //_errors) for any validation errors that are not specific to 
        //one of these fields.
        //Go to api/issues/route copy 3.tsx

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




