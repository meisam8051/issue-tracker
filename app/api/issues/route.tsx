//3-13-Building an API

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
    console.log(validation)
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(newIssue, { status: 201 })
}





//zod 3.22.2