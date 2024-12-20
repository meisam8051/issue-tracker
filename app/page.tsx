import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";



export default async function Home() {

  const open = await prisma.issue.count({
    where: {
      status: "OPEN"
    }
  })
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED"
    }
  })
  const inProgress = await prisma.issue.count({
    where: {
      status: "In_PROGRESS"
    }
  })


  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} closed={closed} inProgress={inProgress} />
        <IssueChart open={open} closed={closed} inProgress={inProgress} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
export const metadata:Metadata ={
  title:"Issue Tracker - Dashboard",
  description:"View a summary of project issues"
}

export const dynamic ="force-dynamic"