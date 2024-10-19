// 7-59-Populating the Assignee Select Component

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

//2-technically we don't need the request here because we are not going
//to read anything in the body of the request.However, if we remove this
//parameter, next JS will cache the output of this endpoint.So to prevent
//caching, we pass request to our GET function.
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany(
    //3-to sort the users by their name we set orderBy.name is the
    //propertythat we want to use for sorting
    {
      orderBy: { name: "asc" },
    }
  );
  return NextResponse.json(users);
}

//Go back to app/issues/[id]/AssigneeSelect copy 2.tsx