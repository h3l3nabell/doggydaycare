import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode } from "react";

type PetButtonProps = {
  children?: ReactNode;
  actionType: "add" | "edit" | "checkout";
};

export default function PetButton({ children, actionType }: PetButtonProps) {
  if (actionType === "add") {
    return (
      <Button size="icon">
        <PlusIcon className="h-6 w-6" />
      </Button>
    );
  }

  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "checkout") {
    return <Button variant="secondary">{children}</Button>;
  }
}
