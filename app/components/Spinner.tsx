//3-22-Adding a Spinner
import React from 'react';

//1-We created a reusable component and put the spinner code here.
const Spinner = () => {
    return (
        <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
            >
        </div>
    )
}
{/* 2-we can change the size of our spinner by changing it's height and
width and border tailwind classes 

Go to issues/new/page copy 14.tsx */}

export default Spinner;

{/* For renaming several same names, we put cursor in one of thoses and 
press ctrl+shift+L to select all of them.
For select just next one of those we press ctrl+D */}