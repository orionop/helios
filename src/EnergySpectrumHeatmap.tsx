import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Mock data: energy bands and flux values
const energyBands = [
  { label: '5 MeV', value: 12 },
  { label: '10 MeV', value: 18 },
  { label: '20 MeV', value: 9 },
  { label: '40 MeV', value: 4 },
];

const bandColors = [
  'var(--tw-gradient-from, #1E3A8A)', // deep blue
  'var(--tw-gradient-stops, #4aa564)', // soft teal
  'var(--tw-gradient-stops, #ff9934)', // muted saffron
  'var(--tw-gradient-to, #F97316)', // solar orange
];

const EnergySpectrumHeatmap: React.FC = () => (
  <div className="w-full h-full flex flex-col">
    <h3 className="text-base font-medium mb-2">Energy Spectrum</h3>
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={energyBands} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
        <XAxis type="number" hide domain={[0, 'dataMax + 2']} />
        <YAxis type="category" dataKey="label" tick={{ fontSize: 13 }} axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ fill: '#e5e7eb' }}
          content={({ active, payload }) => {
            if (!active || !payload || !payload.length) return null;
            const { label, value } = payload[0].payload;
            return (
              <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-card">
                <div className="font-semibold mb-1">{label}</div>
                <div className="text-sm">Flux: <span className="font-mono">{value}</span></div>
              </div>
            );
          }}
        />
        <Bar dataKey="value" barSize={24} radius={[8, 8, 8, 8]}>
          {energyBands.map((entry, idx) => (
            <Cell key={entry.label} fill={bandColors[idx % bandColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    <div className="flex justify-between mt-2 text-xs text-gray-500">
      {energyBands.map(b => <span key={b.label}>{b.label}</span>)}
    </div>
  </div>
);

export default EnergySpectrumHeatmap; 