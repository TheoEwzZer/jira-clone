import { DATABASE_ID, WORKSPACE_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Models } from "node-appwrite";
import { createWorkspaceSchema } from "../schemas";

const app = new Hono().post(
  "/",
  zValidator("json", createWorkspaceSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const user: Models.User<Models.Preferences> = c.get("user");

    const { name } = c.req.valid("json");

    const workspace: Models.Document = await databases.createDocument(
      DATABASE_ID,
      WORKSPACE_ID,
      ID.unique(),
      {
        name,
        userId: user.$id,
      }
    );

    return c.json({ data: workspace });
  }
);

export default app;
