"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";

type PetFormProps = {
  actionType: "add" | "edit";
  className?: string;
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  className,
  onFormSubmission,
}: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`form submitted ${actionType} for pet: ${selectedPet?.name}`);
    const formData = new FormData(event.currentTarget);
    const petFormData: Omit<Pet, "id"> = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: Number(formData.get("age")),
      notes: formData.get("notes") as string,
    };

    console.log(petFormData);

    if (actionType === "add") {
      handleAddPet(petFormData);
    } else {
      handleEditPet(selectedPet?.id ?? "", petFormData);
    }
    onFormSubmission();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col font-medium text-2xl leading-6", className)}
    >
      <fieldset className=" space-y-3">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={actionType === "edit" ? selectedPet?.name : ""}
        />

        <Label htmlFor="ownerName">Owner Name</Label>
        <Input
          id="ownerName"
          name="ownerName"
          type="text"
          required
          defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
        />

        <Label htmlFor="imageUrl">Image Url</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="text"
          defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
        />

        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          required
          defaultValue={actionType === "edit" ? selectedPet?.age : ""}
        />

        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          required
          defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
        />
      </fieldset>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Add Pet" : "Save Pet"}
      </Button>
    </form>
  );
}
