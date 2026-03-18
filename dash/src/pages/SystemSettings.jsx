import { useState } from 'react';
import { systemServices, complianceChecks, backupHistory } from '../data/dummyData';
import { Server, Shield, Database, HardDrive, Activity, CheckCircle2, AlertTriangle, XCircle, Info, Clock, Cpu, MemoryStick } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PRODUCTION_NOTE = {
  title: 'Production Implementation',
  description: 'In production, this page will display real-time infrastructure metrics from monitoring services (Datadog, CloudWatch, or Prometheus). Compliance checks will be automated against NIST 800-53 controls. Backup status will reflect actual AWS S3/RDS snapshots. API configuration will manage rate limits, allowed origins, and authentication providers.',
  tech: ['Datadog / Prometheus', 'AWS CloudWatch', 'NIST 800-53 controls', 'Terraform IaC', 'PagerDuty alerting'],
};

const statusIcon = (status) => {
  if (status === 'Healthy') return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  if (status === 'Warning') return <AlertTriangle className="w-4 h-4 text-amber-500" />;
  return <XCircle className="w-4 h-4 text-red-500" />;
};

const complianceIcon = (status) => {
  if (status === 'Compliant') return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
  if (status === 'Partial' || status === 'In Progress') return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
  return <XCircle className="w-3.5 h-3.5 text-red-500" />;
};

export default function SystemSettings() {
  const [tab, setTab] = useState('infrastructure');

  const serviceChart = systemServices.map((s) => ({
    name: s.name.split(' ').slice(0, 2).join(' '),
    cpu: s.cpu,
    memory: s.memory,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Settings & Infrastructure</h1>
          <p className="text-sm text-slate-500 mt-1">Service health, compliance, backups, and API configuration</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">Placeholder - Requires Backend</span>
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

      {/* Health overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Services Healthy', value: `${systemServices.filter(s => s.status === 'Healthy').length}/${systemServices.length}`, icon: Server, color: 'text-emerald-600' },
          { label: 'Avg Response Time', value: `${Math.round(systemServices.filter(s => s.responseTime !== '—').reduce((s, v) => s + parseInt(v.responseTime), 0) / systemServices.filter(s => s.responseTime !== '—').length)}ms`, icon: Activity, color: 'text-sky-600' },
          { label: 'Compliance Score', value: `${Math.round(complianceChecks.filter(c => c.status === 'Compliant').length / complianceChecks.length * 100)}%`, icon: Shield, color: 'text-indigo-600' },
          { label: 'Last Backup', value: backupHistory[0]?.completed?.split(' ')[0] || '—', icon: HardDrive, color: 'text-slate-700' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
              <kpi.icon className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">{kpi.label}</p>
              <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {['infrastructure', 'compliance', 'backups', 'api'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors capitalize ${tab === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {t === 'api' ? 'API Config' : t}
          </button>
        ))}
      </div>

      {tab === 'infrastructure' && (
        <div className="space-y-4">
          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemServices.map((svc) => (
              <div key={svc.name} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {statusIcon(svc.status)}
                    <span className="text-sm font-semibold text-slate-700">{svc.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">v{svc.version}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-400">Uptime</p>
                    <p className="font-semibold text-slate-700">{svc.uptime}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Response</p>
                    <p className="font-semibold text-slate-700">{svc.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 flex items-center gap-1"><Cpu className="w-3 h-3" /> CPU</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${svc.cpu > 70 ? 'bg-red-400' : svc.cpu > 40 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${svc.cpu}%` }} />
                      </div>
                      <span className="font-semibold text-slate-600">{svc.cpu}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 flex items-center gap-1"><MemoryStick className="w-3 h-3" /> Memory</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${svc.memory > 80 ? 'bg-red-400' : svc.memory > 60 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${svc.memory}%` }} />
                      </div>
                      <span className="font-semibold text-slate-600">{svc.memory}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-3">Last restart: {svc.lastRestart}</p>
              </div>
            ))}
          </div>

          {/* Resource chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Resource Utilization by Service</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={serviceChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="cpu" name="CPU %" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="memory" name="Memory %" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'compliance' && (
        <div className="space-y-4">
          {['FedRAMP', 'Section 508', 'FISMA'].map((cat) => (
            <div key={cat} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-700">{cat} Controls</h3>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-500">
                    <th className="text-left px-5 py-2.5 font-semibold">Check</th>
                    <th className="text-left px-5 py-2.5 font-semibold">Status</th>
                    <th className="text-left px-5 py-2.5 font-semibold">Last Audit</th>
                    <th className="text-left px-5 py-2.5 font-semibold">Next Audit</th>
                    <th className="text-left px-5 py-2.5 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceChecks.filter(c => c.category === cat).map((c, i) => (
                    <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-5 py-3 font-semibold text-slate-700">{c.check}</td>
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-1.5">
                          {complianceIcon(c.status)}
                          <span className={c.status === 'Compliant' ? 'text-emerald-600' : 'text-amber-600'}>{c.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-500">{c.lastAudit}</td>
                      <td className="px-5 py-3 text-slate-500">{c.nextAudit}</td>
                      <td className="px-5 py-3 text-slate-500 max-w-[250px]">{c.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {tab === 'backups' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">Backup History</h3>
            <button className="text-xs font-medium px-3 py-1.5 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100">Trigger Backup</button>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-500">
                <th className="text-left px-5 py-2.5 font-semibold">Type</th>
                <th className="text-left px-5 py-2.5 font-semibold">Size</th>
                <th className="text-left px-5 py-2.5 font-semibold">Started</th>
                <th className="text-left px-5 py-2.5 font-semibold">Completed</th>
                <th className="text-left px-5 py-2.5 font-semibold">Status</th>
                <th className="text-left px-5 py-2.5 font-semibold">Retention</th>
              </tr>
            </thead>
            <tbody>
              {backupHistory.map((b) => (
                <tr key={b.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-3 font-semibold text-slate-700 flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-slate-400" /> {b.type}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{b.size}</td>
                  <td className="px-5 py-3 text-slate-500">{b.started}</td>
                  <td className="px-5 py-3 text-slate-500">{b.completed}</td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{b.retention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'api' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">API Configuration</h3>
            <div className="space-y-4 text-xs">
              {[
                { label: 'Base URL', value: 'https://api.oaa-aviation.dot.gov/v3', type: 'url' },
                { label: 'Rate Limit', value: '1,000 requests/min per user', type: 'text' },
                { label: 'Auth Method', value: 'OAuth2 Bearer Token (JWT)', type: 'text' },
                { label: 'Token Expiry', value: '60 minutes (refresh: 7 days)', type: 'text' },
                { label: 'CORS Origins', value: '*.dot.gov, localhost:5173', type: 'code' },
                { label: 'Max Page Size', value: '10,000 records', type: 'text' },
                { label: 'Compression', value: 'gzip, br', type: 'text' },
                { label: 'SSL/TLS', value: 'TLS 1.3 (AES-256-GCM)', type: 'text' },
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-400 shrink-0 w-32">{item.label}</span>
                  <span className={`text-right ${item.type === 'code' ? 'font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded' : item.type === 'url' ? 'font-mono text-sky-600' : 'text-slate-700'}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Available Endpoints</h3>
            <div className="space-y-2 text-xs">
              {[
                { method: 'GET', path: '/api/v3/traffic', desc: 'T-100 traffic data with filters' },
                { method: 'GET', path: '/api/v3/fares', desc: 'DB1B fare survey data' },
                { method: 'GET', path: '/api/v3/schedules', desc: 'Flight schedule data' },
                { method: 'GET', path: '/api/v3/fleet', desc: 'Fleet registry and aircraft data' },
                { method: 'GET', path: '/api/v3/markets', desc: 'O&D market analysis' },
                { method: 'POST', path: '/api/v3/merger/simulate', desc: 'Run HHI merger simulation' },
                { method: 'POST', path: '/api/v3/ai/query', desc: 'Natural language data query' },
                { method: 'GET', path: '/api/v3/reports', desc: 'Generate and download reports' },
                { method: 'GET', path: '/api/v3/pipelines', desc: 'Pipeline status and history' },
                { method: 'GET', path: '/api/v3/users', desc: 'User management (admin)' },
              ].map((ep, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ep.method === 'GET' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{ep.method}</span>
                  <span className="font-mono text-indigo-600 shrink-0">{ep.path}</span>
                  <span className="text-slate-400 truncate">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Environment Variables</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {[
                { key: 'DATABASE_URL', value: 'postgresql://****@db.oaa.internal:5432/aviation', sensitive: true },
                { key: 'REDIS_URL', value: 'redis://****@cache.oaa.internal:6379', sensitive: true },
                { key: 'JWT_SECRET', value: '••••••••••••••••••••', sensitive: true },
                { key: 'OPENAI_API_KEY', value: 'sk-••••••••••••••••', sensitive: true },
                { key: 'S3_BUCKET', value: 'oaa-aviation-data-prod', sensitive: false },
                { key: 'LOG_LEVEL', value: 'info', sensitive: false },
                { key: 'NODE_ENV', value: 'production', sensitive: false },
                { key: 'SENTRY_DSN', value: 'https://****@sentry.oaa.internal/2', sensitive: true },
              ].map((env) => (
                <div key={env.key} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5">
                  <span className="font-mono font-semibold text-slate-600">{env.key}</span>
                  <span className={`font-mono ${env.sensitive ? 'text-slate-400' : 'text-indigo-600'}`}>{env.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
