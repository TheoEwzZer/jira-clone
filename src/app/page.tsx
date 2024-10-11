"use client";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";

export default function Home(): ReactElement {
  const router: AppRouterInstance = useRouter();
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();

  useEffect((): void => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [isLoading, data]);

  return (
    <div>
      Only visible to authenticated users
      <Button onClick={(): void => mutate()}>Logout</Button>
    </div>
  );
}
