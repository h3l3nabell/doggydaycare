import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";

type PetButtonProps = {
  children?: ReactNode;
  actionType: "add" | "edit" | "checkout";
  onClick?: () => void;
};

export default function PetButton({
  children,
  actionType,
  onClick,
}: PetButtonProps) {
  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }

  // actionType Add or Edit
  return (
    <Dialog>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit pet details"}
          </DialogTitle>
        </DialogHeader>
        <PetForm actionType={actionType} />
      </DialogContent>
    </Dialog>
  );
}
