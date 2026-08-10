import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AppHeader />

        <main className="flex-1 overflow-y-auto px-9 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}