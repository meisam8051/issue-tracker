import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssuesSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOption";


export async function POST(request: NextRequest) {
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });


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
