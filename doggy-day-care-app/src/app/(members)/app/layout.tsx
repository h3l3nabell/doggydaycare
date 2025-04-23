import { ReactNode } from "react";
import BackgroundPattern from "@/components/background-pattern";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import PetContextProvider from "@/contexts/pet-context-provider";
import { Pet } from "@/lib/types";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";

export default async function Layout({ children }: { children: ReactNode }) {
  const pets: Pet[] = await prisma.pet.findMany();
  console.log("pets from db", pets);

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
