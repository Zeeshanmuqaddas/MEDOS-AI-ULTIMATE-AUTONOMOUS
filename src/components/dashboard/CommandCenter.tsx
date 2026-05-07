import React from "react";
import { SwarmStatus } from "./SwarmStatus";
import { CriticalAlerts } from "./CriticalAlerts";
import { TelemetryStream } from "./TelemetryStream";
import { HospitalCapacity } from "./HospitalCapacity";

export function CommandCenter() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold tracking-wide text-white">GLOBAL COMMAND CENTER</h2>
          <p className="font-mono text-xs text-slate-400 mt-1">{"//"} AUTONOMOUS ORCHESTRATION ACTIVE</p>
        </div>
        <div className="flex gap-2">
           <div className="px-3 py-1 border border-medos-red bg-medos-red/10 text-medos-red font-mono text-[10px] flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-medos-red animate-pulse"></span>
             MASS CASUALTY PROTOCOL: STANDBY
           </div>
           <div className="px-3 py-1 border border-medos-cyan bg-medos-cyan/10 text-medos-cyan font-mono text-[10px] neon-border">
             AI SUPERVISOR: ONLINE
           </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 flex flex-col gap-6">
          <TelemetryStream />
          <div className="grid grid-cols-2 gap-6">
            <SwarmStatus />
            <HospitalCapacity />
          </div>
        </div>
        <div className="col-span-4">
          <CriticalAlerts />
        </div>
      </div>
    </div>
  );
}
