//7-57-Securing the Application

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssuesSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOption";

//9-Now the last thing we need to do is securing our API endpoints.We 
//could secure routes for creating,editing and deleting by adding them
//to the middleware file.But with this,we also prevent the Api endpoints
//that we want to open to the public.
//to solve that we should protect these route separately

export async function POST(request: NextRequest) {
  //10-with this code we prevent the create issues API endpoint.
  const session = await getServerSession(authOption);
  //the status 401 means the user is unauthorized
  if (!session) return NextResponse.json({}, { status: 401 });

  //Go to api/issues/[id]/route

  const body = await request.json();
  const validation = IssuesSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
