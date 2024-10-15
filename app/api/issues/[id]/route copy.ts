//5-37-Building an API
import { IssuesSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

//1-In this route file, we export a "PATCH" or a "PUT" function for 
//"updating an issue".we should use the "PUT function" for "replacing an 
//object" and the "PATCH function" for updating "one or more properties".
//In this case, we don't want to replace an entire issue.We just want to
//update the "title and description properties".So we use "PATCH function".

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //2-
  const body = await request.json();
  //Go to app/validationSchemas.ts
  //4-
  const validation = IssuesSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  //5-
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue." }, { status: 404 });
  //6-
  const updateIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  //7-
  return NextResponse.json(updateIssue);
}

//8-Then we can test it with "postman software".