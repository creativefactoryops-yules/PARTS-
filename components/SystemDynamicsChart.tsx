
import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'motion/react';

const data = [
  {
    name: 'Self Integration',
    uv: 85,
    pv: 2400,
    fill: '#6366f1',
  },
  {
    name: 'Protective Balance',
    uv: 65,
    pv: 4567,
    fill: '#10b981',
  },
  {
    name: 'Exile Healing',
    uv: 45,
    pv: 1398,
    fill: '#f43f5e',
  },
  {
    name: 'Relational Safety',
    uv: 75,
    pv: 9800,
    fill: '#f59e0b',
  }
];

export const SystemDynamicsChart: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-[300px] md:h-[400px] bg-white/50 backdrop-blur-sm rounded-[40px] p-8 border border-indigo-50 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.3em]">System Dynamics</h3>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Typical Integration Metrics</p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="20%" 
          outerRadius="90%" 
          barSize={12} 
          data={data}
        >
          <RadialBar
            label={{ position: 'insideStart', fill: '#fff', fontSize: 8, fontWeight: 800 }}
            background
            dataKey="uv"
          />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 'bold' }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
