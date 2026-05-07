import React from "react";
import { Network, Activity, Brain, Shield } from "lucide-react";

const SWARMS = [
  { name: "CRITICAL CARE SWARM", status: "NOMINAL", active: 420, icon: Activity, color: "text-medos-green" },
  { name: "EMERGENCY SWARM", status: "ELEVATED", active: 156, icon: Shield, color: "text-medos-orange" },
  { name: "DIAGNOSTIC SWARM", status: "PROCESSING", active: 890, icon: Brain, color: "text-medos-cyan" },
];

export function SwarmStatus() {
  return (
    <div className="glass-panel p-5 relative overflow-hidden group">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <h3 className="font-mono text-xs font-bold text-slate-300 flex items-center gap-2">
          <Network className="w-4 h-4 text-medos-cyan" />
          MULTI-AGENT SWARM INTEL
        </h3>
        <span className="font-mono text-[9px] text-medos-cyan px-2 py-0.5 border border-medos-cyan/30 rounded-full">LIVE</span>
      </div>

      <div className="space-y-4">
        {SWARMS.map((swarm) => (
          <div key={swarm.name} className="flex justify-between items-center p-2 hover:bg-slate-800/30 transition-colors border border-transparent hover:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                <swarm.icon className={`w-4 h-4 ${swarm.color}`} />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs font-bold text-white tracking-wide">{swarm.name}</span>
                <span className={`font-mono text-[9px] ${swarm.color}`}>{swarm.status}</span>
              </div>
            </div>
            <div className="text-right">
               <div className="font-mono text-sm text-slate-200">{swarm.active}</div>
               <div className="font-mono text-[9px] text-slate-500">AGENTS</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Background decoration */}
      <Network className="absolute -bottom-6 -right-6 w-32 h-32 text-slate-800/30 transition-transform duration-1000 group-hover:scale-110" />
    </div>
  );
}
