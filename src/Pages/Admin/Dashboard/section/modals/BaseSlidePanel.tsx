import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BaseSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const BaseSlidePanel: React.FC<BaseSlidePanelProps> = ({ isOpen, onClose, title, subtitle, children, footer }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer" 
            onClick={onClose} 
          />

          {/* Sliding Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            className="absolute inset-y-0 right-0 w-full max-w-lg bg-white dark:bg-[#1E1E1E] shadow-2xl flex flex-col h-screen border-l border-slate-100 dark:border-[#3B3B3B] overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 dark:border-[#3B3B3B] flex justify-between items-start sticky top-0 bg-white dark:bg-[#1E1E1E] z-10">
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white tracking-tight">{title}</h2>
                {subtitle && <p className="text-[13px] text-slate-400 dark:text-[#A3A3A3] mt-1 font-medium">{subtitle}</p>}
              </div>
              <button onClick={onClose} className="p-2 -m-2 hover:bg-slate-50 dark:hover:bg-[#2A2A2A] rounded-full transition-colors text-slate-400 cursor-pointer">
                <X size={22} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar dark:bg-[#1E1E1E]">
              {children}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-slate-50/50 dark:bg-[#252525] flex justify-end items-center gap-4 border-t border-slate-100 dark:border-[#3B3B3B] sticky bottom-0 z-10">
              {footer}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BaseSlidePanel;