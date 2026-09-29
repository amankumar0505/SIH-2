import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function MaharashtraLogo({ className = "h-10" }) {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* State Lion Capital Emblem */}
      <div className="flex flex-col items-center justify-center shrink-0">
        <svg viewBox="0 0 100 120" className="w-8 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="30" r="14" fill="#B45309" opacity="0.9" />
          <path d="M36 30 C36 18, 64 18, 64 30 C64 42, 36 42, 36 30 Z" fill="#D97706" />
          <circle cx="43" cy="28" r="2.5" fill="#FFF" />
          <circle cx="57" cy="28" r="2.5" fill="#FFF" />
          <path d="M47 33 L53 33 L50 38 Z" fill="#92400E" />
          <path d="M28 35 C24 25, 38 22, 38 35 Z" fill="#B45309" />
          <path d="M72 35 C76 25, 62 22, 62 35 Z" fill="#B45309" />
          <rect x="24" y="46" width="52" height="12" rx="2" fill="#92400E" />
          <circle cx="50" cy="52" r="5" fill="#FFF" stroke="#1E3A8A" strokeWidth="1" />
          <path d="M20 60 L80 60 L74 72 L26 72 Z" fill="#D97706" />
          <rect x="18" y="73" width="64" height="6" rx="1" fill="#78350F" />
          <text x="50" y="94" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350F" fontFamily="serif">सत्यमेव जयते</text>
        </svg>
      </div>

      <div className="h-7 w-px bg-slate-200"></div>

      {/* Modern Industrial Hexagon Badge */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F2942] to-[#1E4E8C] flex items-center justify-center text-white shadow-xs">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
        </div>

        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[17px] tracking-tight text-[#0F2942] font-sans">
              INDUSTRIA
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-[#1E4E8C] border border-blue-200 font-mono">
              3.0
            </span>
          </div>
          <span className="text-[10.5px] font-medium tracking-tight text-slate-500">
            Govt of Maharashtra • Single Window
          </span>
        </div>
      </div>
    </div>
  );
}
