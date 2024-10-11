import { z } from "zod";

export const createWorkspaceSchema: z.ZodObject<
  {
    name: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    name: string;
  },
  {
    name: string;
  }
> = z.object({
  name: z.string().trim().min(1, "Name is required"),
});
