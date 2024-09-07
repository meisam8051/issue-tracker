import React, { PropsWithChildren, ReactNode } from 'react';
import { Text } from '@radix-ui/themes';


//2-we can define Interface for arguments type
// interface Prop {
//     Children: ReactNode
// }
//Or using the PropsWithChildren type from react for defining the types
//of the children
const ErrorMessage = ({ children }: PropsWithChildren) => {
    //3-We can also check the exsistence of error here.
    //Go to issues/new/page copy 13.tsx
    if (!children) return null
    return (
        <Text color='red' as='p'>{children}</Text>
    )
}

export default ErrorMessage