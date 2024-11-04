//9-74-Implementing Pagination
import Pagination from "./components/Pagination";

//5-Here instead of hard coding, the current page, we should read this 
//from query parameters.
export default function Home(
  { searchParams }:
    { searchParams: { page: string } }) {
  return (
    <Pagination itemCount={100} pageSize={10}
      currentPage={parseInt(searchParams.page) || 1} />
  )
}

