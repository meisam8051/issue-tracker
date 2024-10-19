//7-57-Securing the Application

import authOption from "@/app/auth/authOption";
import { IssuesSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //11-
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });
  //------------
  const body = await request.json();
  const validation = IssuesSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
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
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updateIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //12-
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });
  //Thenwe can test it with postman.

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
