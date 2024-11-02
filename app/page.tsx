//9-73-Building the Pagination Component
import Pagination from "./components/Pagination";

export default function Home() {
  return (
   <Pagination itemCount={100} pageSize={10} currentPage={7}/>
  )
}

//Go back to app/components/pagination copy 2.tsx