// 5-40- Improving the Loading Experience

import dynamic from "next/dynamic"
import IssueFormSkeleton from "../_components/IssueFormSkeleton"

const IssueForm = dynamic(
  () => import("@/app/issues/_components/IssueForm"),
  {
    //8-
    loading: () => <IssueFormSkeleton />,
    ssr: false
  }
)
//Go to issues/[id]/edit/loading copy.tsx

const NewIssuePage = () => {
  return <IssueForm />

}


export default NewIssuePage

