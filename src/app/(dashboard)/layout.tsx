import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { ReactElement, ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: ({ children }: DashboardLayoutProps) => ReactElement = ({
  children,
}: DashboardLayoutProps): ReactElement => {
  return (
    <div className="min-h-screen">
      <SidebarProvider>
        <CreateWorkspaceModal />
        <CreateProjectModal />
        <Sidebar />
        <SidebarInset>
          <main className="flex h-full w-full flex-col">
            <header className="flex h-[4.6rem] shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 h-4"
              />
              <Navbar />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
