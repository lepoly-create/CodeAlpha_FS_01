import { type ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

interface AppLayoutProps {
  children?: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#f9f9ff]">
      <AppSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-64">
        <AppHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-9 lg:py-6">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}