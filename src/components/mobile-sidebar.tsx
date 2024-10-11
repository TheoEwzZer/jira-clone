"use client";

import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const MobileSidebar: () => ReactElement = (): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname: string = usePathname();

  useEffect((): void => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet
      modal={false}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="lg:hidden"
        >
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0"
      >
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
