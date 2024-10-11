import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";
import { Hono } from "hono";
import { BlankEnv, BlankSchema, FetchEventLike } from "hono/types";
import { handle } from "hono/vercel";

const app: Hono<BlankEnv, BlankSchema, "/api"> = new Hono().basePath("/api");

const routes = app.route("/auth", auth).route("/workspaces", workspaces);

export const GET: (
  req: Request,
  requestContext: FetchEventLike
) => Response | Promise<Response> = handle(app);
export const POST: (
  req: Request,
  requestContext: FetchEventLike
) => Response | Promise<Response> = handle(app);

export type AppType = typeof routes;
