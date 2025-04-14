import React, { ReactNode } from "react";

export default function H1({ children }: { children: ReactNode }) {
  return <h1 className="mt-auto border-t border-black/5 py-5 ">{children}</h1>;
}
