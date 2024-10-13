import { useParams } from "next/navigation";

export const useWorkspaceId: () => string = (): string => {
  const params = useParams();
  return params.workspaceId as string;
};
