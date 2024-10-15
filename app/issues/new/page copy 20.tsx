// 5-40- Improving the Loading Experience

import dynamic from "next/dynamic"
import IssueFormSkeleton from "../_components/IssueFormSkeleton"

//5-Because of lazy loading of entire IssueForm,we can't see our loading
//skeleton
const IssueForm = dynamic(
  () => import("@/app/issues/_components/IssueForm"),
  {
    // 6-Here we have a "loading property" to see a loading message.So 
    //instead of this loading message, now we want to show our loading 
    //skeletons.
    //Go to issues/new/loading copy 4.tsx
    loading: () => <p>Loading...</p>,
    ssr: false
  }
)

const NewIssuePage = () => {
  return <IssueForm />

}


export default NewIssuePage

