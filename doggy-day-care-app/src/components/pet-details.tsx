"use client";

import React from "react";
import Image from "next/image";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import PetButton from "./pet-button";
import { start } from "repl";

export default function PetDetails() {
  const { selectedPet } = usePetContext();
  return (
    <section className="flex flex-col w-full h-full">
      {!selectedPet ? (
        <div className="h-full flex justify-center items-center">
          <EmptyView />
        </div>
      ) : (
        <>
          {" "}
          <TopBar selectedPet={selectedPet} />
          <PetInfo selectedPet={selectedPet} />
          <PetNotes selectedPet={selectedPet} />
        </>
      )}
    </section>
  );
}

type PetDetailsProps = {
  selectedPet: Pet;
};

function TopBar({ selectedPet }: PetDetailsProps) {
  const { handleCheckOutPet } = usePetContext();
  const [isPending, startTransition] = React.useTransition();
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={
          selectedPet.imageUrl ??
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"
        }
        alt="selected pet image"
        height={75}
        width={75}
        className="h-[75px] w-[75px] rounded object-cover"
      />
      <h2 className="text-3xl font-semibold leading-y ml-5">
        {selectedPet.name}
      </h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          onClick={async () => {
            startTransition(async () => {
              await handleCheckOutPet(selectedPet.id);
            });
          }}
          disabled={isPending}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function PetInfo({ selectedPet }: PetDetailsProps) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner Name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet.ownerName}</p>
      </div>

      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet.age}</p>
      </div>
    </div>
  );
}

function PetNotes({ selectedPet }: PetDetailsProps) {
  return (
    <section className="flex-1 px-7 py-5 mb-9 mx-8 bg-white rounded-md border border-light">
      {selectedPet?.notes}
    </section>
  );
}

function EmptyView() {
  return <p className="text-2xl font-medium">no pet selected</p>;
}
