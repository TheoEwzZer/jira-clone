import { DATABASE_ID, MEMBERS_ID, TASKS_ID } from "@/config";
import { getMember } from "@/features/members/util";
import { Project } from "@/features/projects/types";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Models, Query } from "node-appwrite";
import { z } from "zod";
import { createTaskSchema } from "../schemas";
import { TaskStatus } from "../types";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
        projectId: z.string().nullish(),
        assigneeId: z.string().nullish(),
        status: z.nativeEnum(TaskStatus).nullish(),
        search: z.string().nullish(),
        dueDate: z.string().nullish(),
      })
    ),
    async (c) => {
      const { users } = await createAdminClient();
      const databases = c.get("databases");
      const user: Models.User<Models.Preferences> = c.get("user");

      const { workspaceId, projectId, assigneeId, status, search, dueDate } =
        c.req.valid("query");

      const member: Models.Document = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const query: string[] = [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ];

      if (projectId) {
        console.log("projectId", projectId);
        query.push(Query.equal("projectId", projectId));
      }

      if (status) {
        console.log("status", status);
        query.push(Query.equal("status", status));
      }

      if (assigneeId) {
        console.log("assigneeId", assigneeId);
        query.push(Query.equal("assigneeId", assigneeId));
      }

      if (dueDate) {
        console.log("dueDate", dueDate);
        query.push(Query.equal("dueDate", dueDate));
      }

      if (search) {
        console.log("search", search);
        query.push(Query.search("name", search));
      }

      const tasks: Models.DocumentList<Models.Document> =
        await databases.listDocuments(DATABASE_ID, TASKS_ID, query);

      const projectIds: string[] = tasks.documents.map(
        (task: Models.Document): string => task.projectId
      );
      const assigneeIds: string[] = tasks.documents.map(
        (task: Models.Document): string => task.assigneeId
      );

      const projects: Models.DocumentList<Project> =
        await databases.listDocuments<Project>(
          DATABASE_ID,
          TASKS_ID,
          projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
        );

      const members: Models.DocumentList<Models.Document> =
        await databases.listDocuments(
          DATABASE_ID,
          MEMBERS_ID,
          assigneeIds.length > 0 ? [Query.contains("$id", assigneeIds)] : []
        );

      const assignees: {
        name: string;
        email: string;
        $id: string;
        $collectionId: string;
        $databaseId: string;
        $createdAt: string;
        $updatedAt: string;
        $permissions: string[];
      }[] = await Promise.all(
        members.documents.map(async (member: Models.Document) => {
          const user: Models.User<Models.Preferences> = await users.get(
            member.userId
          );

          return {
            ...member,
            name: user.name,
            email: user.email,
          };
        })
      );

      const populatedTasks: {
        project: Project | undefined;
        assignee: Models.Document | undefined;
        $id: string;
        $collectionId: string;
        $databaseId: string;
        $createdAt: string;
        $updatedAt: string;
        $permissions: string[];
      }[] = tasks.documents.map((task: Models.Document) => {
        const project: Project | undefined = projects.documents.find(
          (project: Project): boolean => project.$id === task.projectId
        );

        const assignee:
          | {
              name: string;
              email: string;
              $id: string;
              $collectionId: string;
              $databaseId: string;
              $createdAt: string;
              $updatedAt: string;
              $permissions: string[];
            }
          | undefined = assignees.find(
          (assignee: Models.Document): boolean =>
            assignee.$id === task.assigneeId
        );

        return {
          ...task,
          project,
          assignee,
        };
      });

      return c.json({
        data: {
          ...tasks,
          documents: populatedTasks,
        },
      });
    }
  )
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", createTaskSchema),
    async (c) => {
      const user: Models.User<Models.Preferences> = c.get("user");
      const databases = c.get("databases");
      const { name, status, workspaceId, projectId, dueDate, assigneeId } =
        c.req.valid("json");

      const member: Models.Document = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const highestPositiontask: Models.DocumentList<Models.Document> =
        await databases.listDocuments(DATABASE_ID, TASKS_ID, [
          Query.equal("status", status),
          Query.equal("workspaceId", workspaceId),
          Query.orderAsc("position"),
          Query.limit(1),
        ]);

      const newPosition: number =
        highestPositiontask.documents.length > 0
          ? highestPositiontask.documents[0].position + 1000
          : 1000;

      const task: Models.Document = await databases.createDocument(
        DATABASE_ID,
        TASKS_ID,
        ID.unique(),
        {
          name,
          status,
          workspaceId,
          projectId,
          dueDate,
          assigneeId,
          position: newPosition,
        }
      );

      return c.json({ data: task });
    }
  );

export default app;
