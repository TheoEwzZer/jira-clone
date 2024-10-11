import { Context, Hono } from "hono";
import { BlankEnv, BlankInput, BlankSchema, FetchEventLike } from "hono/types";
import { handle } from "hono/vercel";

const app: Hono<BlankEnv, BlankSchema, "/api"> = new Hono().basePath("/api");

app.get("/hello", (c: Context<BlankEnv, "/api/hello", BlankInput>) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.get(
  "/project/:projectId",
  (c: Context<BlankEnv, "/api/project/:projectId", BlankInput>) => {
    return c.json({
      projectId: c.req.param("projectId"),
    });
  }
);

export const GET: (
  req: Request,
  requestContext: FetchEventLike
) => Response | Promise<Response> = handle(app);
export const POST: (
  req: Request,
  requestContext: FetchEventLike
) => Response | Promise<Response> = handle(app);
