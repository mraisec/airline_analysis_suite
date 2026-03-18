import { useState, useMemo } from 'react';
import { projectSprints, projectTeam, projectRisks, projectBudget } from '../data/dummyData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
  LineChart, Line, AreaChart, Area,
} from 'recharts';
import {
  CalendarDays, Users, DollarSign, AlertTriangle, CheckCircle2, Clock, ChevronDown, ChevronUp,
  Target, Zap, Shield, Info, ArrowRight, ExternalLink, Layers, TrendingUp, Flag,
} from 'lucide-react';

const PHASE_COLORS = {
  'P0 - Foundation': { bg: 'bg-red-500', light: 'bg-red-100 text-red-700', bar: '#ef4444' },
  'P0 - Data Ingestion': { bg: 'bg-orange-500', light: 'bg-orange-100 text-orange-700', bar: '#f97316' },
  'P1 - Core Analytics': { bg: 'bg-sky-500', light: 'bg-sky-100 text-sky-700', bar: '#0ea5e9' },
  'P1 - AI Integration': { bg: 'bg-violet-500', light: 'bg-violet-100 text-violet-700', bar: '#8b5cf6' },
  'P2 - Delivery': { bg: 'bg-emerald-500', light: 'bg-emerald-100 text-emerald-700', bar: '#10b981' },
};

const PRIORITY_STYLES = {
  Critical: 'bg-red-100 text-red-700 border-red-200',
  High: 'bg-amber-100 text-amber-700 border-amber-200',
  Medium: 'bg-sky-100 text-sky-700 border-sky-200',
  Low: 'bg-slate-100 text-slate-600 border-slate-200',
};

const RISK_COLORS = { Low: '#10b981', Medium: '#f59e0b', High: '#ef4444' };

export default function ProjectManagement() {
  const [tab, setTab] = useState('timeline');
  const [expandedSprint, setExpandedSprint] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);
  const [riskFilter, setRiskFilter] = useState('All');

  const allTasks = useMemo(() => projectSprints.flatMap(s => s.tasks.map(t => ({ ...t, sprintId: s.id, sprintName: s.name, phase: s.phase }))), []);
  const totalPoints = projectSprints.reduce((s, sp) => s + sp.totalPoints, 0);
  const totalTasks = allTasks.length;
  const criticalTasks = allTasks.filter(t => t.priority === 'Critical').length;
  const highRiskTasks = allTasks.filter(t => t.risk === 'High').length;

  // Derive all timeline data from sprint dates — no hardcoded values
  const projectStart = useMemo(() => new Date(Math.min(...projectSprints.map(s => new Date(s.startDate)))), []);
  const projectEnd = useMemo(() => new Date(Math.max(...projectSprints.map(s => new Date(s.endDate)))), []);
  const totalDays = Math.ceil((projectEnd - projectStart) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.ceil(totalDays / 7);
  const fmtDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const fmtShort = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Generate month markers dynamically from project date range
  const monthMarkers = useMemo(() => {
    const markers = [];
    const cur = new Date(projectStart.getFullYear(), projectStart.getMonth(), 1);
    const end = new Date(projectEnd.getFullYear(), projectEnd.getMonth() + 1, 1);
    while (cur < end) {
      const dayOffset = Math.max(0, (cur - projectStart) / (1000 * 60 * 60 * 24));
      const weekOffset = dayOffset / 7;
      markers.push({ label: `${cur.toLocaleDateString('en-US', { month: 'short' })} ${cur.getFullYear()}`, weekOffset });
      cur.setMonth(cur.getMonth() + 1);
    }
    return markers;
  }, [projectStart, projectEnd]);

  const sprintChart = projectSprints.map(s => ({
    name: s.id,
    points: s.totalPoints,
    phase: s.phase,
    fill: PHASE_COLORS[s.phase]?.bar || '#94a3b8',
  }));

  const phaseData = useMemo(() => {
    const map = {};
    projectSprints.forEach(s => {
      if (!map[s.phase]) map[s.phase] = { name: s.phase, points: 0, tasks: 0, sprints: 0 };
      map[s.phase].points += s.totalPoints;
      map[s.phase].tasks += s.tasks.length;
      map[s.phase].sprints += 1;
    });
    return Object.values(map);
  }, []);

  const budgetChart = projectBudget.laborCost.map((lc, i) => ({
    name: projectSprints[i]?.id || lc.sprint,
    labor: lc.cost,
    cumulative: projectBudget.laborCost.slice(0, i + 1).reduce((s, x) => s + x.cost, 0),
  }));

  const riskMatrix = useMemo(() => {
    const matrix = [];
    ['Low', 'Medium', 'High', 'Critical'].forEach((impact, iy) => {
      ['Low', 'Medium', 'High'].forEach((prob, ix) => {
        const risks = projectRisks.filter(r => r.impact === impact && r.probability === prob);
        matrix.push({ impact, probability: prob, risks, x: ix, y: iy });
      });
    });
    return matrix;
  }, []);

  const teamByRole = useMemo(() => {
    const assignmentMap = {};
    allTasks.forEach(t => {
      if (!assignmentMap[t.assignee]) assignmentMap[t.assignee] = { points: 0, tasks: 0, criticalTasks: 0 };
      assignmentMap[t.assignee].points += t.points;
      assignmentMap[t.assignee].tasks += 1;
      if (t.priority === 'Critical') assignmentMap[t.assignee].criticalTasks += 1;
    });
    return projectTeam.map(m => ({
      ...m,
      assignedPoints: assignmentMap[m.id]?.points || 0,
      assignedTasks: assignmentMap[m.id]?.tasks || 0,
      criticalTasks: assignmentMap[m.id]?.criticalTasks || 0,
    }));
  }, [allTasks]);

  const filteredRisks = riskFilter === 'All' ? projectRisks : projectRisks.filter(r => r.category === riskFilter);

  const tabs = [
    { id: 'timeline', label: 'Sprint Timeline' },
    { id: 'gantt', label: 'Visual Roadmap' },
    { id: 'risks', label: 'Risk Register' },
    { id: 'team', label: 'Team & Resources' },
    { id: 'budget', label: 'Budget & Cost' },
    { id: 'dependencies', label: 'Dependencies' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Project Management & Roadmap</h1>
          <p className="text-sm text-slate-500 mt-1">OAA Aviation Analysis Suite - Production Delivery Plan</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-sky-100 text-sky-700">{totalWeeks} Weeks</span>
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">{projectSprints.length} Sprints</span>
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">{totalPoints} Story Points</span>
        </div>
      </div>

      {/* Executive KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {[
          { label: 'Duration', value: `${totalWeeks} weeks`, sub: `${fmtShort(projectStart)} - ${fmtDate(projectEnd)}`, icon: CalendarDays, color: 'text-sky-600', bg: 'bg-sky-50' },
          { label: 'Total Sprints', value: `${projectSprints.length}`, sub: '2-week cycles', icon: Layers, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Story Points', value: totalPoints, sub: `${totalTasks} tasks`, icon: Target, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Team Size', value: `${projectTeam.length}`, sub: `1 Architect (equity) + 2 FTE (1099)`, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Base Year', value: `$${(projectBudget.baseYear.total / 1000).toFixed(0)}K`, sub: `5-yr total: $${(projectBudget.fiveYear.total / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Risk Items', value: projectRisks.length, sub: `${projectRisks.filter(r => r.score >= 6).length} high/critical`, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map(kpi => (
          <div key={kpi.label} className={`${kpi.bg} rounded-xl p-4 border border-white`}>
            <div className="flex items-center gap-2 mb-2">
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{kpi.label}</span>
            </div>
            <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Phase Legend */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Flag className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Project Phases</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
          {phaseData.map(p => (
            <div key={p.name} className="flex items-center gap-2 text-xs">
              <div className={`w-3 h-3 rounded-sm shrink-0 ${PHASE_COLORS[p.name]?.bg || 'bg-slate-400'}`} />
              <div>
                <span className="font-semibold text-slate-700">{p.name}</span>
                <span className="text-slate-400 ml-1">{p.sprints}sp / {p.points}pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${tab === t.id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════ TAB: Sprint Timeline ═══════════ */}
      {tab === 'timeline' && (
        <div className="space-y-4">
          {/* Sprint velocity chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Sprint Velocity (Story Points per Sprint)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={sprintChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="points" name="Story Points" radius={[4, 4, 0, 0]}>
                  {sprintChart.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sprint cards */}
          {projectSprints.map(sprint => {
            const isExpanded = expandedSprint === sprint.id;
            const phaseStyle = PHASE_COLORS[sprint.phase] || {};
            const critCount = sprint.tasks.filter(t => t.priority === 'Critical').length;
            const highRiskCount = sprint.tasks.filter(t => t.risk === 'High').length;

            return (
              <div key={sprint.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Sprint header */}
                <button onClick={() => setExpandedSprint(isExpanded ? null : sprint.id)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${phaseStyle.bg || 'bg-slate-400'} flex items-center justify-center text-white text-xs font-bold`}>
                      {sprint.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-800">{sprint.name}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${phaseStyle.light || 'bg-slate-100 text-slate-600'}`}>{sprint.phase}</span>
                        {critCount > 0 && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">{critCount} critical</span>}
                        {highRiskCount > 0 && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{highRiskCount} high-risk</span>}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{sprint.startDate} → {sprint.endDate} | {sprint.tasks.length} tasks | {sprint.totalPoints} points</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-1.5">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(sprint.completedPoints / sprint.totalPoints) * 100}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400 w-8">{Math.round((sprint.completedPoints / sprint.totalPoints) * 100)}%</span>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100">
                    {/* Sprint goals */}
                    <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                      <p className="text-xs text-slate-600"><span className="font-semibold">Sprint Goal:</span> {sprint.goals}</p>
                    </div>

                    {/* Tasks */}
                    <div className="divide-y divide-slate-100">
                      {sprint.tasks.map(task => {
                        const isTaskExpanded = expandedTask === task.id;
                        const assignee = projectTeam.find(m => m.id === task.assignee);
                        const hasPrereqs = task.prereqs.length > 0;

                        return (
                          <div key={task.id} className="group">
                            <button onClick={() => setExpandedTask(isTaskExpanded ? null : task.id)} className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-sky-50/50 transition-colors">
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="text-[10px] font-mono font-bold text-slate-400 w-10 shrink-0">{task.id}</span>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-semibold text-slate-700">{task.title}</span>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${PRIORITY_STYLES[task.priority]}`}>{task.priority}</span>
                                    {task.risk !== 'Low' && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: RISK_COLORS[task.risk] + '20', color: RISK_COLORS[task.risk] }}>
                                        Risk: {task.risk}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                {hasPrereqs && (
                                  <span className="text-[9px] text-slate-400 hidden lg:block">
                                    Needs: {task.prereqs.join(', ')}
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{assignee?.name || task.assignee}</span>
                                <span className="text-xs font-bold text-indigo-600 w-8 text-right">{task.points}pt</span>
                                {isTaskExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-300" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-300" />}
                              </div>
                            </button>

                            {isTaskExpanded && (
                              <div className="px-5 pb-4 pt-1 ml-14 space-y-3">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                  <div className="bg-sky-50 rounded-lg p-3">
                                    <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-1">What</p>
                                    <p className="text-xs text-slate-700 leading-relaxed">{task.what}</p>
                                  </div>
                                  <div className="bg-amber-50 rounded-lg p-3">
                                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Why</p>
                                    <p className="text-xs text-slate-700 leading-relaxed">{task.why}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                                  <div className="bg-slate-50 rounded-lg p-2.5">
                                    <p className="text-[10px] text-slate-400 font-semibold">Data Volume</p>
                                    <p className="text-slate-700 mt-0.5 font-medium">{task.dataVolume}</p>
                                  </div>
                                  <div className="bg-slate-50 rounded-lg p-2.5">
                                    <p className="text-[10px] text-slate-400 font-semibold">Assignee</p>
                                    <p className="text-slate-700 mt-0.5 font-medium">{assignee?.name || task.assignee} ({assignee?.allocation}%)</p>
                                  </div>
                                  <div className="bg-slate-50 rounded-lg p-2.5">
                                    <p className="text-[10px] text-slate-400 font-semibold">Prerequisites</p>
                                    <p className="text-slate-700 mt-0.5 font-medium">{task.prereqs.length > 0 ? task.prereqs.join(', ') : 'None'}</p>
                                  </div>
                                  <div className="bg-slate-50 rounded-lg p-2.5">
                                    <p className="text-[10px] text-slate-400 font-semibold">Risk</p>
                                    <p className="mt-0.5 font-medium" style={{ color: RISK_COLORS[task.risk] }}>{task.risk}{task.riskNotes ? ` - ${task.riskNotes}` : ''}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══════════ TAB: Visual Roadmap (Gantt-like) ═══════════ */}
      {tab === 'gantt' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 overflow-x-auto">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Visual Roadmap ({projectStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {projectEnd.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})</h3>
            <div className="min-w-[800px]">
              {/* Week headers */}
              <div className="flex items-center mb-2">
                <div className="w-56 shrink-0" />
                <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${totalWeeks}, 1fr)` }}>
                  {Array.from({ length: totalWeeks }, (_, i) => {
                    const d = new Date(projectStart.getTime() + i * 7 * 24 * 60 * 60 * 1000);
                    return (
                      <div key={i} className="text-center text-[9px] text-slate-400 border-l border-slate-100 px-0.5">
                        {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Month markers */}
              <div className="flex items-center mb-1">
                <div className="w-56 shrink-0" />
                <div className="flex-1 relative h-4">
                  {monthMarkers.map((m) => (
                    <div key={m.label} className="absolute text-[10px] font-bold text-slate-500" style={{ left: `${(m.weekOffset / totalWeeks) * 100}%` }}>
                      {m.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sprint bars */}
              <div className="space-y-1.5 mt-2">
                {projectSprints.map(sprint => {
                  const startDate = new Date(sprint.startDate);
                  const endDate = new Date(sprint.endDate);
                  const totalDaysGantt = totalDays;
                  const startOffset = (startDate - projectStart) / (1000 * 60 * 60 * 24);
                  const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
                  const leftPct = (startOffset / totalDaysGantt) * 100;
                  const widthPct = (duration / totalDaysGantt) * 100;
                  const phaseStyle = PHASE_COLORS[sprint.phase] || {};
                  const critCount = sprint.tasks.filter(t => t.priority === 'Critical').length;

                  return (
                    <div key={sprint.id} className="flex items-center group">
                      <div className="w-56 shrink-0 pr-3 text-right">
                        <p className="text-xs font-semibold text-slate-700 truncate">{sprint.name.replace('Sprint ', 'S').replace(' - ', ': ')}</p>
                        <p className="text-[10px] text-slate-400">{sprint.totalPoints}pts | {sprint.tasks.length} tasks</p>
                      </div>
                      <div className="flex-1 relative h-8">
                        {/* Grid lines */}
                        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${totalWeeks}, 1fr)` }}>
                          {Array.from({ length: totalWeeks }, (_, i) => (
                            <div key={i} className="border-l border-slate-100 h-full" />
                          ))}
                        </div>
                        {/* Bar */}
                        <div
                          className={`absolute top-0.5 h-7 rounded-md ${phaseStyle.bg || 'bg-slate-400'} flex items-center px-2 gap-1.5 cursor-pointer hover:opacity-90 transition-opacity`}
                          style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                          onClick={() => { setTab('timeline'); setExpandedSprint(sprint.id); }}
                        >
                          <span className="text-[10px] font-bold text-white truncate">{sprint.id}</span>
                          {critCount > 0 && <span className="text-[9px] font-bold text-white/80 bg-white/20 px-1 rounded">{critCount}C</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Today marker if within range */}
              <div className="flex items-center mt-4">
                <div className="w-56 shrink-0" />
                <div className="flex-1 relative h-3">
                  <div className="absolute top-0 w-full border-t border-dashed border-slate-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Phase breakdown pie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Points by Phase</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={phaseData} dataKey="points" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3}>
                    {phaseData.map((entry, i) => <Cell key={i} fill={PHASE_COLORS[entry.name]?.bar || '#94a3b8'} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v} points`, n]} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Task Priority Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Critical', value: allTasks.filter(t => t.priority === 'Critical').length, fill: '#ef4444' },
                      { name: 'High', value: allTasks.filter(t => t.priority === 'High').length, fill: '#f59e0b' },
                      { name: 'Medium', value: allTasks.filter(t => t.priority === 'Medium').length, fill: '#0ea5e9' },
                    ]}
                    dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3}
                  >
                    {[0, 1, 2].map(i => <Cell key={i} fill={['#ef4444', '#f59e0b', '#0ea5e9'][i]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ TAB: Risk Register ═══════════ */}
      {tab === 'risks' && (
        <div className="space-y-4">
          {/* Risk summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <p className="text-[10px] font-semibold text-red-500 uppercase">Critical Risks</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{projectRisks.filter(r => r.score >= 9).length}</p>
              <p className="text-[10px] text-red-400 mt-0.5">Score 9+</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <p className="text-[10px] font-semibold text-amber-500 uppercase">High Risks</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{projectRisks.filter(r => r.score >= 6 && r.score < 9).length}</p>
              <p className="text-[10px] text-amber-400 mt-0.5">Score 6-8</p>
            </div>
            <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
              <p className="text-[10px] font-semibold text-sky-500 uppercase">Medium Risks</p>
              <p className="text-2xl font-bold text-sky-600 mt-1">{projectRisks.filter(r => r.score >= 3 && r.score < 6).length}</p>
              <p className="text-[10px] text-sky-400 mt-0.5">Score 3-5</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-500 uppercase">Total Days at Risk</p>
              <p className="text-2xl font-bold text-slate-700 mt-1">{projectRisks.reduce((s, r) => s + r.daysAtRisk, 0)}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Cumulative exposure</p>
            </div>
          </div>

          {/* Risk matrix heatmap */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Risk Matrix (Probability x Impact)</h3>
            <div className="flex gap-4">
              <div className="flex flex-col justify-between text-[10px] text-slate-500 font-semibold pr-2 py-2">
                <span>Critical</span><span>High</span><span>Medium</span><span>Low</span>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-1">
                  {['Critical', 'High', 'Medium', 'Low'].reverse().map(impact => (
                    ['Low', 'Medium', 'High'].map(prob => {
                      const cell = riskMatrix.find(c => c.impact === impact && c.probability === prob);
                      const bg = (impact === 'Critical' && prob === 'High') || (impact === 'High' && prob === 'High') || (impact === 'Critical' && prob === 'Medium')
                        ? 'bg-red-100' : (impact === 'High' && prob === 'Medium') || (impact === 'Medium' && prob === 'High') || (impact === 'Critical' && prob === 'Low')
                        ? 'bg-amber-100' : 'bg-emerald-50';
                      return (
                        <div key={`${impact}-${prob}`} className={`${bg} rounded-lg p-2 min-h-[60px] flex flex-col items-center justify-center`}>
                          {cell?.risks.map(r => (
                            <span key={r.id} className="text-[9px] font-bold text-slate-700 bg-white/80 px-1.5 py-0.5 rounded mb-0.5 block text-center truncate max-w-full" title={r.title}>
                              {r.id}
                            </span>
                          ))}
                        </div>
                      );
                    })
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  {['Low', 'Medium', 'High'].map(p => (
                    <div key={p} className="text-center text-[10px] text-slate-500 font-semibold">{p}</div>
                  ))}
                </div>
                <p className="text-center text-[10px] text-slate-400 mt-1">Probability →</p>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filter by category:</span>
            {['All', 'Technical', 'External Dependency', 'Financial', 'Operational', 'Adoption'].map(cat => (
              <button key={cat} onClick={() => setRiskFilter(cat)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${riskFilter === cat ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Risk cards */}
          <div className="space-y-3">
            {filteredRisks.sort((a, b) => b.score - a.score).map(risk => (
              <div key={risk.id} className={`bg-white rounded-xl border-l-4 border border-slate-200 p-5 ${risk.score >= 9 ? 'border-l-red-500' : risk.score >= 6 ? 'border-l-amber-500' : 'border-l-sky-500'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{risk.id}</span>
                      <h4 className="text-sm font-bold text-slate-800">{risk.title}</h4>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${risk.score >= 9 ? 'bg-red-100 text-red-700' : risk.score >= 6 ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'}`}>
                        Score: {risk.score}
                      </span>
                      <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{risk.category}</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">{risk.description}</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div className="bg-slate-50 rounded-lg p-2.5">
                        <p className="text-[10px] text-slate-400 font-semibold">Probability</p>
                        <p className="font-bold mt-0.5" style={{ color: RISK_COLORS[risk.probability] }}>{risk.probability}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2.5">
                        <p className="text-[10px] text-slate-400 font-semibold">Impact</p>
                        <p className="font-bold text-slate-700 mt-0.5">{risk.impact}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2.5">
                        <p className="text-[10px] text-slate-400 font-semibold">Days at Risk</p>
                        <p className="font-bold text-slate-700 mt-0.5">{risk.daysAtRisk} days</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2.5">
                        <p className="text-[10px] text-slate-400 font-semibold">Affected</p>
                        <p className="font-bold text-slate-700 mt-0.5">{risk.affectedSprints.join(', ')} ({risk.affectedTasks.join(', ')})</p>
                      </div>
                    </div>
                    <div className="mt-3 bg-emerald-50 rounded-lg p-3">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Mitigation Plan</p>
                      <p className="text-xs text-slate-700">{risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════ TAB: Team & Resources ═══════════ */}
      {tab === 'team' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Team Workload Distribution (Story Points)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={teamByRole.filter(t => t.assignedPoints > 0)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={140} />
                <Tooltip />
                <Bar dataKey="assignedPoints" name="Story Points" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamByRole.map(member => (
              <div key={member.id} className={`bg-white rounded-xl border border-slate-200 p-4 ${member.criticalTasks > 0 ? 'ring-1 ring-red-200' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-xs font-bold text-sky-600">{member.id}</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-700">{member.name}</h4>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${member.type === 'FTE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{member.type}</span>
                      <span className="text-[10px] text-slate-400">{member.allocation}% allocation</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <p className="text-slate-400 text-[10px]">Points</p>
                    <p className="font-bold text-indigo-600">{member.assignedPoints}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <p className="text-slate-400 text-[10px]">Tasks</p>
                    <p className="font-bold text-slate-700">{member.assignedTasks}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <p className="text-slate-400 text-[10px]">Critical</p>
                    <p className={`font-bold ${member.criticalTasks > 0 ? 'text-red-600' : 'text-slate-400'}`}>{member.criticalTasks}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {member.skills.map(s => (
                    <span key={s} className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">{s}</span>
                  ))}
                </div>
                {member.responsibilities && (
                  <p className="text-[10px] text-slate-500 mt-2 leading-relaxed border-t border-slate-100 pt-2">{member.responsibilities.split('.')[0]}.</p>
                )}
                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">{member.rate > 0 ? 'Annual Comp' : 'Cost'}</span>
                  <span className="font-bold text-slate-600">{member.rate > 0 ? `$${(member.rate * 2080).toLocaleString()}/yr` : 'Equity (unbilled)'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════ TAB: Budget & Cost ═══════════ */}
      {tab === 'budget' && (
        <div className="space-y-4">
          {/* Budget summary cards - per Technical Proposal Section 8 */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
              <p className="text-[10px] font-semibold text-sky-500 uppercase">Labor (1099)</p>
              <p className="text-2xl font-bold text-sky-600 mt-1">${(projectBudget.baseYear.laborTotal / 1000).toFixed(0)}K</p>
              <p className="text-[10px] text-sky-400 mt-0.5">2 FTE + 1 Architect (equity)</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <p className="text-[10px] font-semibold text-indigo-500 uppercase">Cloud Infrastructure</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">${(projectBudget.baseYear.cloudInfrastructure / 1000).toFixed(0)}K</p>
              <p className="text-[10px] text-indigo-400 mt-0.5">Secure commercial cloud hosting</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <p className="text-[10px] font-semibold text-amber-500 uppercase">Risk Reserve</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">${(projectBudget.baseYear.engineeringRiskReserve / 1000).toFixed(0)}K</p>
              <p className="text-[10px] text-amber-400 mt-0.5">Engineering risk buffer</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
              <p className="text-[10px] font-semibold text-violet-500 uppercase">Base Year Total</p>
              <p className="text-2xl font-bold text-violet-600 mt-1">${(projectBudget.baseYear.total / 1000).toFixed(0)}K</p>
              <p className="text-[10px] text-violet-400 mt-0.5">RFP No. 693JK426R600002</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p className="text-[10px] font-semibold text-emerald-500 uppercase">5-Year Total</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">${(projectBudget.fiveYear.total / 1000000).toFixed(2)}M</p>
              <p className="text-[10px] text-emerald-400 mt-0.5">Base + 4 option years @ ${(projectBudget.optionYear.total / 1000).toFixed(0)}K/yr</p>
            </div>
          </div>

          {/* Base Year Cost Breakdown Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700">Base Year Technical Pricing (Per Technical Proposal Section 8)</h3>
            </div>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b border-slate-100"><td className="px-5 py-2.5 text-slate-500 uppercase text-[10px] font-bold" colSpan={2}>Labor (1099)</td></tr>
                {projectBudget.baseYear.labor.map((l, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-5 py-2.5 pl-10 text-slate-700 font-medium">{l.role}</td>
                    <td className="px-5 py-2.5 text-right font-semibold text-slate-700">${l.annual.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="border-b border-slate-200 bg-sky-50"><td className="px-5 py-2.5 font-bold text-sky-700">Labor Total</td><td className="px-5 py-2.5 text-right font-bold text-sky-700">${projectBudget.baseYear.laborTotal.toLocaleString()}</td></tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50"><td className="px-5 py-2.5 text-slate-700 font-medium">Cloud Infrastructure</td><td className="px-5 py-2.5 text-right font-semibold text-slate-700">${projectBudget.baseYear.cloudInfrastructure.toLocaleString()}</td></tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50"><td className="px-5 py-2.5 text-slate-700 font-medium">Security & Monitoring Tools</td><td className="px-5 py-2.5 text-right font-semibold text-slate-700">${projectBudget.baseYear.securityMonitoring.toLocaleString()}</td></tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50"><td className="px-5 py-2.5 text-slate-700 font-medium">Training & Support Systems</td><td className="px-5 py-2.5 text-right font-semibold text-slate-700">${projectBudget.baseYear.trainingSupport.toLocaleString()}</td></tr>
                <tr className="border-b border-slate-200 bg-slate-50"><td className="px-5 py-2.5 font-bold text-slate-700">Subtotal Technical Delivery</td><td className="px-5 py-2.5 text-right font-bold text-slate-700">${projectBudget.baseYear.subtechnicalDelivery.toLocaleString()}</td></tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50"><td className="px-5 py-2.5 text-slate-700 font-medium">Engineering Risk Reserve</td><td className="px-5 py-2.5 text-right font-semibold text-amber-600">${projectBudget.baseYear.engineeringRiskReserve.toLocaleString()}</td></tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50"><td className="px-5 py-2.5 text-slate-700 font-medium">Platform Sustainment Margin</td><td className="px-5 py-2.5 text-right font-semibold text-slate-700">${projectBudget.baseYear.platformSustainmentMargin.toLocaleString()}</td></tr>
                <tr className="bg-indigo-50 border-t-2 border-indigo-200"><td className="px-5 py-3 font-bold text-indigo-800 text-sm">FINAL BASE YEAR TECHNICAL PRICE</td><td className="px-5 py-3 text-right font-bold text-indigo-800 text-sm">${projectBudget.baseYear.total.toLocaleString()}</td></tr>
              </tbody>
            </table>
          </div>

          {/* 5-Year Cost Summary */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700">5-Year Technical Total</h3>
            </div>
            <table className="w-full text-xs">
              <thead><tr className="text-slate-500 bg-slate-50"><th className="text-left px-5 py-2.5 font-semibold">Period</th><th className="text-right px-5 py-2.5 font-semibold">Amount</th></tr></thead>
              <tbody>
                <tr className="border-t border-slate-100 hover:bg-slate-50"><td className="px-5 py-3 font-semibold text-slate-700">Base Year</td><td className="px-5 py-3 text-right font-bold text-slate-700">${projectBudget.fiveYear.baseYear.toLocaleString()}</td></tr>
                <tr className="border-t border-slate-100 hover:bg-slate-50"><td className="px-5 py-3 font-semibold text-slate-700">4 Option Years (@ ${projectBudget.optionYear.total.toLocaleString()}/yr)</td><td className="px-5 py-3 text-right font-bold text-slate-700">${projectBudget.fiveYear.optionYears.toLocaleString()}</td></tr>
                <tr className="bg-emerald-50 border-t-2 border-emerald-200"><td className="px-5 py-3 font-bold text-emerald-800 text-sm">TOTAL TECHNICAL PORTION (5 Years)</td><td className="px-5 py-3 text-right font-bold text-emerald-800 text-sm">${projectBudget.fiveYear.total.toLocaleString()}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Option Year Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700">Option Year Technical Pricing</h3>
            </div>
            <table className="w-full text-xs">
              <thead><tr className="text-slate-500 bg-slate-50"><th className="text-left px-5 py-2.5 font-semibold">Category</th><th className="text-right px-5 py-2.5 font-semibold">Annual Cost</th></tr></thead>
              <tbody>
                <tr className="border-t border-slate-100 hover:bg-slate-50"><td className="px-5 py-3 text-slate-700">Labor</td><td className="px-5 py-3 text-right font-semibold text-slate-700">${projectBudget.optionYear.labor.toLocaleString()}</td></tr>
                <tr className="border-t border-slate-100 hover:bg-slate-50"><td className="px-5 py-3 text-slate-700">Infrastructure</td><td className="px-5 py-3 text-right font-semibold text-slate-700">${projectBudget.optionYear.infrastructure.toLocaleString()}</td></tr>
                <tr className="border-t border-slate-100 hover:bg-slate-50"><td className="px-5 py-3 text-slate-700">Security</td><td className="px-5 py-3 text-right font-semibold text-slate-700">${projectBudget.optionYear.security.toLocaleString()}</td></tr>
                <tr className="border-t border-slate-100 hover:bg-slate-50"><td className="px-5 py-3 text-slate-700">Training</td><td className="px-5 py-3 text-right font-semibold text-slate-700">${projectBudget.optionYear.training.toLocaleString()}</td></tr>
                <tr className="border-t border-slate-100 hover:bg-slate-50"><td className="px-5 py-3 text-slate-700">Sustainment Margin</td><td className="px-5 py-3 text-right font-semibold text-slate-700">${projectBudget.optionYear.sustainmentMargin.toLocaleString()}</td></tr>
                <tr className="bg-slate-50 border-t-2 border-slate-200"><td className="px-5 py-3 font-bold text-slate-700">OPTION YEAR PRICE</td><td className="px-5 py-3 text-right font-bold text-slate-800">${projectBudget.optionYear.total.toLocaleString()}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Labor burn chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Labor Cost by Sprint & Cumulative Burn</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={budgetChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                <Bar yAxisId="left" dataKey="labor" name="Sprint Cost" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="cumulative" name="Cumulative" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Infrastructure costs table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700">Annual Infrastructure & License Costs</h3>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-500">
                  <th className="text-left px-5 py-2.5 font-semibold">Service / License</th>
                  <th className="text-right px-5 py-2.5 font-semibold">Monthly</th>
                  <th className="text-right px-5 py-2.5 font-semibold">Annual</th>
                  <th className="text-right px-5 py-2.5 font-semibold">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {projectBudget.infrastructure.map((item, i) => (
                  <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-3 font-semibold text-slate-700">{item.item}</td>
                    <td className="px-5 py-3 text-right text-slate-600">${item.monthlyCost.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-semibold text-slate-700">${item.annual.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right text-slate-500">{((item.annual / projectBudget.totalInfraCostAnnual) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-200 bg-slate-50 font-bold">
                  <td className="px-5 py-3 text-slate-700">Total</td>
                  <td className="px-5 py-3 text-right text-slate-700">${(projectBudget.totalInfraCostAnnual / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className="px-5 py-3 text-right text-slate-800">${projectBudget.totalInfraCostAnnual.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-slate-600">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════ TAB: Dependencies ═══════════ */}
      {tab === 'dependencies' && (
        <div className="space-y-4">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-sky-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-sky-800">Dependency Map</h3>
                <p className="text-xs text-sky-600 mt-1">This view shows task-level prerequisites. If a task is blocked or delayed, all dependent tasks downstream will shift. Tasks with no prerequisites can start immediately within their sprint.</p>
              </div>
            </div>
          </div>

          {/* Critical path */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Critical Dependency Chains</h3>
            <div className="space-y-4">
              {[
                { name: 'Cloud → Database → Pipelines → Backfill → Quality', chain: ['T1.1', 'T1.2', 'T2.1', 'T2.4', 'T2.5'], desc: 'Core data path: cloud infra → database → ETL pipelines → historical backfill → quality validation. AI accelerates each step.' },
                { name: 'API → Market Analytics → Frontend Integration', chain: ['T1.3', 'T3.1', 'T3.3'], desc: 'Analytics delivery: API scaffold → market analytics endpoints → frontend live data integration replacing dummy data.' },
                { name: 'Data → AI/LLM → Anomaly Detection → Reports', chain: ['T3.1', 'T4.1', 'T4.2', 'T4.4'], desc: 'AI augmentation chain: market data needed before LLM integration, which enables anomaly detection and AI-assisted report preparation.' },
                { name: 'Security → Training → Transition → UAT → Production', chain: ['T1.4', 'T6.1', 'T6.2', 'T6.3', 'T7.1', 'T7.3'], desc: 'Delivery chain: security baseline → hardening → training materials → transition support → UAT → production deployment.' },
                { name: 'Regulatory → Export → Role-Based Access', chain: ['T3.4', 'T5.1', 'T5.2', 'T5.3'], desc: 'Regulatory workflow: competitive evaluation → regulatory tools → exportable datasets → secure access controls.' },
              ].map((chain, i) => (
                <div key={i} className="border border-slate-100 rounded-lg p-4">
                  <h4 className="text-xs font-bold text-slate-700 mb-1">{chain.name}</h4>
                  <p className="text-[10px] text-slate-500 mb-3">{chain.desc}</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {chain.chain.map((taskId, ti) => {
                      const task = allTasks.find(t => t.id === taskId);
                      const isHighRisk = task?.risk === 'High';
                      return (
                        <div key={taskId} className="flex items-center gap-1">
                          <div className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border ${isHighRisk ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-slate-200 text-slate-700'}`} title={task?.title}>
                            <span className="font-mono">{taskId}</span>
                            {isHighRisk && <AlertTriangle className="w-3 h-3 inline ml-1 text-red-500" />}
                          </div>
                          {ti < chain.chain.length - 1 && <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Per-sprint dependency table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700">All Task Dependencies</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-500 bg-slate-50">
                    <th className="text-left px-4 py-2.5 font-semibold">Task</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Title</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Sprint</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Prerequisites</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Blocks</th>
                    <th className="text-center px-4 py-2.5 font-semibold">Risk</th>
                    <th className="text-center px-4 py-2.5 font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {allTasks.filter(t => t.prereqs.length > 0 || allTasks.some(ot => ot.prereqs.includes(t.id))).map(task => {
                    const blocks = allTasks.filter(ot => ot.prereqs.includes(task.id)).map(ot => ot.id);
                    return (
                      <tr key={task.id} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-mono font-bold text-slate-500">{task.id}</td>
                        <td className="px-4 py-2.5 font-semibold text-slate-700 max-w-[200px] truncate">{task.title}</td>
                        <td className="px-4 py-2.5">
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${PHASE_COLORS[task.phase]?.light || 'bg-slate-100 text-slate-600'}`}>{task.sprintId}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex flex-wrap gap-1">
                            {task.prereqs.length > 0 ? task.prereqs.map(p => (
                              <span key={p} className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">{p}</span>
                            )) : <span className="text-slate-300">—</span>}
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex flex-wrap gap-1">
                            {blocks.length > 0 ? blocks.map(b => (
                              <span key={b} className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700">{b}</span>
                            )) : <span className="text-slate-300">—</span>}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className="text-[9px] font-bold" style={{ color: RISK_COLORS[task.risk] }}>{task.risk}</span>
                        </td>
                        <td className="px-4 py-2.5 text-center font-bold text-indigo-600">{task.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
