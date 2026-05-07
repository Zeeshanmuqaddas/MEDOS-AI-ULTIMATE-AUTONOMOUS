import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from "lucide-react";

// Generate initial fake data
const generateData = () => {
  const data = [];
  let prevHR = 70;
  for (let i = 0; i < 40; i++) {
    const newHR = prevHR + (Math.random() * 10 - 5);
    prevHR = newHR;
    data.push({
      time: i,
      hr: Math.round(newHR),
      spo2: 95 + Math.random() * 4,
    });
  }
  return data;
};

export function TelemetryStream() {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((currentData) => {
        const newData = [...currentData.slice(1)];
        const lastHR = newData[newData.length - 1].hr;
        newData.push({
          time: currentData[currentData.length - 1].time + 1,
          hr: Math.round(lastHR + (Math.random() * 10 - 5)),
          spo2: 95 + Math.random() * 4,
        });
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-5 relative">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-4">
          <h3 className="font-mono text-xs font-bold text-slate-300 flex items-center gap-2">
            <Activity className="w-4 h-4 text-medos-cyan" />
            ICU TELEMETRY STREAM
          </h3>
          <span className="font-mono text-[9px] text-slate-500">DIGITAL TWIN: ACTIVE</span>
        </div>
        <div className="flex gap-4 font-mono text-[10px]">
           <div>
             <span className="text-slate-500 block">HR</span>
             <span className="text-medos-green text-lg font-bold">{data[data.length-1]?.hr}</span>
           </div>
           <div>
             <span className="text-slate-500 block">SPO2</span>
             <span className="text-medos-cyan text-lg font-bold">{data[data.length-1]?.spo2.toFixed(1)}</span>
           </div>
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <YAxis domain={['auto', 'auto']} stroke="#334155" fontSize={10} fontFamily="monospace" tickFormatter={(v) => `${v} bpm`} />
            <Tooltip 
               contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontFamily: 'JetBrains Mono', fontSize: '10px' }}
               itemStyle={{ color: '#10b981' }}
            />
            <Area type="monotone" dataKey="hr" stroke="#10b981" fillOpacity={1} fill="url(#colorHr)" isAnimationActive={false} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Target reticle decoration */}
      <div className="absolute right-4 bottom-4 w-4 h-4 border-r border-b border-medos-cyan opacity-50"></div>
      <div className="absolute left-4 bottom-4 w-4 h-4 border-l border-b border-medos-cyan opacity-50"></div>
    </div>
  );
}
