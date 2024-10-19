//7-57-Securing the Application

//1-the functionality to redirect the user to the login page is already 
//implemented in next auth, so we don't have to implement it.All we have
//to do is import and export it from this module.
export { default } from "next-auth/middleware";

//2-we should also export a configuration object to specify on which 
//routes this middleware function should be applied.
export const config ={
    //3-In the array of matcher property we define the paths that we
    //want to prevent.here we prevent the new page and edit page from
    //anonymous users.
    matcher:[
        "/issues/new",
        //We apply + modifier to our parameter id to include one or more
        //parameters that come after edit path. 
        "/issues/edit/:id+"
    ]
}

//Go to app/issues/[id]/page copy 13.tsx 