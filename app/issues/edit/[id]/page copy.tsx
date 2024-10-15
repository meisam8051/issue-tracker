//5-36-Building the Edit Issue Page
import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

//1-Now the edit page is "identical" to the "new page".So we should go to 
//the "new page", grab all the code and move it into a component that 
//we can reuse on "both these pages".
//Go to issues/_components/IssueForm.tsx


//6-So here we're going "to add a type" for capturing "route 
//parameters".
interface Props {
  params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {

  //7-we have to use Prisma to fetch the issue with the given ID.
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })

  //8-If user manually inserts "an id" in "address bar" for "edit page",
  //we lead it to 404 page if that issue dosen't exit.
  //Go to _components/IssueForm.tsx
  if (!issue) notFound()

  return (
    //5-Here we also use IssueForm.But to use this form, first we have to 
    //fetch "the given issue" and populate the form with that issue.
    <IssueForm issue={issue} />
  )
}


export default EditIssuePage