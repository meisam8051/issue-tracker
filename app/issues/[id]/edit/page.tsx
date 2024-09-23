//5-36-Building the Edit Issue Page
import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

//1-Now the edit page is identical to the new page.So we should go to 
//the new page, grab all the code and move it into a component that 
//we can reuse on both these pages.
//Go to issues/_components/IssueForm.tsx


//5-Here we also use IssueForm.But to use this form, first we have to 
//fetch the given issue and populate the form with that issue.

//6-So here we're going to add a type for capturing route 
//parameters.
interface Props {
  params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {

  //7-we have to use Prisma to fetch the issue with the given ID.
  //Go to _components/IssueForm.tsx
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })

  if (!issue) notFound()

  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage