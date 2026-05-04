import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface BaseSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const BaseSlidePanel: React.FC<BaseSlidePanelProps> = ({ isOpen, onClose, title, subtitle, children, footer }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      const timer = setTimeout(() => setMounted(false), 300); // Wait for slide-out animation
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop (Dark Overlay) */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer" 
        onClick={onClose} 
      />

      {/* --- The Sliding Panel --- */}
      <div className={`absolute inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl flex flex-col h-screen transform transition-transform duration-300 ease-out border-l border-slate-100 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header - Stays Fixed at Top */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">{title}</h2>
            {subtitle && <p className="text-[13px] text-slate-400 mt-1 font-medium">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-2 -m-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 cursor-pointer">
            <X size={22} />
          </button>
        </div>

        {/* Content - Scrollable Center Section */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {children}
        </div>

        {/* Footer - Fixed at Bottom */}
        <div className="px-8 py-6 bg-slate-50/50 flex justify-end items-center gap-4 border-t border-slate-100 sticky bottom-0 z-10">
          {footer}
        </div>
      </div>
    </div>
  );
};

export default BaseSlidePanel;