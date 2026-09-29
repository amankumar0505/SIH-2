import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose }) {
  if (!message) return null;

  const bgStyles = {
    success: 'bg-white text-[#1D1D1F] border-[#A7F3D0]',
    warning: 'bg-white text-[#1D1D1F] border-[#FDE68A]',
    danger: 'bg-white text-[#1D1D1F] border-[#FECACA]',
    info: 'bg-white text-[#1D1D1F] border-[#D2D2D7]',
  };

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[#1A7F37] shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-[#9A6700] shrink-0" />,
    danger: <AlertTriangle className="w-4 h-4 text-[#CF222E] shrink-0" />,
    info: <Info className="w-4 h-4 text-[#003366] shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md shadow-lg">
      <div className={`flex items-start gap-2.5 p-3.5 rounded-lg border ${bgStyles[type] || bgStyles.info}`}>
        {icons[type] || icons.info}
        <div className="flex-1 text-xs font-medium pr-2 leading-relaxed text-[#1D1D1F]">
          {message}
        </div>
        <button
          onClick={onClose}
          className="text-[#86868B] hover:text-[#1D1D1F] p-0.5 rounded transition-colors"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
