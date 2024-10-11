import { z } from "zod";

export const loginSchema: z.ZodObject<
  {
    email: z.ZodString;
    password: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    email: string;
    password: string;
  },
  {
    email: string;
    password: string;
  }
> = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema: z.ZodObject<
  {
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    name: string;
    email: string;
    password: string;
  },
  {
    name: string;
    email: string;
    password: string;
  }
> = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
