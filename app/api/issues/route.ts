// 3-20-Implementing Client-side Validation

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createdIssuesSchema } from "@/app/validationSchemas";

//1-We can also use this schema for validating our form in client-side.
//So we have to grab this schema and put it into a separate module so 
//we can reuse it in two places.
//For doing that we use the refactoring commands in VScode.We put the
//cursor in our credentialIssues constant and right click and choose 
//refactor command(fig 20-1).Then choose "move to a new file" option.
//(fig 20-2).Or we can manually do that
//Go to app/validationSchemas.ts

// const createdIssues = z.object({  
//     title: z.string().min(1,"Title is required.").max(255),
//     description: z.string().min(1,"Description is required.")
// })

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createdIssuesSchema.safeParse(body)
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

