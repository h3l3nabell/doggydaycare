"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode, useState } from "react";
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
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }

  // actionType Add or Edit
  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
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

          <DialogDescription className="sr-only">
            {actionType === "add"
              ? "A form with details for the new pet"
              : "A form with details to edit pet details"}
          </DialogDescription>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmission={() => setIsFormOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
