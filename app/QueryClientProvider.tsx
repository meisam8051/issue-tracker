//7-60-Setting Up React Query

//5-React context is only available in client components.
//Go to app/layout copy 8.tsx
"use client"

import {
    QueryClient,
    //3-because this class shows with our component name, let's rename it 
    //to something else. 
    QueryClientProvider as ReactQueryClientProvider
} from "@tanstack/react-query"
import { PropsWithChildren } from "react"

//2-we create an instance of QueryClient.This query client contains a 
//cache for storing data that we get from the back end.
const queryClient = new QueryClient()

const QueryClientProvider = ({ children }: PropsWithChildren) => {
    return (
        //3-we set the client prop to the client object that we just 
        //created. 
        <ReactQueryClientProvider client={queryClient}>
            {children}
        </ReactQueryClientProvider>
    )
}
//4-the reason we have to create this component to wrap this 
//ReactQueryClientProvider is because this component uses React context 
//to share this queryClient with our component tree.
export default QueryClientProvider