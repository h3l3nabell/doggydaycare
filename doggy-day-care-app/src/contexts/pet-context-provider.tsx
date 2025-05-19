"use client";
import { Pet } from "@/lib/types";
import React, {
  createContext,
  ReactNode,
  useOptimistic,
  useState,
} from "react";
import { addPet, checkOutPet } from "@/actions/actions";

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
  handleEditPet: (petId: string, inputPet: Omit<Pet, "id">) => void;
  handleCheckOutPet: (id: string) => void;
  handleChangeSelectedPetId: (id: string) => void;
};

export const PetContext = createContext<PetContextType | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  //state
  const [optimisticPets, setOptimisticPets] = useOptimistic(data);
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  //actions
  const handleAddPet = async (inputPet: Omit<Pet, "id">) => {
    console.log("adding pet in state", inputPet);
    const newPet: Pet = { ...inputPet, id: Date.now().toString() };
    setPets((prev) => [...prev, newPet]);
    //await addPet(inputPet); //This might be a neater approach for offline first PWA
  };

  const handleEditPet = (petId: string, inputPet: Omit<Pet, "id">) => {
    console.log("updating pet in state", inputPet);
    const newPet: Pet = { ...inputPet, id: petId };
    setPets((prev) => prev.map((pet) => (pet.id === petId ? newPet : pet)));
  };

  const handleCheckOutPet = async (id: string) => {
    console.log("removing pet in state", id);
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
    await checkOutPet(id);
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
        handleEditPet,
        handleCheckOutPet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
