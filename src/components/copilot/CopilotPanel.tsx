import React, { useState, useRef, useEffect } from "react";
import { BrainCircuit, Send, Loader2, Maximize2 } from "lucide-react";
import { sendCopilotMessage } from "../../lib/gemini";
import ReactMarkdown from 'react-markdown';

type Role = "user" | "model";

interface Message {
  id: string;
  role: Role;
  text: string;
}

export function CopilotPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      text: "**MEDOS AI NEURAL LINK ESTABLISHED.**\n\nI am monitoring global telemetry, ICU swarms, and patient digital twins.\nHow may I assist your clinical orchestration?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Map history
      const history = messages.map(msg => ({
        role: msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.text }]
      }));

      const responseText = await sendCopilotMessage(userMsg.text, history);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: responseText || "NO RESPONSE FROM SUPERVISOR."
      }]);
    } catch (error) {
       console.error("AI Error:", error);
       setMessages(prev => [...prev, {
         id: (Date.now() + 1).toString(),
         role: "model",
         text: `**CRITICAL ERROR:** NEURAL LINK SEVERED.\n\n${error instanceof Error ? error.message : String(error)}`
       }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="glass-panel z-20 flex w-96 flex-col border-y-0 border-r-0 shadow-[-10px_0_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-medos-cyan/10 border border-medos-cyan/30 flex items-center justify-center">
             <BrainCircuit className="h-5 w-5 text-medos-cyan animate-pulse" />
          </div>
          <div>
            <h2 className="font-sans text-sm font-bold tracking-widest text-white">CLINICAL COPILOT</h2>
            <p className="font-mono text-[9px] text-medos-cyan uppercase">Model: GPT-5 / Med-Gemini-Pro</p>
          </div>
        </div>
        <button className="text-slate-500 hover:text-white transition-colors">
           <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden relative bg-[#030712]/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar relative z-10">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[90%] rounded-lg border p-3 ${
                msg.role === 'user' 
                ? 'bg-slate-800/80 border-slate-700 text-slate-200' 
                : 'bg-medos-cyan/10 border-medos-cyan/30 text-slate-300 neon-border'
              }`}>
                {msg.role === 'model' && (
                  <div className="font-mono text-[10px] text-medos-cyan mb-2 flex items-center gap-1 border-b border-medos-cyan/20 pb-1">
                    <BrainCircuit className="w-3 h-3" /> MEDOS.SUPERVISOR
                  </div>
                )}
                <div className="font-sans text-sm leading-relaxed max-w-none">
                   {msg.role === 'model' ? (
                      <ReactMarkdown 
                        components={{
                          h1: ({node, ...props}) => <h1 className="font-bold text-lg text-white mt-4 mb-2" {...props} />,
                          h2: ({node, ...props}) => <h2 className="font-bold text-md text-white mt-3 mb-2 border-b border-medos-cyan/30 pb-1" {...props} />,
                          h3: ({node, ...props}) => <h3 className="font-bold text-sm text-medos-cyan mt-3 mb-1" {...props} />,
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                          li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-medos-cyan" {...props} />,
                          code: ({node, ...props}) => <code className="font-mono text-xs bg-slate-900 px-1 py-0.5 rounded text-medos-orange" {...props} />
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                   ) : (
                      msg.text
                   )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start">
               <div className="max-w-[85%] rounded-lg border p-3 bg-medos-cyan/10 border-medos-cyan/30 flex items-center gap-3 neon-border">
                  <Loader2 className="h-4 w-4 text-medos-cyan animate-spin" />
                  <span className="font-mono text-xs text-medos-cyan">SYNTHESIZING...</span>
               </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-slate-800 p-4 bg-slate-900/80">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Query disease progression, input symptoms..."
            disabled={isLoading}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 pr-12 font-mono text-xs text-slate-200 placeholder-slate-600 focus:border-medos-cyan focus:outline-none focus:ring-1 focus:ring-medos-cyan disabled:opacity-50 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-medos-cyan p-1.5 text-slate-950 transition-colors hover:bg-medos-cyan/80 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-2 text-center">
           <span className="font-mono text-[9px] text-slate-600 uppercase">
             Encrypted • HIPAA Compliant • Supervisor Logging Active
           </span>
        </div>
      </div>
    </aside>
  );
}
