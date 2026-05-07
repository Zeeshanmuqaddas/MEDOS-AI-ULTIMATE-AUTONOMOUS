import React from "react";
import { 
  Activity, 
  BrainCircuit, 
  Dna, 
  Globe2, 
  HeartPulse, 
  Microscope, 
  Radio, 
  ShieldAlert, 
  Stethoscope,
  Terminal
} from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { icon: ShieldAlert, label: "Command Center", active: true },
  { icon: HeartPulse, label: "ICU Swarm", active: false },
  { icon: Radio, label: "Emergency Routing", active: false },
  { icon: Dna, label: "Precision Engine", active: false },
  { icon: Microscope, label: "Diagnostics", active: false },
  { icon: Globe2, label: "Global AI Net", active: false },
  { icon: Terminal, label: "System Logs", active: false },
];

export function Sidebar() {
  return (
    <aside className="glass-panel z-20 flex w-64 flex-col justify-between border-y-0 border-l-0">
      <div>
        <div className="flex items-center gap-3 border-b border-slate-800 p-6">
          <BrainCircuit className="h-8 w-8 text-medos-cyan" />
          <div>
            <h1 className="font-sans text-xl font-bold tracking-widest text-white">MEDOS<span className="text-medos-cyan">AI</span></h1>
            <p className="font-mono text-[10px] uppercase text-medos-cyan opacity-80">Autonomous Health OS</p>
          </div>
        </div>

        <nav className="mt-6 flex flex-col gap-1 px-4">
          <div className="mb-2 px-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">Neural Modules</span>
          </div>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className={cn(
                "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                item.active 
                  ? "bg-medos-cyan/10 text-medos-cyan border border-medos-cyan/20 neon-border" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              )}
            >
              <item.icon className={cn("h-4 w-4", item.active ? "text-medos-cyan" : "text-slate-500 group-hover:text-medos-cyan transition-colors")} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
             <Activity className="h-3 w-3 text-medos-green animate-pulse" />
          </div>
          <div className="font-mono text-xs text-slate-400">System Status</div>
          <div className="mt-1 font-sans text-sm font-bold text-medos-green">OPERATIONAL</div>
          
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-slate-500">
            <span>UPTIME</span>
            <span className="text-slate-300">99.999%</span>
          </div>
          <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-slate-500">
            <span>ACTIVE AGENTS</span>
            <span className="text-slate-300">1,248</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
