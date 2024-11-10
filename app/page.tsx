//11-81-Adding Metadata

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
//1-For title and description for our page we use metadata constant.
//Make sure to spell metadata properly, because this is one of the 
//constants that NextJS looks for.
export const metadata:Metadata ={
  title:"Issue Tracker - Dashboard",
  description:"View a summary of project issues"
}
//At a minimum, we should provide a title and a description, but it's 
//also better to add open graph and Twitter properties.So people can 
//easily share our content on social media.

//Go to app/issues/list/page copy 25.tsx 
