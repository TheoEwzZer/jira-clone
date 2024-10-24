import { client } from "@/lib/rpc";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface UseGetTasksProps {
  workspaceId: string;
}

export const useGetTasks: ({ workspaceId }: UseGetTasksProps) => UseQueryResult<
  {
    total: number;
    documents: {
      [x: string]: any;
      $id: string;
      $collectionId: string;
      $databaseId: string;
      $createdAt: string;
      $updatedAt: string;
      $permissions: string[];
    }[];
  },
  Error
> = ({ workspaceId }: UseGetTasksProps) => {
  return useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
