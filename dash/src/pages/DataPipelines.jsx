import { useState } from 'react';
import { dataPipelines, dataQualityMetrics } from '../data/dummyData';
import { Database, RefreshCw, CheckCircle2, XCircle, Clock, Loader2, AlertTriangle, Info, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PRODUCTION_NOTE = {
  title: 'Production Implementation',
  description: 'In production, this page will connect to a real ETL orchestration engine (Apache Airflow, Prefect, or AWS Step Functions). Pipelines will be triggered on schedules or manually, with real-time status streaming via WebSockets. Data quality checks will run automated statistical validation against historical baselines.',
  tech: ['Apache Airflow / Prefect', 'PostgreSQL / Oracle DB', 'WebSocket real-time status', 'Great Expectations (DQ)', 'AWS S3 staging'],
};

const statusIcon = (status) => {
  switch (status) {
    case 'Completed': case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'Running': case 'running': return <Loader2 className="w-4 h-4 text-sky-500 animate-spin" />;
    case 'Failed': case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
    case 'pending': return <Clock className="w-4 h-4 text-slate-300" />;
    case 'skipped': return <span className="w-4 h-4 text-slate-300 text-center text-xs">-</span>;
    default: return <Clock className="w-4 h-4 text-slate-400" />;
  }
};

const statusBadge = (status) => {
  const styles = {
    Completed: 'bg-emerald-100 text-emerald-700',
    Running: 'bg-sky-100 text-sky-700',
    Failed: 'bg-red-100 text-red-700',
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>;
};

export default function DataPipelines() {
  const [expandedPipe, setExpandedPipe] = useState(null);
  const [tab, setTab] = useState('pipelines');

  const pipelineChart = dataPipelines.map((p) => ({
    name: p.name.split(' ').slice(0, 2).join(' '),
    records: p.recordsProcessed,
    failed: p.recordsFailed,
  }));

  const qualityChart = dataQualityMetrics.map((d) => ({
    name: d.dataset.split(' ').slice(0, 2).join(' '),
    completeness: d.completeness,
    accuracy: d.accuracy,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Data Pipelines & Ingestion</h1>
          <p className="text-sm text-slate-500 mt-1">DOT data source monitoring, ETL job status, and data quality dashboards</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">Placeholder - Requires Backend</span>
          <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Run All Pipelines
          </button>
        </div>
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

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Pipelines', value: dataPipelines.length, color: 'text-slate-700' },
          { label: 'Completed', value: dataPipelines.filter(p => p.status === 'Completed').length, color: 'text-emerald-600' },
          { label: 'Running', value: dataPipelines.filter(p => p.status === 'Running').length, color: 'text-sky-600' },
          { label: 'Failed', value: dataPipelines.filter(p => p.status === 'Failed').length, color: 'text-red-600' },
          { label: 'Total Records', value: `${(dataPipelines.reduce((s, p) => s + p.recordsProcessed, 0) / 1_000_000).toFixed(1)}M`, color: 'text-indigo-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {['pipelines', 'quality', 'volume'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${tab === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {t === 'pipelines' ? 'Pipeline Status' : t === 'quality' ? 'Data Quality' : 'Volume & Records'}
          </button>
        ))}
      </div>

      {tab === 'pipelines' && (
        <div className="space-y-3">
          {dataPipelines.map((pipe) => (
            <div key={pipe.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button onClick={() => setExpandedPipe(expandedPipe === pipe.id ? null : pipe.id)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <Database className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-700">{pipe.name}</span>
                      {statusBadge(pipe.status)}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Source: {pipe.source} | Frequency: {pipe.frequency}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-xs text-slate-500 hidden sm:block">
                    <p>{pipe.recordsProcessed.toLocaleString()} records</p>
                    <p className="text-slate-400">{pipe.duration}</p>
                  </div>
                  {expandedPipe === pipe.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {expandedPipe === pipe.id && (
                <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-500 mb-4">{pipe.description}</p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4 text-xs">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-slate-400">Last Run</p>
                      <p className="font-semibold text-slate-700 mt-0.5">{pipe.lastRun}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-slate-400">Next Run</p>
                      <p className="font-semibold text-slate-700 mt-0.5">{pipe.nextRun}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-slate-400">Records Failed</p>
                      <p className={`font-semibold mt-0.5 ${pipe.recordsFailed > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>{pipe.recordsFailed}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-slate-400">Duration</p>
                      <p className="font-semibold text-slate-700 mt-0.5">{pipe.duration}</p>
                    </div>
                  </div>
                  {/* Pipeline stages */}
                  <h4 className="text-xs font-semibold text-slate-600 mb-2">Pipeline Stages</h4>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {pipe.stages.map((stage, i) => (
                      <div key={i} className="flex-1 flex items-center gap-2 bg-slate-50 rounded-lg p-2.5 text-xs">
                        {statusIcon(stage.status)}
                        <div>
                          <p className="font-medium text-slate-700">{stage.name}</p>
                          <p className="text-slate-400">{stage.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="text-xs font-medium px-3 py-1.5 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100">Re-run Pipeline</button>
                    <button className="text-xs font-medium px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100">View Logs</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'quality' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Data Quality Scores</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={qualityChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[95, 100]} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="completeness" name="Completeness %" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="accuracy" name="Accuracy %" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500">
                  <th className="text-left px-4 py-3 font-semibold">Dataset</th>
                  <th className="text-left px-4 py-3 font-semibold">Completeness</th>
                  <th className="text-left px-4 py-3 font-semibold">Accuracy</th>
                  <th className="text-left px-4 py-3 font-semibold">Freshness</th>
                  <th className="text-left px-4 py-3 font-semibold">Issues</th>
                  <th className="text-left px-4 py-3 font-semibold">Last Check</th>
                </tr>
              </thead>
              <tbody>
                {dataQualityMetrics.map((d, i) => (
                  <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{d.dataset}</td>
                    <td className="px-4 py-3"><span className={d.completeness >= 99 ? 'text-emerald-600' : 'text-amber-600'}>{d.completeness}%</span></td>
                    <td className="px-4 py-3"><span className={d.accuracy >= 99 ? 'text-emerald-600' : 'text-amber-600'}>{d.accuracy}%</span></td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full font-medium ${d.freshness === 'Current' ? 'bg-emerald-100 text-emerald-700' : d.freshness === 'Processing' ? 'bg-sky-100 text-sky-700' : 'bg-red-100 text-red-700'}`}>{d.freshness}</span></td>
                    <td className="px-4 py-3">{d.issues > 0 ? <span className="flex items-center gap-1 text-amber-600"><AlertTriangle className="w-3 h-3" />{d.issues}</span> : <span className="text-emerald-600">0</span>}</td>
                    <td className="px-4 py-3 text-slate-500">{d.lastCheck}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'volume' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Records Processed by Pipeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
              <Tooltip formatter={(v) => v.toLocaleString()} />
              <Bar dataKey="records" name="Records Processed" fill="#0ea5e9" radius={[4, 4, 0, 0]}>
                {pipelineChart.map((entry, i) => (
                  <Cell key={i} fill={entry.records === 0 ? '#ef4444' : '#0ea5e9'} />
                ))}
              </Bar>
              <Bar dataKey="failed" name="Records Failed" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
