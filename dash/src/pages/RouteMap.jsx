import { useState } from 'react';
import { routeMapData, routeConnections, airlines } from '../data/dummyData';
import { MapPin, Plane, ArrowRightLeft, Filter, Globe, Maximize2, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PRODUCTION_NOTE = {
  title: 'Production Implementation',
  description: 'In production, this page will use Mapbox GL JS or Leaflet with real geographic rendering. Routes will be drawn as great circle arcs with traffic-weighted line thickness. Airport markers will be sized by passenger volume. Filters will query the backend API for real-time schedule and traffic data.',
  tech: ['Mapbox GL JS / Leaflet', 'GeoJSON route overlays', 'WebGL for performance', 'Real-time API queries', 'Clustering for dense areas'],
};

export default function RouteMap() {
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [routeType, setRouteType] = useState('All');
  const [selectedCarrier, setSelectedCarrier] = useState('All');

  const filteredRoutes = routeConnections.filter((r) => {
    if (routeType !== 'All' && r.type !== routeType) return false;
    if (selectedCarrier !== 'All' && !r.carriers.includes(selectedCarrier)) return false;
    if (selectedAirport && r.origin !== selectedAirport && r.dest !== selectedAirport) return false;
    return true;
  });

  const airportStats = routeMapData
    .sort((a, b) => b.totalPax - a.totalPax)
    .slice(0, 10)
    .map((a) => ({ name: a.code, pax: Math.round(a.totalPax / 1_000_000 * 10) / 10 }));

  const selected = selectedAirport ? routeMapData.find((a) => a.code === selectedAirport) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Route Map & Network Visualization</h1>
          <p className="text-sm text-slate-500 mt-1">Interactive geographic route network with traffic overlays</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">Placeholder - Requires Mapbox/Leaflet</span>
      </div>

      {/* Production note */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-sky-500 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-sky-800">{PRODUCTION_NOTE.title}</h3>
            <p className="text-xs text-sky-600 mt-1">{PRODUCTION_NOTE.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PRODUCTION_NOTE.tech.map((t) => (
                <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select value={routeType} onChange={(e) => setRouteType(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white">
            <option value="All">All Routes</option>
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
          </select>
        </div>
        <select value={selectedCarrier} onChange={(e) => setSelectedCarrier(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white">
          <option value="All">All Carriers</option>
          {airlines.map((a) => <option key={a.code} value={a.code}>{a.code} - {a.name}</option>)}
        </select>
        <select value={selectedAirport || ''} onChange={(e) => setSelectedAirport(e.target.value || null)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white">
          <option value="">All Airports</option>
          {routeMapData.map((a) => <option key={a.code} value={a.code}>{a.code} - {a.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-700">Network Map</span>
            </div>
            <button className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
            </button>
          </div>
          <div className="relative bg-slate-800 h-[420px] flex items-center justify-center overflow-hidden">
            {/* Simulated map background */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 800 400" className="w-full h-full">
                {/* Simplified continent outlines */}
                <path d="M150,120 Q200,100 250,110 Q280,130 300,120 Q320,100 350,110 L360,150 Q340,180 300,170 Q260,190 220,170 Q180,160 150,120Z" fill="#64748b" opacity="0.5"/>
                <path d="M380,80 Q420,60 480,70 Q520,90 540,80 Q560,100 580,90 L590,140 Q560,160 520,150 Q480,170 440,150 Q400,140 380,80Z" fill="#64748b" opacity="0.5"/>
                <path d="M200,200 Q240,190 280,210 Q300,240 270,260 Q230,250 200,200Z" fill="#64748b" opacity="0.4"/>
                <path d="M550,180 Q600,160 650,180 Q680,220 660,260 Q620,280 580,260 Q550,230 550,180Z" fill="#64748b" opacity="0.4"/>
              </svg>
            </div>

            {/* Simulated route lines */}
            <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full">
              {filteredRoutes.slice(0, 15).map((r, i) => {
                const x1 = ((r.origLon || -80) + 130) * 2.8;
                const y1 = (60 - (r.origLat || 40)) * 5.5;
                const x2 = ((r.destLon || -80) + 130) * 2.8;
                const y2 = (60 - (r.destLat || 40)) * 5.5;
                const mx = (x1 + x2) / 2;
                const my = Math.min(y1, y2) - 30 - Math.abs(x2 - x1) * 0.15;
                return (
                  <g key={i}>
                    <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke={r.type === 'International' ? '#38bdf8' : '#818cf8'} strokeWidth={Math.max(1, r.pax / 1_500_000)} opacity="0.6" strokeDasharray={r.type === 'International' ? '4,2' : 'none'} />
                    <circle cx={x1} cy={y1} r="4" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                    <circle cx={x2} cy={y2} r="4" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                  </g>
                );
              })}
            </svg>

            {/* Airport labels */}
            <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full">
              {routeMapData.slice(0, 10).map((a) => {
                const x = ((a.lon || -80) + 130) * 2.8;
                const y = (60 - (a.lat || 40)) * 5.5;
                return (
                  <text key={a.code} x={x} y={y - 8} textAnchor="middle" className="text-[9px] fill-white font-bold">{a.code}</text>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs space-y-1.5">
              <div className="flex items-center gap-2"><span className="w-6 h-0.5 bg-indigo-400 block"></span><span className="text-slate-300">Domestic</span></div>
              <div className="flex items-center gap-2"><span className="w-6 h-0.5 bg-sky-400 block" style={{ borderTop: '1px dashed' }}></span><span className="text-slate-300">International</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400 block"></span><span className="text-slate-300">Airport</span></div>
            </div>

            <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 text-[10px] text-slate-300">
              Showing {filteredRoutes.length} routes
            </div>
          </div>
        </div>

        {/* Sidebar stats */}
        <div className="space-y-4">
          {/* Selected airport detail */}
          {selected ? (
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-sky-500" />
                <h3 className="text-sm font-bold text-slate-700">{selected.code} - {selected.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <p className="text-slate-400">Departures/Day</p>
                  <p className="text-lg font-bold text-slate-800">{selected.totalDepartures}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <p className="text-slate-400">Annual Pax</p>
                  <p className="text-lg font-bold text-slate-800">{(selected.totalPax / 1_000_000).toFixed(1)}M</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <p className="text-slate-400">Carriers</p>
                  <p className="text-lg font-bold text-slate-800">{selected.carriers}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <p className="text-slate-400">Destinations</p>
                  <p className="text-lg font-bold text-slate-800">{selected.destinations}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center text-xs text-slate-400">
              <MapPin className="w-6 h-6 mx-auto mb-2 text-slate-300" />
              Select an airport from the filter to see details
            </div>
          )}

          {/* Top airports chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Top Airports by Passengers (M)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={airportStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={35} />
                <Tooltip />
                <Bar dataKey="pax" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Route list */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Routes ({filteredRoutes.length})</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredRoutes.slice(0, 12).map((r, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft className="w-3 h-3 text-slate-300" />
                    <span className="font-semibold text-slate-700">{r.origin}-{r.dest}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${r.type === 'International' ? 'bg-sky-50 text-sky-600' : 'bg-indigo-50 text-indigo-600'}`}>{r.type}</span>
                  </div>
                  <span className="text-slate-500">{(r.pax / 1_000_000).toFixed(1)}M pax</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
