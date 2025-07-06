import React, { useEffect, useRef } from 'react';

// Constants for SVG layout
const WIDTH = 340;
const HEIGHT = 120;
const SUN_X = 60;
const SUN_Y = HEIGHT / 2;
const EARTH_X = WIDTH - 60;
const EARTH_Y = HEIGHT / 2;
const L1_X = SUN_X + (EARTH_X - SUN_X) * 0.985; // L1 is ~1.5M km from Earth, ~1% of Sun-Earth distance
const L1_Y = HEIGHT / 2;
const ORBIT_RADIUS = 18;

const OrbitAnimation: React.FC = () => {
  const satRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame: number;
    const animate = (t: number) => {
      // Orbit period: 10s for demo (not to scale)
      const angle = ((t / 10000) % 1) * 2 * Math.PI;
      const x = L1_X + ORBIT_RADIUS * Math.cos(angle);
      const y = L1_Y + ORBIT_RADIUS * Math.sin(angle);
      if (satRef.current) {
        satRef.current.setAttribute('cx', x.toString());
        satRef.current.setAttribute('cy', y.toString());
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="bg-white rounded-card shadow-card p-4 flex flex-col items-center w-full">
      <div className="text-xs text-gray-500 mb-2">Real-time Sun–Earth–Aditya-L1 Position</div>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="block">
        {/* Sun */}
        <circle cx={SUN_X} cy={SUN_Y} r={22} fill="#F97316" />
        <text x={SUN_X} y={SUN_Y + 36} textAnchor="middle" fontSize="12" fill="#F97316" fontWeight="bold">Sun</text>
        {/* Earth */}
        <circle cx={EARTH_X} cy={EARTH_Y} r={14} fill="#1E3A8A" />
        <text x={EARTH_X} y={EARTH_Y + 28} textAnchor="middle" fontSize="12" fill="#1E3A8A" fontWeight="bold">Earth</text>
        {/* L1 marker */}
        <circle cx={L1_X} cy={L1_Y} r={3.5} fill="#7C3AED" />
        <text x={L1_X} y={L1_Y - 12} textAnchor="middle" fontSize="11" fill="#7C3AED">L1</text>
        {/* Aditya-L1 orbit (around L1) */}
        <circle cx={L1_X} cy={L1_Y} r={ORBIT_RADIUS} fill="none" stroke="#7C3AED" strokeDasharray="2 2" strokeWidth={1.2} />
        {/* Aditya-L1 satellite */}
        <circle ref={satRef} cx={L1_X + ORBIT_RADIUS} cy={L1_Y} r={5} fill="#F97316" stroke="#7C3AED" strokeWidth={1.5} />
        <text x={L1_X + ORBIT_RADIUS + 16} y={L1_Y + 4} fontSize="11" fill="#F97316">Aditya-L1</text>
      </svg>
    </div>
  );
};

export default OrbitAnimation; 