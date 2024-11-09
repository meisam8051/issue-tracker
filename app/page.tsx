//10-78-Building the IssueSummary Component

import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";





export default async function Home() {

  //7-we get the numbers of issues that have the status open,closed and
  //inProgress then give them to our IsuueSummary component.fig(78-1) 
  const open = await prisma.issue.count({
    where:{
      status:"OPEN"
    }
  })
  const closed = await prisma.issue.count({
    where:{
      status:"CLOSED"
    }
  })
  const inProgress = await prisma.issue.count({
    where:{
      status:"In_PROGRESS"
    }
  })

  return (
    <IssueSummary open={open} closed={closed} inProgress={inProgress}/>
  )
}

