// 5-40- Improving the Loading Experience

//1-when we refresh this page.We see the title field immediately and 
//then our editor appears after a second look.(fig 40-1)The reason this
//is happening is because we are loading this editor dynamically.We are 
//using lazy loading.To solve this problem, we have to load the entire 
//form dynamically.So both these fields appear together.

// import IssueForm from '../_components/IssueForm';

//2-We import dynamic func
import dynamic from "next/dynamic"

//3-
const IssueForm = dynamic(
  () => import("@/app/issues/_components/IssueForm"),
  {
    ssr: false
  }
)
//Go to app/issues/_components/issueForm.tsx


const NewIssuePage = () => {
  return <IssueForm />

}


export default NewIssuePage

