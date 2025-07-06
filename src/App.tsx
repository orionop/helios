import React, { useState } from 'react';
import ChartCard from './ChartCard';
import ControlsPanel from './ControlsPanel';
import CMELikelihoodGauge from './CMELikelihoodGauge';
import OrbitAnimation from './OrbitAnimation';
import EnergySpectrumHeatmap from './EnergySpectrumHeatmap';
import SectorFluxRadarChart from './SectorFluxRadarChart';
import PredictiveImpactMap from './PredictiveImpactMap';
import { UserCircleIcon, HomeIcon, ChartBarIcon, BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <span className="text-lg font-semibold mb-2">{label}</span>
      <span className="text-xs">(Coming Soon)</span>
    </div>
  );
}

function MissionStatusBar() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full flex items-center justify-between px-6 py-2 bg-gradient-to-r from-isrodeepblue/90 to-gray-900/80 text-white text-xs tracking-widest shadow-lg z-30">
      <span className="font-mono text-lg">{time.toLocaleTimeString()}</span>
      <span className="uppercase font-semibold tracking-wider text-isrosaffron">Mission: ACTIVE</span>
      <div className="flex items-center gap-4">
        <button className="hover:text-isrosaffron transition"><BellIcon className="w-5 h-5" /></button>
        <button className="hover:text-isrosaffron transition"><Cog6ToothIcon className="w-5 h-5" /></button>
      </div>
    </div>
  );
}

function DataPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="border-2 border-isrodeepblue/70 rounded-xl bg-white/80 backdrop-blur p-8 shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-isrodeepblue mb-4">Mission Data</h2>
        <div className="text-gray-700 text-sm mb-2">(Mock data table)</div>
        <table className="w-full text-left text-xs border border-gray-200 rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Timestamp</th>
              <th className="p-2">Parameter</th>
              <th className="p-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">2024-07-06 13:42</td>
              <td className="p-2">Proton Flux</td>
              <td className="p-2">1.2e3 pfu</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">2024-07-06 13:43</td>
              <td className="p-2">Energy (10 MeV)</td>
              <td className="p-2">8.7</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">2024-07-06 13:44</td>
              <td className="p-2">Sector N Flux</td>
              <td className="p-2">0.9</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AlertsPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="border-2 border-isrosaffron/70 rounded-xl bg-white/80 backdrop-blur p-8 shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-isrosaffron mb-4">Mission Alerts</h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-2 text-yellow-700"><BellIcon className="w-5 h-5 animate-pulse" /> CME Detected at 13:42 UTC</li>
          <li className="flex items-center gap-2 text-red-700"><BellIcon className="w-5 h-5 animate-pulse" /> High Proton Flux at 13:43 UTC</li>
          <li className="flex items-center gap-2 text-teal-700"><BellIcon className="w-5 h-5" /> All systems nominal</li>
        </ul>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="border-2 border-isroteal/70 rounded-xl bg-white/80 backdrop-blur p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-isroteal mb-4">Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="darkmode" className="accent-isrosaffron" />
            <label htmlFor="darkmode" className="text-sm">Enable dark mode</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="alerts" className="accent-isrosaffron" defaultChecked />
            <label htmlFor="alerts" className="text-sm">Show critical alerts</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="sound" className="accent-isrosaffron" />
            <label htmlFor="sound" className="text-sm">Enable sound notifications</label>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="border-2 border-isrodeepblue/70 rounded-xl bg-white/80 backdrop-blur p-8 shadow-lg w-full max-w-xs flex flex-col items-center">
        <UserCircleIcon className="w-16 h-16 text-isrodeepblue mb-2" />
        <h2 className="text-xl font-bold text-isrodeepblue mb-1">Dr. S. Rao</h2>
        <div className="text-xs text-gray-700 mb-4">Mission Scientist</div>
        <button className="px-4 py-1 rounded bg-isrosaffron text-white text-xs font-semibold hover:bg-isrosaffron/90 transition">Sign Out</button>
      </div>
    </div>
  );
}

function SideNav() {
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 h-full w-20 bg-gradient-to-b from-isrodeepblue/95 to-gray-900/90 flex flex-col items-center py-6 z-40 shadow-2xl">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-12 h-12 bg-isrosaffron rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white/20">H</div>
        <span className="text-xs text-white mt-2 font-bold tracking-widest">HELIOS</span>
      </div>
      <div className="flex flex-col gap-8 flex-1">
        <NavLink to="/" end className={({isActive}) => `group flex flex-col items-center ${isActive ? 'text-isrosaffron' : 'text-white'} hover:text-isrosaffron transition`}><HomeIcon className="w-7 h-7 mb-1" /><span className="text-[10px]">Dashboard</span></NavLink>
        <NavLink to="/data" className={({isActive}) => `group flex flex-col items-center ${isActive ? 'text-isrosaffron' : 'text-white'} hover:text-isrosaffron transition`}><ChartBarIcon className="w-7 h-7 mb-1" /><span className="text-[10px]">Data</span></NavLink>
        <NavLink to="/alerts" className={({isActive}) => `group flex flex-col items-center ${isActive ? 'text-isrosaffron' : 'text-white'} hover:text-isrosaffron transition`}><BellIcon className="w-7 h-7 mb-1" /><span className="text-[10px]">Alerts</span></NavLink>
        <NavLink to="/settings" className={({isActive}) => `group flex flex-col items-center ${isActive ? 'text-isrosaffron' : 'text-white'} hover:text-isrosaffron transition`}><Cog6ToothIcon className="w-7 h-7 mb-1" /><span className="text-[10px]">Settings</span></NavLink>
      </div>
      <div className="mt-auto mb-2">
        <NavLink to="/profile" className={({isActive}) => `group flex flex-col items-center ${isActive ? 'text-isrosaffron' : 'text-white'} hover:text-isrosaffron transition`}><UserCircleIcon className="w-8 h-8 mb-1" /><span className="text-[10px]">Profile</span></NavLink>
      </div>
    </nav>
  );
}

function App() {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selected, setSelected] = useState<string[]>(['flux']);
  const [realtime, setRealtime] = useState(true);
  const lastCMETimestamp = '2024-07-06 13:42 UTC';

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-stellarwhite/10 to-gray-800 font-sans flex">
      <SideNav />
      <div className="flex-1 flex flex-col min-h-screen ml-20">
        <MissionStatusBar />
        <Routes>
          <Route path="/" element={
            <>
              <header className="w-full max-w-6xl mx-auto flex flex-col items-center gap-2 mb-4 mt-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-isrodeepblue drop-shadow-lg">HELIOS Mission Control</h1>
                <h2 className="text-base md:text-lg font-medium text-spaceblue/80">Halo Event Locator using Ion & Outflow Signatures</h2>
              </header>
              <div className="w-full max-w-6xl mx-auto rounded-2xl border border-gray-700 bg-white/10 backdrop-blur-md p-6 flex flex-col items-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 pointer-events-none opacity-20 animate-pulse" style={{backgroundImage:'linear-gradient(to right, #1E3A8A22 1px, transparent 1px), linear-gradient(to bottom, #1E3A8A22 1px, transparent 1px)', backgroundSize:'40px 40px'}} />
                <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
                  <div className="border-2 border-isrosaffron/70 rounded-xl bg-white/80 backdrop-blur p-4 flex flex-col justify-between min-h-[220px] shadow-lg">
                    <ControlsPanel
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <div className="mt-3 bg-isrodeepblue text-white rounded px-2 py-1 text-xs font-medium flex items-center gap-2 shadow">
                      <span className="font-semibold">Last CME Detected:</span>
                      <span className="font-mono animate-pulse">{lastCMETimestamp}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 bg-gray-50/80 rounded px-2 py-1">
                      <span className="text-xs font-medium text-spaceblue">View:</span>
                      <button
                        className={`px-2 py-1 rounded text-xs font-semibold transition ${realtime ? 'bg-isrosaffron/90 text-white' : 'bg-gray-100 text-spaceblue'}`}
                        onClick={() => setRealtime(true)}
                      >
                        Real-time
                      </button>
                      <button
                        className={`px-2 py-1 rounded text-xs font-semibold transition ${!realtime ? 'bg-isrodeepblue text-white' : 'bg-gray-100 text-spaceblue'}`}
                        onClick={() => setRealtime(false)}
                      >
                        Historical
                      </button>
                    </div>
                  </div>
                  <div className="border-2 border-isrodeepblue/70 rounded-xl bg-white/80 backdrop-blur p-4 flex flex-col justify-center items-center min-h-[220px] shadow-lg">
                    <OrbitAnimation />
                  </div>
                  <div className="border-2 border-isroteal/70 rounded-xl bg-white/80 backdrop-blur p-4 flex flex-col justify-between items-end min-h-[220px] shadow-lg">
                    <div className="flex gap-2 mb-2 self-end">
                      <span className="px-2 py-1 rounded bg-isrosaffron/80 text-white text-xs font-semibold animate-pulse">Level I</span>
                      <span className="px-2 py-1 rounded bg-isrosaffron/90 text-white text-xs font-semibold">II</span>
                      <span className="px-2 py-1 rounded bg-isroteal/80 text-white text-xs font-semibold">III</span>
                      <span className="px-2 py-1 rounded bg-isrodeepblue/90 text-white text-xs font-semibold">IV</span>
                    </div>
                    <CMELikelihoodGauge />
                  </div>
                  <div className="border-2 border-isrodeepblue/70 rounded-xl bg-white/80 backdrop-blur p-4 flex flex-col min-h-[220px] shadow-lg">
                    <h2 className="text-lg font-medium mb-2 text-isrodeepblue">Proton Flux</h2>
                    <ChartCard selected={selected} dateRange={dateRange} />
                  </div>
                  <div className="border-2 border-isrosaffron/70 rounded-xl bg-white/80 backdrop-blur p-4 flex flex-col min-h-[220px] shadow-lg">
                    <h2 className="text-lg font-medium mb-2 text-isrodeepblue">Energy Spectrum</h2>
                    <EnergySpectrumHeatmap />
                  </div>
                  <div className="border-2 border-isroteal/70 rounded-xl bg-white/80 backdrop-blur p-4 flex flex-col min-h-[220px] shadow-lg">
                    <h2 className="text-lg font-medium mb-2 text-isrodeepblue">Sector-wise Flux</h2>
                    <SectorFluxRadarChart />
                  </div>
                </div>
                <div className="w-full mt-6 z-10">
                  <div className="border-2 border-isrodeepblue/70 rounded-xl bg-white/80 backdrop-blur p-4 flex flex-col min-h-[180px] shadow-lg">
                    <h2 className="text-lg font-medium mb-2 text-isrodeepblue">Predictive Impact</h2>
                    <PredictiveImpactMap />
                  </div>
                </div>
              </div>
            </>
          } />
          <Route path="/data" element={<DataPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <footer className="w-full mt-10 py-4 border-t border-gray-700 bg-gray-900/80 text-xs text-center text-gray-300 tracking-widest">
          &copy; {new Date().getFullYear()} ISRO / HELIOS Mission Control. System: Nominal. Contact: helios@isro.gov.in
        </footer>
      </div>
    </div>
  );
}

export default App;
