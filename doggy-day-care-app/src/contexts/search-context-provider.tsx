"use client";
import React, { createContext, ReactNode, useState } from "react";

type SearchContextProviderProps = {
  children: ReactNode;
};

type SearchContextType = {
  searchQuery: string;
  handleChangeSearchQuery: (newValue: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export default function SearchContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  //state
  const [searchQuery, setSearchQuery] = useState<string>("");
  //derived state

  //actions
  const handleChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
    console.log("searchQuery", newValue);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleChangeSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
