"use server";
import prisma from "@/lib/db";
import { Pet } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

// Server Actions do not replace the need for security best practices. In production, treat them as public API endpoints:
// validate and sanitize inputs,
// check user permissions, etc.
// Return only what is necessary.
// Server Actions are not automatically protected by NextAuth. You need to implement your own authentication and authorization logic.
// Always enforce authentication and authorization within the action.
// Use Next.js built-in protections (Origin checks, encrypted IDs), but do not rely on them alone.

export async function addPet(pet: Omit<Pet, "id" | "createdAt" | "updatedAt">) {
  try {
    console.log("adding pet", pet);
    await prisma?.pet.create({ data: pet });
  } catch (error) {
    console.error("Error adding pet:", error);
    if (error instanceof Error) {
      return { message: `addPet Error adding pet ${error.message}` };
    } else {
      return { message: `addPet Error adding pet not an Error ${error}` };
    }
  }
}

export async function addPetAction(formData: FormData) {
  await sleep(2000); // Simulate a delay for demonstration purposes
  const petFormData: Omit<Pet, "id" | "createdAt" | "updatedAt"> = {
    name: formData.get("name") as string,
    ownerName: formData.get("ownerName") as string,
    imageUrl:
      (formData.get("imageUrl") as string) ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    age: Number(formData.get("age")),
    notes: formData.get("notes") as string,
  };

  const error = await addPet(petFormData);
  if (error) {
    console.error("Error adding pet:", error);
    if (error instanceof Error) {
      return { message: `addPetAction Error adding pet ${error.message}` };
    } else {
      return { message: `addPetAction Error adding pet not an Error ${error}` };
    }
  }
  console.log("pet add complete", petFormData);
  revalidatePath("/app", "layout");
  console.log("layout revalidated");
}

export async function editPet(
  petId: string,
  inputPet: Omit<Pet, "id" | "createdAt" | "updatedAt">
) {
  try {
    console.log("updating pet", inputPet);
    await prisma?.pet.update({
      where: { id: petId },
      data: inputPet,
    });
  } catch (error) {
    console.error("Error updating pet:", error);
    if (error instanceof Error) {
      return {
        message: `editPet Error updating pet: ${petId} ${error.message}`,
      };
    } else {
      return {
        message: `editPet Error updating pet: ${petId} odd Error ${error}`,
      };
    }
  }
}

export async function editPetAction(petId: string, formData: FormData) {
  await sleep(1000); // Simulate a delay for demonstration purposes
  const petFormData: Omit<Pet, "id" | "createdAt" | "updatedAt"> = {
    name: formData.get("name") as string,
    ownerName: formData.get("ownerName") as string,
    imageUrl:
      (formData.get("imageUrl") as string) ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    age: Number(formData.get("age")),
    notes: formData.get("notes") as string,
  };

  console.log("updating pet", petFormData);
  console.log("petId", petId);
  const error = await editPet(petId, petFormData);
  console.log("called update pet ", petId);

  if (error) {
    console.error("Error updating pet:", error);
    console.log("Error updating pet:", error);
    if (error instanceof Error) {
      return { message: `editPetAction Error updating pet ${error.message}` };
    } else {
      return {
        message: `editPetAction Error updating pet odd Error ${error}`,
      };
    }
  }

  console.log("pet update complete");
  try {
    revalidatePath("/app", "layout");
  } catch (error) {
    console.log("Error revalidating layout:", error);
  }

  console.log("layout revalidated");
}

export async function checkOutPet(id: string) {
  await sleep(1000); // Simulate a delay for demonstration purposes
  try {
    console.log("removing pet", id);
    await prisma?.pet.delete({ where: { id } });
  } catch (error) {
    console.error("Error removing pet:", error);
    if (error instanceof Error) {
      return { message: `checkOutPet Error removing pet ${error.message}` };
    } else {
      return { message: `checkOutPet Error removing pet odd Error ${error}` };
    }
  }
}
