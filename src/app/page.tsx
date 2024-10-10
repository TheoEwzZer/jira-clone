import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <div>
      <Input />
      <Button
        variant="primary"
        disabled
      >
        default
      </Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="outline">outline</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="muted">muted</Button>
      <Button variant="teritary">teritary</Button>
    </div>
  );
}
