import { useState, useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell,
} from 'recharts';
import { Search, ArrowUpDown, Filter } from 'lucide-react';
import { odMarkets, monthlyTraffic, airlines, airports } from '../data/dummyData';

const COLORS = ['#0ea5e9', '#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

export default function TrafficMarkets() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('pax');
  const [sortDir, setSortDir] = useState('desc');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [dirFilter, setDirFilter] = useState('all'); // all, domestic, international

  const domesticCodes = new Set(airports.filter(a => a.country === 'US').map(a => a.code));

  const filtered = useMemo(() => {
    let data = [...odMarkets];
    if (search) {
      const s = search.toUpperCase();
      data = data.filter(m => m.origin.includes(s) || m.dest.includes(s) ||
        m.carriers.some(c => c.includes(s)));
    }
    if (dirFilter === 'domestic') {
      data = data.filter(m => domesticCodes.has(m.origin) && domesticCodes.has(m.dest));
    } else if (dirFilter === 'international') {
      data = data.filter(m => !domesticCodes.has(m.origin) || !domesticCodes.has(m.dest));
    }
    data.sort((a, b) => sortDir === 'desc' ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]);
    return data;
  }, [search, sortKey, sortDir, dirFilter]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const market = selectedMarket || filtered[0];
  const shareData = market ? Object.entries(market.marketShare).map(([code, share]) => ({ carrier: code, share })) : [];

  const recent12 = monthlyTraffic.slice(-12);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Traffic & Market Analysis</h2>
        <p className="text-sm text-slate-500 mt-1">
          Global O&D traffic data, fare analysis, and carrier market shares
        </p>
      </div>

      {/* Monthly overview charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Monthly Traffic Volume</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={recent12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="period" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={v => `${(v / 1e6).toFixed(0)}M`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `${(v / 1e6).toFixed(1)}M`} />
              <Legend />
              <Bar dataKey="domesticPax" name="Domestic" fill="#0ea5e9" stackId="a" />
              <Bar dataKey="internationalPax" name="International" fill="#6366f1" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Average Fare Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={recent12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="period" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={v => `$${v}`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `$${v}`} />
              <Legend />
              <Line type="monotone" dataKey="avgDomFare" name="Domestic Fare" stroke="#0ea5e9" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="avgIntlFare" name="Intl Fare" stroke="#6366f1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* O&D Market Table & Detail */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="text-sm font-semibold text-slate-700">O&D Markets</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                {['all', 'domestic', 'international'].map(f => (
                  <button
                    key={f}
                    onClick={() => setDirFilter(f)}
                    className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                      dirFilter === f ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search market or carrier..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/30 w-52"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  {[
                    { key: 'market', label: 'Market' },
                    { key: 'pax', label: 'Passengers' },
                    { key: 'avgFare', label: 'Avg Fare' },
                    { key: 'growth', label: 'YoY Growth' },
                    { key: 'carriers', label: 'Carriers' },
                  ].map(col => (
                    <th
                      key={col.key}
                      onClick={() => col.key !== 'market' && col.key !== 'carriers' && handleSort(col.key)}
                      className={`text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider ${
                        col.key !== 'market' && col.key !== 'carriers' ? 'cursor-pointer hover:text-slate-700' : ''
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        {col.label}
                        {sortKey === col.key && <ArrowUpDown className="w-3 h-3" />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedMarket(m)}
                    className={`border-b border-slate-100 cursor-pointer transition-colors ${
                      market === m ? 'bg-sky-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-semibold text-slate-800">
                      {m.origin} → {m.dest}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {(m.pax / 1_000_000).toFixed(2)}M
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">${m.avgFare}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        m.growth >= 5 ? 'bg-emerald-50 text-emerald-700' : m.growth >= 0 ? 'bg-sky-50 text-sky-700' : 'bg-red-50 text-red-600'
                      }`}>
                        {m.growth > 0 ? '+' : ''}{m.growth}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex gap-1">
                        {m.carriers.map(c => (
                          <span key={c} className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-mono">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Market Detail */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          {market ? (
            <>
              <h3 className="text-sm font-semibold text-slate-700 mb-1">
                {market.origin} → {market.dest}
              </h3>
              <p className="text-xs text-slate-500 mb-4">Market Detail & Carrier Shares</p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Annual Pax</p>
                  <p className="text-lg font-bold text-slate-800">{(market.pax / 1e6).toFixed(2)}M</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Avg Fare</p>
                  <p className="text-lg font-bold text-slate-800">${market.avgFare}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">YoY Growth</p>
                  <p className={`text-lg font-bold ${market.growth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {market.growth > 0 ? '+' : ''}{market.growth}%
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Carriers</p>
                  <p className="text-lg font-bold text-slate-800">{market.carriers.length}</p>
                </div>
              </div>

              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">Market Share</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={shareData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="carrier" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={v => `${v}%`} />
                  <Bar dataKey="share" name="Market Share">
                    {shareData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : (
            <p className="text-sm text-slate-500">Select a market to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}
