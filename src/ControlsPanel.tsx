import React from 'react';

const parameters = [
  { key: 'flux', label: 'Flux' },
  { key: 'density', label: 'Density' },
  { key: 'temperature', label: 'Temperature' },
  { key: 'velocity', label: 'Velocity' },
];

interface ControlsPanelProps {
  dateRange: { from: string; to: string };
  setDateRange: (r: { from: string; to: string }) => void;
  selected: string[];
  setSelected: (s: string[]) => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({ dateRange, setDateRange, selected, setSelected }) => {
  const toggleParam = (key: string) => {
    setSelected(sel =>
      sel.includes(key) ? sel.filter(k => k !== key) : [...sel, key]
    );
  };

  const reset = () => {
    setDateRange({ from: '', to: '' });
    setSelected(['flux']);
  };

  return (
    <form className="flex flex-col gap-4 text-sm">
      <div>
        <label className="block font-medium mb-1">Date Range</label>
        <div className="flex gap-2">
          <input type="date" value={dateRange.from} onChange={e => setDateRange(r => ({ ...r, from: e.target.value }))} className="border rounded px-2 py-1" />
          <span className="self-center">–</span>
          <input type="date" value={dateRange.to} onChange={e => setDateRange(r => ({ ...r, to: e.target.value }))} className="border rounded px-2 py-1" />
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">Parameters</label>
        <div className="flex flex-wrap gap-2">
          {parameters.map(p => (
            <label key={p.key} className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(p.key)}
                onChange={() => toggleParam(p.key)}
                className="accent-spaceblue"
              />
              {p.label}
            </label>
          ))}
        </div>
      </div>
      <button type="button" onClick={reset} className="mt-2 px-3 py-1 rounded bg-spaceblue text-stellarwhite hover:bg-spaceblue/90 transition">Reset</button>
    </form>
  );
};

export default ControlsPanel; 