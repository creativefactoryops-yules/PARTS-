
import React from 'react';
import { motion } from 'motion/react';

export const TherapeuticBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-50 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          x: [0, 50, 0, -50, 0],
          y: [0, 25, 50, 25, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 270, 180, 90, 0],
          x: [0, -40, 0, 40, 0],
          y: [0, -30, -60, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-emerald-100/30 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-amber-100/20 rounded-full blur-[80px]"
      />
    </div>
  );
};
