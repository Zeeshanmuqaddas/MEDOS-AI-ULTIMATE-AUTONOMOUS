import React from "react";
import { AlertCircle, ArrowRight } from "lucide-react";

const ALERTS = [
  { id: "A-092", patient: "JD-492", condition: "Probable Sepsis Route", score: 92, status: "CRITICAL", time: "00:03" },
  { id: "A-093", patient: "MK-112", condition: "Ventilator Risk Detected", score: 87, status: "WARNING", time: "00:15" },
  { id: "A-094", patient: "OR-77A", condition: "Surgical Copilot Override", score: 95, status: "CRITICAL", time: "01:22" },
  { id: "A-095", patient: "WARD-B", condition: "Bed Capacity Limit", score: 70, status: "INFO", time: "14:05" },
];

export function CriticalAlerts() {
  return (
    <div className="glass-panel p-5 flex flex-col h-full border border-medos-red/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <h3 className="font-mono text-xs font-bold text-medos-red flex items-center gap-2">
           <AlertCircle className="w-4 h-4" />
           ESCALATION PIPELINE
        </h3>
        <span className="font-mono text-[9px] text-slate-500">AUTO-SORT: RISK</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {ALERTS.map((alert) => (
          <div key={alert.id} className={`p-3 border-l-2 bg-slate-900/60 ${
            alert.status === 'CRITICAL' ? 'border-medos-red' : 
            alert.status === 'WARNING' ? 'border-medos-orange' : 'border-medos-cyan'
          }`}>
             <div className="flex justify-between items-start">
               <div className="flex flex-col">
                 <span className="font-mono text-[10px] text-slate-500">{alert.id} // {alert.patient}</span>
                 <span className="font-sans text-xs font-bold text-slate-200 mt-1">{alert.condition}</span>
               </div>
               <div className={`font-mono text-xs font-bold ${
                  alert.status === 'CRITICAL' ? 'text-medos-red' : 
                  alert.status === 'WARNING' ? 'text-medos-orange' : 'text-medos-cyan'
               }`}>
                 {alert.score}% CONF
               </div>
             </div>
             
             <div className="mt-3 flex justify-between items-center">
               <span className="font-mono text-[9px] text-slate-400">T - {alert.time}</span>
               <button className="flex items-center gap-1 font-mono text-[9px] text-slate-300 hover:text-white border border-slate-700 px-2 py-1 hover:bg-slate-800 transition-colors">
                 INVESTIGATE <ArrowRight className="w-3 h-3" />
               </button>
             </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full py-2 font-mono text-[10px] text-medos-red border border-medos-red/50 hover:bg-medos-red/10 transition-colors uppercase tracking-widest">
        View All Escalations
      </button>
    </div>
  );
}
