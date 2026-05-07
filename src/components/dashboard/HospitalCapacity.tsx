import React from "react";
import { Database } from "lucide-react";

export function HospitalCapacity() {
  return (
    <div className="glass-panel p-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <h3 className="font-mono text-xs font-bold text-slate-300 flex items-center gap-2">
          <Database className="w-4 h-4 text-medos-cyan" />
          HOSPITAL CAPACITY MATRIX
        </h3>
      </div>

      <div className="space-y-4">
        {/* Progress bars */}
        <div>
           <div className="flex justify-between font-mono text-[10px] mb-1">
              <span className="text-slate-400">ICU BEDS</span>
              <span className="text-medos-red">92%</span>
           </div>
           <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-medos-red h-full w-[92%] shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
           </div>
        </div>
        
        <div>
           <div className="flex justify-between font-mono text-[10px] mb-1">
              <span className="text-slate-400">VENTILATORS</span>
              <span className="text-medos-orange">75%</span>
           </div>
           <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-medos-orange h-full w-[75%] shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
           </div>
        </div>

        <div>
           <div className="flex justify-between font-mono text-[10px] mb-1">
              <span className="text-slate-400">OPERATING ROOMS</span>
              <span className="text-medos-cyan">45%</span>
           </div>
           <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-medos-cyan h-full w-[45%] shadow-[0_0_8px_var(--color-medos-cyan-glow)]"></div>
           </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-800">
         <p className="font-mono text-[9px] text-slate-500 leading-relaxed">
           <span className="text-medos-cyan font-bold">PREDICTIVE AI:</span> ICU capacity expected to reach 100% within 4 hours based on current emergency swarm intake velocity. Recommendation: Activate overflow protocol Alpha.
         </p>
      </div>
    </div>
  );
}
