import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area,
} from 'recharts';
import {
  Users, DollarSign, Gauge, Clock, PlaneTakeoff, Building2,
  Database, TrendingUp, TrendingDown, ArrowUpRight,
} from 'lucide-react';
import { kpiSummary, monthlyTraffic, odMarkets, aiInsights, airlines } from '../data/dummyData';

const COLORS = ['#0ea5e9', '#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

function KpiCard({ icon: Icon, label, value, change, positive }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-sky-600" />
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
          }`}
        >
          {change}
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  );
}

export default function Dashboard() {
  const recent12 = monthlyTraffic.slice(-12);
  const topMarkets = [...odMarkets].sort((a, b) => b.pax - a.pax).slice(0, 8);

  const carrierPax = {};
  odMarkets.forEach((m) => {
    Object.entries(m.marketShare).forEach(([code, share]) => {
      carrierPax[code] = (carrierPax[code] || 0) + Math.round(m.pax * share / 100);
    });
  });
  const carrierPieData = Object.entries(carrierPax)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([code, pax]) => ({ name: code, value: pax }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
        <p className="text-sm text-slate-500 mt-1">
          Key performance indicators for U.S. and global aviation markets
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <KpiCard icon={Users} label="Total Passengers (Annual)" value={kpiSummary.totalPassengers} change={kpiSummary.totalPassengersChange} positive />
        <KpiCard icon={DollarSign} label="Average Fare" value={kpiSummary.avgFare} change={kpiSummary.avgFareChange} positive />
        <KpiCard icon={Gauge} label="Load Factor" value={kpiSummary.loadFactor} change={kpiSummary.loadFactorChange} positive />
        <KpiCard icon={Clock} label="On-Time Performance" value={kpiSummary.onTimePerf} change={kpiSummary.onTimePerfChange} positive={false} />
        <KpiCard icon={PlaneTakeoff} label="Total Flights" value={kpiSummary.totalFlights} change={kpiSummary.totalFlightsChange} positive />
        <KpiCard icon={Building2} label="Tracked Airports" value={kpiSummary.trackedAirports.toLocaleString()} change="Global" positive />
        <KpiCard icon={Database} label="Data Points" value={kpiSummary.dataPointsProcessed} change="Processed" positive />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Passenger Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Monthly Passenger Traffic (Last 12 Months)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={recent12}>
              <defs>
                <linearGradient id="domGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="intlGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="period" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
              <Legend />
              <Area type="monotone" dataKey="domesticPax" name="Domestic" stroke="#0ea5e9" fill="url(#domGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="internationalPax" name="International" stroke="#6366f1" fill="url(#intlGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Carrier Market Share */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Carrier Market Share (Top Markets)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={carrierPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                {carrierPieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${(v / 1_000_000).toFixed(1)}M pax`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top OD Markets */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Top O&D Markets by Passenger Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topMarkets} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="origin" tickFormatter={(v, i) => `${topMarkets[i]?.origin}-${topMarkets[i]?.dest}`} width={80} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `${(v / 1_000_000).toFixed(2)}M pax`} />
              <Bar dataKey="pax" name="Passengers" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Avg Fare & Load Factor trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Average Fare & Load Factor Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recent12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="period" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="fare" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
              <YAxis yAxisId="lf" orientation="right" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip />
              <Legend />
              <Line yAxisId="fare" type="monotone" dataKey="avgFare" name="Avg Fare ($)" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line yAxisId="lf" type="monotone" dataKey="loadFactor" name="Load Factor (%)" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights feed */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700">Latest AI Insights</h3>
          <a href="/ai-insights" className="text-xs text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1">
            View All <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {aiInsights.slice(0, 4).map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border-l-4 ${
                insight.severity === 'error'
                  ? 'border-l-red-500 bg-red-50'
                  : insight.severity === 'warning'
                  ? 'border-l-amber-500 bg-amber-50'
                  : 'border-l-sky-500 bg-sky-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {insight.type}
                </span>
                <span className="text-[10px] text-slate-400">{insight.category}</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">{insight.title}</p>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
