import { useState, useMemo } from 'react';
import { Search, Filter, CalendarDays, Clock, Plane } from 'lucide-react';
import { scheduleData, airlines, airports } from '../data/dummyData';

export default function ScheduleExplorer() {
  const [originFilter, setOriginFilter] = useState('');
  const [destFilter, setDestFilter] = useState('');
  const [airlineFilter, setAirlineFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('2025-01-15');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const perPage = 25;

  const uniqueOrigins = useMemo(() => [...new Set(scheduleData.map(f => f.origin))].sort(), []);
  const uniqueDests = useMemo(() => [...new Set(scheduleData.map(f => f.dest))].sort(), []);
  const uniqueAirlines = useMemo(() => [...new Set(scheduleData.map(f => f.airline))].sort(), []);
  const uniqueDates = useMemo(() => [...new Set(scheduleData.map(f => f.date))].sort(), []);

  const filtered = useMemo(() => {
    let data = [...scheduleData];
    if (originFilter) data = data.filter(f => f.origin === originFilter);
    if (destFilter) data = data.filter(f => f.dest === destFilter);
    if (airlineFilter !== 'all') data = data.filter(f => f.airline === airlineFilter);
    if (dateFilter) data = data.filter(f => f.date === dateFilter);
    if (search) {
      const s = search.toUpperCase();
      data = data.filter(f => f.flight.toUpperCase().includes(s) || f.aircraft.toUpperCase().includes(s));
    }
    return data;
  }, [originFilter, destFilter, airlineFilter, dateFilter, search]);

  const paged = filtered.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  // Summary stats
  const totalFlights = filtered.length;
  const onTimeCount = filtered.filter(f => f.status === 'On Time').length;
  const onTimePct = totalFlights > 0 ? ((onTimeCount / totalFlights) * 100).toFixed(1) : 0;
  const carriersInView = new Set(filtered.map(f => f.airline)).size;
  const routesInView = new Set(filtered.map(f => `${f.origin}-${f.dest}`)).size;

  // Future capacity: next 30 days seat count by date
  const capacityByDate = useMemo(() => {
    const map = {};
    scheduleData.forEach(f => {
      if (!map[f.date]) map[f.date] = 0;
      map[f.date]++;
    });
    return Object.entries(map).slice(0, 30).map(([date, flights]) => ({ date: date.slice(5), flights }));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Schedule Explorer</h2>
        <p className="text-sm text-slate-500 mt-1">
          Historical, current, and future airline schedule data with flight-level granularity
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays className="w-4 h-4 text-sky-500" />
            <p className="text-xs text-slate-500">Flights (Filtered)</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalFlights.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-emerald-500" />
            <p className="text-xs text-slate-500">On-Time Rate</p>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{onTimePct}%</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Plane className="w-4 h-4 text-indigo-500" />
            <p className="text-xs text-slate-500">Carriers</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">{carriersInView}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Filter className="w-4 h-4 text-amber-500" />
            <p className="text-xs text-slate-500">Routes</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">{routesInView}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <select value={originFilter} onChange={e => { setOriginFilter(e.target.value); setPage(0); }}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30">
            <option value="">All Origins</option>
            {uniqueOrigins.map(o => <option key={o} value={o}>{o} - {airports.find(a => a.code === o)?.city || o}</option>)}
          </select>
          <span className="text-slate-400">→</span>
          <select value={destFilter} onChange={e => { setDestFilter(e.target.value); setPage(0); }}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30">
            <option value="">All Destinations</option>
            {uniqueDests.map(d => <option key={d} value={d}>{d} - {airports.find(a => a.code === d)?.city || d}</option>)}
          </select>
          <select value={airlineFilter} onChange={e => { setAirlineFilter(e.target.value); setPage(0); }}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30">
            <option value="all">All Airlines</option>
            {uniqueAirlines.map(a => <option key={a} value={a}>{airlines.find(al => al.code === a)?.name || a}</option>)}
          </select>
          <input type="date" value={dateFilter} onChange={e => { setDateFilter(e.target.value); setPage(0); }}
            min={uniqueDates[0]} max={uniqueDates[uniqueDates.length - 1]}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/30" />
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Flight # or aircraft..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
              className="pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/30 w-48" />
          </div>
          <button onClick={() => { setOriginFilter(''); setDestFilter(''); setAirlineFilter('all'); setDateFilter('2025-01-15'); setSearch(''); setPage(0); }}
            className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50">
            Reset
          </button>
        </div>
      </div>

      {/* Capacity mini chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Daily Flight Count (First 30 Days)</h3>
        <div className="flex items-end gap-1 h-24">
          {capacityByDate.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group relative">
              <div
                className="w-full bg-sky-400 hover:bg-sky-500 rounded-t transition-colors"
                style={{ height: `${(d.flights / Math.max(...capacityByDate.map(c => c.flights))) * 80}px` }}
              />
              <div className="absolute -top-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                {d.date}: {d.flights} flights
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-slate-400">{capacityByDate[0]?.date}</span>
          <span className="text-[10px] text-slate-400">{capacityByDate[capacityByDate.length - 1]?.date}</span>
        </div>
      </div>

      {/* Schedule table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700">
            Schedule Data ({filtered.length.toLocaleString()} flights)
          </h3>
          <div className="flex items-center gap-2">
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
              className="px-3 py-1 text-xs border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
              Prev
            </button>
            <span className="text-xs text-slate-500">
              Page {page + 1} of {Math.max(1, totalPages)}
            </span>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 text-xs border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Flight</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Airline</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Route</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Dep</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Arr</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Aircraft</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Freq</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((f, i) => {
                const al = airlines.find(a => a.code === f.airline);
                return (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2 px-3 text-slate-600 font-mono text-xs">{f.date}</td>
                    <td className="py-2 px-3 font-semibold text-slate-800">{f.flight}</td>
                    <td className="py-2 px-3 text-slate-600">{al?.name || f.airline}</td>
                    <td className="py-2 px-3">
                      <span className="font-mono text-slate-700">{f.origin}</span>
                      <span className="text-slate-400 mx-1">→</span>
                      <span className="font-mono text-slate-700">{f.dest}</span>
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-600">{f.dep}</td>
                    <td className="py-2 px-3 font-mono text-slate-600">{f.arr}</td>
                    <td className="py-2 px-3 text-xs text-slate-600">{f.aircraft}</td>
                    <td className="py-2 px-3 text-xs text-slate-500">{f.freq}</td>
                    <td className="py-2 px-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        f.status === 'On Time' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                      }`}>{f.status}</span>
                    </td>
                  </tr>
                );
              })}
              {paged.length === 0 && (
                <tr><td colSpan={9} className="py-8 text-center text-slate-400">No flights match your filters</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
