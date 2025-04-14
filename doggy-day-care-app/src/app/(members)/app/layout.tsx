import { ReactNode } from "react";
import BackgroundPattern from "@/components/background-pattern";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto px-4">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
}
