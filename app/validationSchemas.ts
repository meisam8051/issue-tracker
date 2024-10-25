//7-63-Implementing the API

import { z } from "zod";

export const IssuesSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
});

//2-We want our patch endpoint to be more flexible.Perhaps we want to
//update the title and description that is used in our edit issue page or
//somewhere else using our select component we want to update assigned to
//user ID and in the future maybe we want to update the status of an issue.

//To To do that we have to create a separate schema and declare all these
//properties as optional.
export const PatchIssuesSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535) //The type of the description column is Text (fig 63-1).In
    //text columns we can store a maximum of 65,535 characters.
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")//If we provide assignedToUserId 
    //we should have at least one character.
    .max(255)
    .optional()
    .nullable(),//we want to make this nullable so we can explicitly 
    //provide null here to unassign an issue.

});

//Go back to api/issues/[id]/route copy 5.tsx