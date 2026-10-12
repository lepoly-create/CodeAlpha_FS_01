import { Outlet } from "react-router-dom";
import { type ReactNode } from "react";
import PublicFooter from "./PublicFooter";
import PublicNavbar from "./PublicNavbar";

interface PublicLayoutProps {
  children?: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-950 antialiased selection:bg-neutral-900 selection:text-white">
      <PublicNavbar />
      <main className="flex-1">
        {children ?? <Outlet />}
      </main>
      <PublicFooter />
    </div>
  );
}