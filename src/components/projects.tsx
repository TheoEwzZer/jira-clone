"use client";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { RiAddCircleFill } from "react-icons/ri";

export const Projects: React.FC = (): ReactElement => {
  const projectId = null; // TODO: Use the useProjectId hook

  const workspaceId: string = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });
  const pathname: string = usePathname();
  const { open } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75"
        />
      </div>
      {data?.documents.map(
        (project: {
          [x: string]: any;
          $id: string;
          $collectionId: string;
          $databaseId: string;
          $createdAt: string;
          $updatedAt: string;
          $permissions: string[];
        }): ReactElement => {
          const href: string = `/workspaces/${workspaceId}/projects/${projectId}`;
          const isActive: boolean = pathname === href;

          return (
            <Link
              key={project.$id}
              href={href}
            >
              <div
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-md p-2.5 text-neutral-500 transition hover:opacity-75",
                  isActive &&
                    "bg-white text-primary shadow-sm hover:opacity-100"
                )}
              >
                <ProjectAvatar
                  image={project.imageUrl}
                  name={project.name}
                />
                <span className="truncate">{project.name}</span>
              </div>
            </Link>
          );
        }
      )}
    </div>
  );
};
