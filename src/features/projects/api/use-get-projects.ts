import { client } from "@/lib/rpc";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface UseGetProjectsProps {
  workspaceId: string;
}

export const useGetProjects: ({
  workspaceId,
}: UseGetProjectsProps) => UseQueryResult<
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
> = ({ workspaceId }: UseGetProjectsProps) => {
  return useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
