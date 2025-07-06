import React, { useState } from 'react';
import { interpolateRdYlBu } from 'd3-scale-chromatic';

// Mock impact data: lat, lon, impact (0-1)
const impactZones = [
  { lat: 20, lon: 78, impact: 0.9 }, // India
  { lat: 40, lon: -100, impact: 0.7 }, // US
  { lat: 55, lon: 37, impact: 0.5 }, // Russia
  { lat: -23, lon: 133, impact: 0.3 }, // Australia
  { lat: 35, lon: 139, impact: 0.8 }, // Japan
  { lat: -34, lon: -58, impact: 0.2 }, // Argentina
];

function latLonToXY(lat: number, lon: number, width: number, height: number) {
  // Equirectangular projection
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

const PredictiveImpactMap: React.FC = () => {
  const [highOnly, setHighOnly] = useState(false);
  const width = 320;
  const height = 140;
  const threshold = 0.7;
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-medium">Predictive Impact Map</h3>
        <label className="flex items-center gap-1 text-xs cursor-pointer select-none">
          <input
            type="checkbox"
            checked={highOnly}
            onChange={e => setHighOnly(e.target.checked)}
            className="accent-isrosaffron"
          />
          Show High Impact Zones Only
        </label>
      </div>
      <svg width={width} height={height} className="rounded bg-gradient-to-br from-isrogradient1 to-isrogradient2">
        {/* Simple world map outline (minimalist) */}
        <rect x={0} y={0} width={width} height={height} fill="#f8fafc" />
        {/* Impact zones */}
        {impactZones.filter(z => !highOnly || z.impact >= threshold).map((z, i) => {
          const { x, y } = latLonToXY(z.lat, z.lon, width, height);
          const color = interpolateRdYlBu(1 - z.impact); // blue=low, orange=high
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={12 * z.impact + 6}
              fill={color}
              fillOpacity={0.7}
              stroke="#1E3A8A"
              strokeWidth={1.5}
            >
              <title>Impact: {Math.round(z.impact * 100)}%</title>
            </circle>
          );
        })}
      </svg>
      <div className="flex justify-end mt-2 text-xs text-gray-500">
        <span className="mr-2">Low</span>
        <span className="inline-block w-16 h-2 rounded bg-gradient-to-r from-blue-500 via-white to-orange-400" />
        <span className="ml-2">High</span>
      </div>
    </div>
  );
};

export default PredictiveImpactMap; 