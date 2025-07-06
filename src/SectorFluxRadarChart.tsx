import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const radarData = [
  { sector: 'N', flux: 8 },
  { sector: 'NE', flux: 12 },
  { sector: 'E', flux: 15 },
  { sector: 'SE', flux: 10 },
  { sector: 'S', flux: 7 },
  { sector: 'SW', flux: 5 },
  { sector: 'W', flux: 9 },
  { sector: 'NW', flux: 11 },
];

const SectorFluxRadarChart: React.FC = () => (
  <div className="w-full h-full flex flex-col">
    <h3 className="text-base font-medium mb-2">Sector-wise Flux</h3>
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
        <PolarGrid stroke="#e5e7eb" strokeDasharray="2 2" />
        <PolarAngleAxis dataKey="sector" tick={{ fontSize: 12, fill: '#1E3A8A' }} />
        <PolarRadiusAxis angle={30} domain={[0, 20]} tick={{ fontSize: 11, fill: '#7C3AED' }} axisLine={false} tickLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload || !payload.length) return null;
            const { sector, flux } = payload[0].payload;
            return (
              <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-card">
                <div className="font-semibold mb-1">Sector: {sector}</div>
                <div className="text-sm">Flux: <span className="font-mono">{flux}</span></div>
              </div>
            );
          }}
        />
        <Radar
          name="Flux"
          dataKey="flux"
          stroke="#4aa564"
          fill="#4aa564"
          fillOpacity={0.25}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

export default SectorFluxRadarChart; 