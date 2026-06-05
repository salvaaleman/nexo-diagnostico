"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardShellProps {
  children: React.ReactNode;
  clientName: string;
}

export default function DashboardShell({
  children,
  clientName,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#0F1B2D]">
      <Sidebar />

      <div className="ml-[260px] flex min-h-screen flex-col">
        <Header clientName={clientName} />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}