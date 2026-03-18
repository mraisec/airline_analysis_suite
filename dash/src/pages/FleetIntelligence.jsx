import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis,
} from 'recharts';
import { Search, Plane } from 'lucide-react';
import { fleetData, aircraftTypes, airlines } from '../data/dummyData';

const COLORS = ['#0ea5e9', '#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function FleetIntelligence() {
  const [selectedAirline, setSelectedAirline] = useState('all');
  const [search, setSearch] = useState('');

  const airlineOptions = useMemo(() => {
    const codes = [...new Set(fleetData.map(f => f.airline))];
    return codes.map(c => ({ code: c, name: airlines.find(a => a.code === c)?.name || c }));
  }, []);

  const filtered = useMemo(() => {
    let data = [...fleetData];
    if (selectedAirline !== 'all') data = data.filter(f => f.airline === selectedAirline);
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(f => f.type.toLowerCase().includes(s) || f.airline.toLowerCase().includes(s));
    }
    return data;
  }, [selectedAirline, search]);

  // Fleet composition by category
  const categoryData = useMemo(() => {
    const map = {};
    filtered.forEach(f => {
      const ac = aircraftTypes.find(a => a.type === f.type);
      const cat = ac?.category || 'Other';
      map[cat] = (map[cat] || 0) + f.count;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  // Fleet by aircraft type
  const typeData = useMemo(() => {
    const map = {};
    filtered.forEach(f => { map[f.type] = (map[f.type] || 0) + f.count; });
    return Object.entries(map).map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count);
  }, [filtered]);

  // Age vs count scatter
  const scatterData = useMemo(() => {
    return filtered.map(f => {
      const ac = aircraftTypes.find(a => a.type === f.type);
      return { airline: f.airline, type: f.type, count: f.count, avgAge: f.avgAge, seats: ac?.seats || 150 };
    });
  }, [filtered]);

  // Fleet by airline
  const airlineFleetData = useMemo(() => {
    if (selectedAirline !== 'all') return [];
    const map = {};
    fleetData.forEach(f => { map[f.airline] = (map[f.airline] || 0) + f.count; });
    return Object.entries(map).map(([airline, count]) => ({ airline, count })).sort((a, b) => b.count - a.count);
  }, [selectedAirline]);

  const totalAircraft = filtered.reduce((s, f) => s + f.count, 0);
  const avgAge = filtered.length > 0
    ? (filtered.reduce((s, f) => s + f.avgAge * f.count, 0) / totalAircraft).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Fleet Intelligence</h2>
        <p className="text-sm text-slate-500 mt-1">
          Aircraft fleet composition, capacity, and cabin configuration data
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedAirline}
          onChange={e => setSelectedAirline(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
        >
          <option value="all">All Airlines</option>
          {airlineOptions.map(a => (
            <option key={a.code} value={a.code}>{a.name} ({a.code})</option>
          ))}
        </select>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search aircraft type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/30 w-52"
          />
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Total Aircraft</p>
          <p className="text-2xl font-bold text-slate-800">{totalAircraft.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Aircraft Types</p>
          <p className="text-2xl font-bold text-slate-800">{typeData.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Avg Fleet Age</p>
          <p className="text-2xl font-bold text-slate-800">{avgAge} yrs</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Airlines Tracked</p>
          <p className="text-2xl font-bold text-slate-800">{airlineOptions.length}</p>
        </div>
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Fleet by Aircraft Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="type" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Aircraft Count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Fleet by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {selectedAirline === 'all' && (
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Fleet Size by Airline</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={airlineFleetData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="airline" width={40} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" name="Aircraft" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className={`bg-white rounded-xl border border-slate-200 p-5 ${selectedAirline === 'all' ? '' : 'lg:col-span-2'}`}>
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Fleet Age vs. Count (Bubble = Seat Capacity)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="avgAge" name="Avg Age" unit=" yrs" tick={{ fontSize: 11 }} />
              <YAxis dataKey="count" name="Count" tick={{ fontSize: 11 }} />
              <ZAxis dataKey="seats" range={[40, 400]} name="Seats" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ payload }) => {
                if (!payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg text-xs">
                    <p className="font-bold">{d.airline} - {d.type}</p>
                    <p>Count: {d.count}</p>
                    <p>Avg Age: {d.avgAge} yrs</p>
                    <p>Seats: {d.seats}</p>
                  </div>
                );
              }} />
              <Scatter data={scatterData} fill="#0ea5e9" fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fleet detail table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Fleet Detail</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Airline</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Aircraft</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Count</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Avg Age</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Cabin Config</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Seats</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Range (nm)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f, i) => {
                const ac = aircraftTypes.find(a => a.type === f.type);
                const al = airlines.find(a => a.code === f.airline);
                return (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <Plane className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-700">{al?.name || f.airline}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({f.airline})</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-600">{f.type}</td>
                    <td className="py-2 px-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        ac?.category === 'Wide-body' ? 'bg-purple-50 text-purple-700'
                        : ac?.category === 'Narrow-body' ? 'bg-sky-50 text-sky-700'
                        : 'bg-amber-50 text-amber-700'
                      }`}>{ac?.category || '-'}</span>
                    </td>
                    <td className="py-2 px-3 text-right font-semibold text-slate-800">{f.count}</td>
                    <td className="py-2 px-3 text-right text-slate-600">{f.avgAge} yrs</td>
                    <td className="py-2 px-3 font-mono text-xs text-slate-600">{f.cabinConfig}</td>
                    <td className="py-2 px-3 text-right text-slate-600">{ac?.seats || '-'}</td>
                    <td className="py-2 px-3 text-right text-slate-600">{ac?.range?.toLocaleString() || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
