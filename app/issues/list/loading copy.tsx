//4-26-Adding Loading Skeletons
import React from 'react'

//1-So when Next.js finds "a loading file" next to "a page", it will 
//render that "loading component" while that page is being rendered.
//Go to issues/page copy 7.tsx
const loadingIssuePage = () => {
  return (
    <div>Loading...</div>
  )
}

export default loadingIssuePage