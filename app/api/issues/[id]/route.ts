//7-63-Implementing the API

import authOption from "@/app/auth/authOption";
import { PatchIssuesSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

//1-we want to extend this PATCH function to update the assignedtoUserid
//field.
//Go to app/validationSchemas.ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //6-For testing we should also comment out this two line for preventing 
  //unauthorized error. 
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  //3-we use our new flexible schema for validation using Zod.
  const validation = PatchIssuesSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  //4-if the assignedToUserId have a usedId value, in the body of the 
  //request we want to make sure that that is a valid user.
  const { title, description, assignedToUserId } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }
  }

  //Here we validate the issue.We want to make sure that the client is 
  //updating a valid issue.
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue." }, { status: 404 });
  const updateIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    //5-Now with this implementation if any of the following properties 
    //are not set if they're undefined they're not going to be updated.
    data: {
      //here we use destructuring of body to simplify our data object.
      title,
      description,
      assignedToUserId,
    },
  });
  return NextResponse.json(updateIssue);
}

//6-For testing our implementation,we install postamn extension of vscode
//and sign in to it.(fig 63-2,63-3,63-4,63-5,63-6,63-7) 

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue." }, { status: 404 });

  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({});
}
