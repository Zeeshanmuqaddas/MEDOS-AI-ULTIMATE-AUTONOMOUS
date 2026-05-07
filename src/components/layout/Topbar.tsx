import React from "react";
import { AlertTriangle, Bell, Clock, Cpu, Wifi } from "lucide-react";
import { format } from "date-fns";

export function Topbar() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="glass-panel z-20 flex h-16 items-center justify-between border-x-0 border-t-0 px-6">
      <div className="flex items-center gap-6">
        <label className="relative flex items-center">
          <span className="absolute left-3 text-slate-500 font-mono text-xs">{"//"}</span>
          <input 
            type="text" 
            placeholder="Search digital twins, patients, or agent logs..." 
            className="w-96 rounded-none border border-slate-800 bg-slate-900/50 py-1.5 pl-8 pr-4 font-mono text-xs text-slate-300 placeholder-slate-600 focus:border-medos-cyan focus:outline-none focus:ring-1 focus:ring-medos-cyan transition-all"
          />
        </label>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-slate-800 pr-6">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-medos-cyan" />
            <span className="font-mono text-[10px] text-slate-400">FEDERATED NET</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-medos-cyan" />
            <span className="font-mono text-[10px] text-slate-400">QUANTUM HYBRID</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-slate-400 hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-medos-red text-[8px] font-bold text-white">
              3
            </span>
          </button>
          
          <button className="relative text-medos-orange hover:text-white transition-colors">
            <AlertTriangle className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-medos-orange text-[8px] font-bold text-white">
              1
            </span>
          </button>

          <div className="flex flex-col items-end border-l border-slate-800 pl-4">
            <span className="font-mono text-xs font-bold text-medos-cyan">
              {format(time, "HH:mm:ss.SSS")}
            </span>
            <span className="font-mono text-[10px] text-slate-500">
              {format(time, "yyyy-MM-dd | zzz")}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
