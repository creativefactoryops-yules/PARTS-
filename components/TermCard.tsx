
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlossaryTerm } from '../types';
import { Star, ChevronRight } from 'lucide-react';

interface TermCardProps {
  term: GlossaryTerm;
  isActive: boolean;
  isFavorite: boolean;
  onClick: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const TermCard: React.FC<TermCardProps> = ({ term, isActive, isFavorite, onClick, onToggleFavorite }) => {
  const categoryColors: Record<string, string> = {
    'Core': 'bg-indigo-100 text-indigo-700',
    'Protectors': 'bg-emerald-100 text-emerald-700',
    'Wounded': 'bg-rose-100 text-rose-700',
    'Concepts': 'bg-purple-100 text-purple-700'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative w-full text-left p-5 rounded-2xl transition-all duration-300 border-2 cursor-pointer group shadow-sm ${
        isActive 
          ? 'border-indigo-500 bg-white shadow-xl shadow-indigo-500/10' 
          : 'border-transparent bg-white/40 hover:bg-white hover:border-slate-200'
      }`}
    >
      <div className="flex justify-between items-start mb-3 pr-8">
        <h3 className={`font-serif font-bold text-lg leading-tight transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-900'}`}>
          {term.term}
        </h3>
        <span className={`text-[8px] px-2 py-1 rounded-lg font-black uppercase tracking-widest ${categoryColors[term.category] || 'bg-slate-100'}`}>
          {term.category}
        </span>
      </div>
      
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pr-4 font-medium opacity-70">
        {term.shortDescription}
      </p>

      {/* Indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-4 bottom-4 text-indigo-500"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorite Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(e);
        }}
        className={`absolute top-5 right-4 p-1.5 rounded-full transition-all duration-300 z-10 ${
          isFavorite ? 'text-amber-500 bg-amber-50 scale-110 shadow-sm' : 'text-slate-300 opacity-40 hover:opacity-100 hover:text-amber-400 hover:bg-slate-50'
        }`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star 
          className="w-3.5 h-3.5" 
          fill={isFavorite ? "currentColor" : "none"} 
          strokeWidth={2.5}
        />
      </button>

      {/* Active Glow */}
      {isActive && (
        <motion.div 
          layoutId="activeGlow"
          className="absolute inset-0 rounded-2xl bg-indigo-500/5 -z-10 pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export default TermCard;
