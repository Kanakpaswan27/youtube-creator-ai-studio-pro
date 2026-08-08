import React from 'react';
import { useCreator } from '../../context/CreatorContext';
import { CheckCircle2, Sparkles, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toast, showToast } = useCreator();

  if (!toast) return null;

  return (
    <div className="fixed top-20 right-6 z-50 max-w-md w-full animate-in slide-in-from-top-4 duration-300 pointer-events-auto">
      <div className="glass-card rounded-2xl p-4 border border-emerald-500/40 bg-[#141414]/95 shadow-[0_10px_30px_rgba(16,185,129,0.2)] backdrop-blur-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white tracking-wide">
                CreatorOS AI Action
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Live Synced
              </span>
            </div>
            <p className="text-xs text-zinc-200 mt-0.5 font-medium leading-snug">
              {toast.message}
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast('', 'info')}
          className="text-zinc-500 hover:text-white p-1 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
