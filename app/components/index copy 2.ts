//4-Instead of explicitly importing each component first and then 
//exporting it, we can import and export each component in one go.


export {default as Link} from "./Link"; //5-We export the default object 
//from this module ./Link as a Link
export {default as ErrorMessage} from "./ErrorMessage";
export {default as IssueStatusBadge} from "./IssueStatusBadge";
export {default as Spinner} from "./Spinner";

//Go to issues/[id]/loading copy 3.tsx