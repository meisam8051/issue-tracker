// 4-33-Refactoring- Organizing Imports

//2-So we go to our "components folder" and add an "index file" for 
//exporting the components in this folder.


import Link from "./Link";
import ErrorMessage from "./ErrorMessage";
import IssueStatusBadge from "./IssueStatusBadge";
import Spinner from "./Spinner";


export {Link};
export {ErrorMessage};
export {IssueStatusBadge};
export {Spinner};

//Go to issues/page copy 15.tsx