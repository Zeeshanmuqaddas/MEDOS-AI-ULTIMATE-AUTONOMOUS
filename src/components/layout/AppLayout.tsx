import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CopilotPanel } from "../copilot/CopilotPanel";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-medos-bg bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed" style={{ backgroundBlendMode: 'overlay', backgroundColor: 'rgba(3, 7, 18, 0.95)' }}>
      {/* Visual scanning line effect */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,182,212,0.05)_50%,transparent_100%)] opacity-30 animate-scan"></div>

      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {children}
        </main>
      </div>
      <CopilotPanel />
    </div>
  );
}
