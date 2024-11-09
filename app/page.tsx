//10-79-Building the BarChart Component

import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";





export default async function Home() {

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
    //9-(figure 79-1)
    <IssueChart open={open} closed={closed} inProgress={inProgress}/>
  )
}
//Go to IssueChart copy 2.tsx 
