// 3-21-Extracting the ErrorMessage

import React, { PropsWithChildren, ReactNode } from 'react';
import { Text } from '@radix-ui/themes';


//2-we can define an Interface for arguments type of this component.
// interface Prop {
//     Children: ReactNode
// }
//Or using the "PropsWithChildren" type from "react" for defining the 
//type of the children
const ErrorMessage = ({ children }: PropsWithChildren) => {
    //3-We can also check the exsistence of error here.
    //Go to issues/new/page copy 13.tsx
    if (!children) return null
    //--------------------------------
    return (
        <Text color='red' as='p'>{children}</Text>
    )
}

export default ErrorMessage