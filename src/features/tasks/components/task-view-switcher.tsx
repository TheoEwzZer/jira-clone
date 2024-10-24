"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import { ReactElement } from "react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

export const TaskViewSwitcher: () => ReactElement = (): ReactElement => {
  const { open } = useCreateTaskModal();

  return (
    <Tabs
      defaultValue="table"
      className="w-full flex-1 rounded-lg border"
    >
      <div className="flex h-full flex-col overflow-auto p-4">
        <div className="flex flex-col items-center justify-between gap-y-2 md:flex-row">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger
              className="h-8 w-full md:w-auto"
              value="table"
            >
              Table
            </TabsTrigger>
            <TabsTrigger
              className="h-8 w-full md:w-auto"
              value="kanban"
            >
              Kanban
            </TabsTrigger>
            <TabsTrigger
              className="h-8 w-full md:w-auto"
              value="calendar"
            >
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button
            size="sm"
            className="w-full md:w-auto"
            onClick={open}
          >
            <PlusIcon className="mr-2 size-4" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        Data filters
        <DottedSeparator className="my-4" />
        <TabsContent
          value="table"
          className="mt-0"
        >
          Data table
        </TabsContent>
        <TabsContent
          value="kanban"
          className="mt-0"
        >
          Data kanban
        </TabsContent>
        <TabsContent
          value="calendar"
          className="mt-0"
        >
          Data calendar
        </TabsContent>
      </div>
    </Tabs>
  );
};
