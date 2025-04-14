import { ReactNode } from "react";
import BackgroundPattern from "@/components/background-pattern";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
}
