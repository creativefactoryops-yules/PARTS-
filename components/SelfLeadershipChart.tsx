
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

const data = [
  { subject: 'Calmness', A: 120, fullMark: 150 },
  { subject: 'Curiosity', A: 110, fullMark: 150 },
  { subject: 'Compassion', A: 130, fullMark: 150 },
  { subject: 'Confidence', A: 90, fullMark: 150 },
  { subject: 'Courage', A: 100, fullMark: 150 },
  { subject: 'Clarity', A: 115, fullMark: 150 },
  { subject: 'Connectedness', A: 125, fullMark: 150 },
  { subject: 'Creativity', A: 110, fullMark: 150 },
];

export const SelfLeadershipChart: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[300px] md:h-[400px] bg-white/50 backdrop-blur-sm rounded-3xl p-4 border border-indigo-100 shadow-inner"
    >
      <div className="text-center mb-4">
        <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-widest">Self-Leadership Spectrum</h3>
        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Ideal Balance of the 8 Cs</p>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
          />
          <Radar
            name="Self"
            dataKey="A"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
