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
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "./ui/sidebar";

export const Projects: () => ReactElement = (): ReactElement => {
  const workspaceId: string = useWorkspaceId();
  const { data, isLoading } = useGetProjects({ workspaceId });
  const pathname: string = usePathname();
  const { open } = useCreateProjectModal();

  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs uppercase text-neutral-500">
          Projects
        </SidebarGroupLabel>
        <SidebarGroupAction title="Add Project">
          <RiAddCircleFill className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" />
          <span className="sr-only">Add Project</span>
        </SidebarGroupAction>
        <SidebarGroupContent>
          <SidebarMenu>
            {Array.from({ length: 5 }).map(
              (_: unknown, index: number): ReactElement => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs uppercase text-neutral-500">
        Projects
      </SidebarGroupLabel>
      <SidebarGroupAction
        title="Add Project"
        onClick={open}
      >
        <RiAddCircleFill className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" />
        <span className="sr-only">Add Project</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
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
              const href: string = `/workspaces/${workspaceId}/projects/${project.$id}`;
              const isActive: boolean = pathname === href;

              return (
                <Link
                  key={project.$id}
                  href={href}
                >
                  <div
                    className={cn(
                      "flex h-8 cursor-pointer items-center gap-2.5 rounded-md p-2.5 px-2 text-neutral-500 transition hover:opacity-75",
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
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
