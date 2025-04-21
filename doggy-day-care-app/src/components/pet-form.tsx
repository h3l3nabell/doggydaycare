import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type PetFormProps = {
  actionType: "add" | "edit";
  className?: string;
};

export default function PetForm({ actionType, className }: PetFormProps) {
  return (
    <form
      className={cn("flex flex-col font-medium text-2xl leading-6", className)}
    >
      <fieldset className=" space-y-3">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" />

        <Label htmlFor="ownerName">Owner Name</Label>
        <Input id="ownerName" type="text" />

        <Label htmlFor="imageUrl">Image Url</Label>
        <Input id="imageUrl" type="text" />

        <Label htmlFor="age">Age</Label>
        <Input id="age" type="number" />

        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" rows={3} />
      </fieldset>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Add Pet" : "Save Pet"}
      </Button>
    </form>
  );
}
