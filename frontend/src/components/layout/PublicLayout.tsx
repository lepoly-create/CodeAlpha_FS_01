import { Outlet } from "react-router-dom";
import { type ReactNode } from "react";
import PublicFooter from "./PublicFooter";
import PublicNavbar from "./PublicNavbar";

interface PublicLayoutProps {
  children?: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9ff] text-[#141b2b] antialiased selection:bg-[#e59b22] selection:text-white">
      <PublicNavbar />
      <main className="flex-1">
        {children ?? <Outlet />}
      </main>
      <PublicFooter />
    </div>
  );
}