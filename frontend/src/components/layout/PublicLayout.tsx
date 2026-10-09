import { Outlet } from "react-router-dom";
import PublicFooter from "./PublicFooter";
import PublicNavbar from "./PublicNavbar";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-950 antialiased selection:bg-neutral-900 selection:text-white">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}