"use client";

import { Loader } from "lucide-react";
import { ReactElement } from "react";

const LoadingPage: () => ReactElement = (): ReactElement => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default LoadingPage;
