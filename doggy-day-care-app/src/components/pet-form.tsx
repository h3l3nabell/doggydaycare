import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type PetFormProps = {
  children?: ReactNode;
  className?: string;
};

export default function PetForm({ children, className }: PetFormProps) {
  return (
    <form className={cn("font-medium text-2xl leading-6 ", className)}>
      {children}
      pet form details ...
    </form>
  );
}
