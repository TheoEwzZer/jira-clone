"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { LucideProps, SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, ReactElement, RefAttributes } from "react";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { IconType } from "react-icons/lib";

interface Route {
  label: string;
  href: string;
  icon:
    | IconType
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
  activeIcon:
    | IconType
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
}

const routes: Route[] = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

export const Navigation: () => ReactElement = (): ReactElement => {
  const workspaceId: string = useWorkspaceId();
  const pathname: string = usePathname();

  return (
    <ul>
      {routes.map((item: Route): ReactElement => {
        const fullHref: string = `/workspaces/${workspaceId}${item.href}`;
        const isActive: boolean = pathname === fullHref;
        const Icon:
          | IconType
          | ForwardRefExoticComponent<
              Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
            > = isActive ? item.activeIcon : item.icon;

        return (
          <Link
            key={item.href}
            href={fullHref}
          >
            <div
              className={cn(
                "flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition hover:text-primary",
                isActive && "bg-white text-primary shadow-sm hover:opacity-100"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
