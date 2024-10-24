import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-member";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { ReactElement } from "react";
import { CreateTaskForm } from "./create-task-form";

interface CreateTaskFormWrapperProps {
  onCancel: () => void;
}

export const CreateTaskFormWrapper: (
  props: CreateTaskFormWrapperProps
) => ReactElement = ({
  onCancel,
}: CreateTaskFormWrapperProps): ReactElement => {
  const workspaceId: string = useWorkspaceId();

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOptions:
    | {
        id: string;
        name: any;
        imageUrl: any;
      }[]
    | undefined = projects?.documents.map(
    (project: {
      [x: string]: any;
      $id: string;
      $collectionId: string;
      $databaseId: string;
      $createdAt: string;
      $updatedAt: string;
      $permissions: string[];
    }) => ({
      id: project.$id,
      name: project.name,
      imageUrl: project.imageUrl,
    })
  );

  const memberOptions:
    | {
        id: string;
        name: string;
      }[]
    | undefined = members?.documents.map(
    (member: {
      name: string;
      email: string;
      $id: string;
      $collectionId: string;
      $databaseId: string;
      $createdAt: string;
      $updatedAt: string;
      $permissions: string[];
    }) => ({
      id: member.$id,
      name: member.name,
    })
  );

  const isLoading: boolean = isLoadingProjects || isLoadingMembers;

  if (isLoading) {
    return (
      <Card className="h-[714px] w-full border-none shadow-none">
        <CardContent className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <CreateTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  );
};
