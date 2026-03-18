import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Legend,
} from 'recharts';
import { Scale, AlertTriangle, CheckCircle2, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { mergerScenarios, slotAllocations, airlines, airports } from '../data/dummyData';

const STATUS_STYLES = {
  'Under Review': { bg: 'bg-amber-50', text: 'text-amber-700', icon: Clock },
  'Approved with Conditions': { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckCircle2 },
  'Proposed': { bg: 'bg-sky-50', text: 'text-sky-700', icon: Scale },
};

const COLORS = ['#0ea5e9', '#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

export default function Regulatory() {
  const [expandedMerger, setExpandedMerger] = useState(1);
  const [selectedAirport, setSelectedAirport] = useState('JFK');

  const slotControlledAirports = [...new Set(slotAllocations.map(s => s.airport))];
  const airportSlots = slotAllocations
    .filter(s => s.airport === selectedAirport)
    .map(s => ({
      airline: s.airline,
      name: airlines.find(a => a.code === s.airline)?.name || s.airline,
      slots: s.slots,
    }))
    .sort((a, b) => b.slots - a.slots);

  const totalSlots = airportSlots.reduce((s, a) => s + a.slots, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Regulatory & Merger Analysis</h2>
        <p className="text-sm text-slate-500 mt-1">
          Merger impact analysis, HHI concentration metrics, and slot allocation data for constrained airports
        </p>
      </div>

      {/* Merger Scenarios */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Merger & Consolidation Scenarios</h3>
        <div className="space-y-3">
          {mergerScenarios.map((m) => {
            const expanded = expandedMerger === m.id;
            const style = STATUS_STYLES[m.status] || STATUS_STYLES['Proposed'];
            const StatusIcon = style.icon;
            const hhiChange = m.hhi.after - m.hhi.before;
            const hhiAboveThreshold = m.hhi.after > 2500;

            return (
              <div key={m.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setExpandedMerger(expanded ? null : m.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${style.bg} flex items-center justify-center`}>
                      <StatusIcon className={`w-5 h-5 ${style.text}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{m.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                          {m.status}
                        </span>
                        <span className="text-xs text-slate-400">Proposed: {m.dateProposed}</span>
                        <span className="text-xs text-slate-400">{m.affectedMarkets} markets affected</span>
                      </div>
                    </div>
                  </div>
                  {expanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>

                {expanded && (
                  <div className="px-5 pb-5 border-t border-slate-100">
                    <p className="text-sm text-slate-600 mt-4 mb-4">{m.summary}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-500">Overlap Routes</p>
                        <p className="text-lg font-bold text-slate-800">{m.overlapRoutes}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-500">HHI Before</p>
                        <p className="text-lg font-bold text-slate-800">{m.hhi.before.toLocaleString()}</p>
                      </div>
                      <div className={`rounded-lg p-3 ${hhiAboveThreshold ? 'bg-red-50' : 'bg-slate-50'}`}>
                        <p className="text-xs text-slate-500">HHI After</p>
                        <p className={`text-lg font-bold ${hhiAboveThreshold ? 'text-red-600' : 'text-slate-800'}`}>
                          {m.hhi.after.toLocaleString()}
                          <span className="text-xs ml-1">(+{hhiChange})</span>
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-500">Affected Markets</p>
                        <p className="text-lg font-bold text-slate-800">{m.affectedMarkets}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Fare Impact</p>
                        <p className="text-sm font-semibold text-slate-700">{m.fareImpact}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Capacity Change</p>
                        <p className="text-sm font-semibold text-slate-700">{m.capacityChange}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Impacted Airports</p>
                        <div className="flex gap-1 flex-wrap">
                          {m.impactedAirports.map(a => (
                            <span key={a} className="text-xs px-2 py-0.5 bg-white rounded border border-slate-200 font-mono">{a}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* HHI visual */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">HHI Concentration Analysis</h5>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Before: {m.hhi.before}</span>
                            <span>After: {m.hhi.after}</span>
                          </div>
                          <div className="h-4 bg-slate-200 rounded-full overflow-hidden relative">
                            <div
                              className="h-full bg-sky-500 rounded-full transition-all"
                              style={{ width: `${(m.hhi.before / 5000) * 100}%` }}
                            />
                            <div
                              className={`h-full absolute top-0 rounded-full transition-all ${hhiAboveThreshold ? 'bg-red-400' : 'bg-amber-400'}`}
                              style={{ left: `${(m.hhi.before / 5000) * 100}%`, width: `${(hhiChange / 5000) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                            <span>0 (Perfect Competition)</span>
                            <span className="text-red-400">2500 (DOJ Threshold)</span>
                            <span>5000+</span>
                          </div>
                        </div>
                      </div>
                      {hhiAboveThreshold && (
                        <div className="flex items-center gap-2 mt-3 text-red-600 bg-red-50 rounded-lg px-3 py-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-xs font-medium">Post-merger HHI exceeds DOJ concentration threshold</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Slot Allocations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Slot Allocations - {selectedAirport}</h3>
            <div className="flex gap-1">
              {slotControlledAirports.map(ap => (
                <button
                  key={ap}
                  onClick={() => setSelectedAirport(ap)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedAirport === ap ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {ap}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={airportSlots}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="airline" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={({ payload }) => {
                if (!payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg text-xs">
                    <p className="font-bold">{d.name}</p>
                    <p>{d.slots} slots ({((d.slots / totalSlots) * 100).toFixed(1)}%)</p>
                  </div>
                );
              }} />
              <Bar dataKey="slots" name="Slot Pairs">
                {airportSlots.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Slot-Controlled Airports</h3>
          <div className="space-y-3">
            {airports.filter(a => a.slotControlled).map(ap => {
              const apSlots = slotAllocations.filter(s => s.airport === ap.code);
              const total = apSlots.reduce((s, a) => s + a.slots, 0);
              return (
                <div
                  key={ap.code}
                  onClick={() => setSelectedAirport(ap.code)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAirport === ap.code ? 'border-sky-300 bg-sky-50' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{ap.code} - {ap.name}</p>
                      <p className="text-xs text-slate-500">{ap.city}, {ap.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">{total || '—'}</p>
                      <p className="text-[10px] text-slate-400">total slots</p>
                    </div>
                  </div>
                  {total > 0 && (
                    <div className="flex mt-2 h-2 rounded-full overflow-hidden bg-slate-200">
                      {apSlots.sort((a, b) => b.slots - a.slots).map((s, i) => (
                        <div
                          key={i}
                          className="h-full first:rounded-l-full last:rounded-r-full"
                          style={{ width: `${(s.slots / total) * 100}%`, backgroundColor: COLORS[i % COLORS.length] }}
                          title={`${s.airline}: ${s.slots}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
