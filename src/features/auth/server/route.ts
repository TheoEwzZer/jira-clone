import { zValidator } from "@hono/zod-validator";
import { Context, Hono } from "hono";
import { loginSchema, registerSchema } from "../schemas";

const app = new Hono()
  .post(
    "/login",
    zValidator("json", loginSchema),
    (
      c: Context<
        {},
        "/login",
        {
          in: {
            json: {
              email: string;
              password: string;
            };
          };
          out: {
            json: {
              email: string;
              password: string;
            };
          };
        }
      >
    ) => {
      const { email, password } = c.req.valid("json");

      console.log(email, password);

      return c.json({
        email,
        password,
      });
    }
  )
  .post(
    "/register",
    zValidator("json", registerSchema),
    (
      c: Context<
        {},
        "/register",
        {
          in: {
            json: {
              name: string;
              email: string;
              password: string;
            };
          };
          out: {
            json: {
              name: string;
              email: string;
              password: string;
            };
          };
        }
      >
    ) => {
      const { name, email, password } = c.req.valid("json");

      console.log(name, email, password);

      return c.json({
        name,
        email,
        password,
      });
    }
  );

export default app;
