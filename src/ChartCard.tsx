import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, ReferenceDot
} from 'recharts';

// Mock solar data (hourly for 1 day, with ISO date for filtering)
const today = new Date();
const pad = (n: number) => n.toString().padStart(2, '0');
const mockData = Array.from({ length: 24 }, (_, i) => {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), i);
  return {
    time: `${pad(i)}:00`,
    iso: date.toISOString().slice(0, 13), // YYYY-MM-DDTHH
    flux: 100 + 20 * Math.sin(i / 3),
    density: 5 + 2 * Math.cos(i / 4),
    temperature: 1e6 + 2e5 * Math.sin(i / 5),
    velocity: 400 + 50 * Math.cos(i / 6),
  };
});

const parameters = [
  { key: 'flux', label: 'Flux', color: '#1E3A8A' },
  { key: 'density', label: 'Density', color: '#7C3AED' },
  { key: 'temperature', label: 'Temperature', color: '#F97316' },
  { key: 'velocity', label: 'Velocity', color: '#F59E42' },
];

// Mock CME event: highlight 10:00-13:00, marker at 11:00
const cmeWindow = { start: 10, end: 13 };
const cmeMarker = 11;

interface ChartCardProps {
  selected?: string[];
  dateRange?: { from: string; to: string };
  placeholderLabel?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ selected, dateRange, placeholderLabel }) => {
  if (placeholderLabel) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <span className="text-lg font-semibold mb-2">{placeholderLabel}</span>
        <span className="text-xs">(Coming Soon)</span>
      </div>
    );
  }
  // Filter data by date range
  let filtered = mockData;
  if (dateRange.from && dateRange.to) {
    filtered = mockData.filter(d => {
      const iso = d.iso;
      return iso >= dateRange.from && iso <= dateRange.to;
    });
  }

  // Only show CME overlays if in range
  const cmeInRange = filtered.some(d => parseInt(d.time) >= cmeWindow.start && parseInt(d.time) <= cmeWindow.end);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filtered} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload) return null;
                return (
                  <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-card">
                    <div className="font-semibold mb-1">{label}</div>
                    {selected.map(key => {
                      const param = parameters.find(p => p.key === key);
                      const val = payload.find((p: any) => p.dataKey === key)?.value;
                      return (
                        <div key={key} className="flex items-center gap-2 text-sm">
                          <span className="inline-block w-2 h-2 rounded-full" style={{ background: param?.color }}></span>
                          <span>{param?.label}:</span>
                          <span className="font-mono tabular-nums">{val?.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
              wrapperStyle={{ outline: 'none' }}
            />
            {/* CME window overlay */}
            {cmeInRange && (
              <ReferenceArea x1={`${cmeWindow.start}:00`} x2={`${cmeWindow.end}:00`} fill="#F97316" fillOpacity={0.08} />
            )}
            {/* CME event marker */}
            {cmeInRange && (
              <ReferenceDot x={`${cmeMarker}:00`} y={filtered.find(d => d.time === `${cmeMarker}:00`)?.[selected[0] || 'flux']} r={6} fill="#F97316" stroke="#F97316" />
            )}
            {selected.map(key => {
              const param = parameters.find(p => p.key === key);
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={param?.color}
                  strokeWidth={2.5}
                  dot={false}
                  isAnimationActive={true}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-gray-400 mt-2">CME event: 10:00–13:00 highlighted, marker at 11:00</div>
    </div>
  );
};

export default ChartCard; 