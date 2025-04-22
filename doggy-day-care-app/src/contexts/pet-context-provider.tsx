"use client";
import { Pet } from "@/lib/types";
import React, { createContext, ReactNode, useState } from "react";

type PetContextProviderProps = {
  data: Pet[];
  children: ReactNode;
};

type PetContextType = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleCheckOutPet: (id: string) => void;
  handleChangeSelectedPetId: (id: string) => void;
};

export const PetContext = createContext<PetContextType | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  //state
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  //actions
  const handleAddPet = (inputPet: Omit<Pet, "id">) => {
    console.log("adding pet ", inputPet);
    const newPet: Pet = { ...inputPet, id: Date.now().toString() };
    setPets((prev) => [...prev, newPet]);
  };

  const handleCheckOutPet = (id: string) => {
    console.log("removing pet ", id);
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
    console.log(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleAddPet,
        handleCheckOutPet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
