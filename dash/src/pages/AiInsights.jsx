import { useState } from 'react';
import { BrainCircuit, TrendingUp, AlertTriangle, Zap, Bell, Search, MessageSquare, Send } from 'lucide-react';
import { aiInsights, bookingData } from '../data/dummyData';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';

const TYPE_ICONS = {
  Trend: TrendingUp,
  Anomaly: AlertTriangle,
  Prediction: Zap,
  Alert: Bell,
};

const SEVERITY_STYLES = {
  info: { bg: 'bg-sky-50', border: 'border-l-sky-500', text: 'text-sky-700', badge: 'bg-sky-100 text-sky-700' },
  warning: { bg: 'bg-amber-50', border: 'border-l-amber-500', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
  error: { bg: 'bg-red-50', border: 'border-l-red-500', text: 'text-red-700', badge: 'bg-red-100 text-red-700' },
};

const NLP_DEMO_RESPONSES = {
  default: "I can help you analyze aviation data. Try asking about specific routes, carriers, or trends. For example: 'What is the market share on JFK-LAX?' or 'Show me fare trends for trans-Atlantic routes.'",
  'jfk': "JFK is one of the busiest international gateways in the US. Key metrics:\n• Total international passengers: ~12.2M annually\n• Top route: JFK-LHR with 4.1M passengers\n• Slot-controlled airport with 455 total allocated slots\n• Primary carriers: DL (145 slots), AA (112 slots), B6 (98 slots)",
  'market share': "Based on our top O&D markets data:\n• Delta leads in ATL hub markets (38-45% share)\n• United dominates ORD and SFO markets (32-58% share)\n• American is strongest at DFW (55% share)\n• British Airways leads transatlantic from multiple US gateways",
  'fare': "Current fare trends show:\n• Domestic average fare: ~$220 with seasonal peaks in summer\n• International average fare: ~$485, up 2.1% YoY\n• Trans-Atlantic fares averaging $780-$945 depending on route\n• Ultra-long-haul routes (LAX-DXB) commanding $1,150+ average fares",
  'merger': "Current merger activity under analysis:\n• JetBlue-Spirit (Hypothetical): Under Review - would affect 28 markets, HHI increase to 3,120 (above DOJ threshold)\n• Alaska-Hawaiian: Approved with conditions - 12 affected markets\n• Delta-LATAM JV: Proposed enhanced joint venture covering US-South America routes",
  'fleet': "Fleet highlights across tracked carriers:\n• Boeing 737 variants remain the most common narrow-body\n• A321neo seeing rapid adoption (AA: 129, DL: 155, B6: 76)\n• Average wide-body fleet age: 6-10 years\n• Emirates leading A350-900 adoption with 50 aircraft (avg age 0.8 years)",
};

function getNLPResponse(query) {
  const q = query.toLowerCase();
  for (const [key, response] of Object.entries(NLP_DEMO_RESPONSES)) {
    if (key !== 'default' && q.includes(key)) return response;
  }
  return NLP_DEMO_RESPONSES.default;
}

export default function AiInsights() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [nlpQuery, setNlpQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', text: "Welcome to the AI Analytics assistant. I can help you explore aviation data using natural language. Try asking about routes, carriers, fares, mergers, or fleet information." },
  ]);

  const categories = ['all', ...new Set(aiInsights.map(i => i.category))];
  const severities = ['all', 'info', 'warning', 'error'];

  const filtered = aiInsights.filter(i => {
    if (categoryFilter !== 'all' && i.category !== categoryFilter) return false;
    if (severityFilter !== 'all' && i.severity !== severityFilter) return false;
    return true;
  });

  const handleNlpSubmit = (e) => {
    e.preventDefault();
    if (!nlpQuery.trim()) return;
    const userMsg = { role: 'user', text: nlpQuery };
    const response = getNLPResponse(nlpQuery);
    const assistantMsg = { role: 'assistant', text: response };
    setChatHistory(prev => [...prev, userMsg, assistantMsg]);
    setNlpQuery('');
  };

  // Booking curve data for a selected market
  const bookingCurve = bookingData
    .filter(b => b.market === 'JFK-LHR')
    .sort((a, b) => b.daysBeforeDeparture - a.daysBeforeDeparture);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">AI Analytics & Insights</h2>
        <p className="text-sm text-slate-500 mt-1">
          AI-powered pattern recognition, trend analysis, predictive modeling, and natural language query interface
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* NLP Chat Interface */}
        <div className="xl:col-span-1 bg-white rounded-xl border border-slate-200 flex flex-col h-[520px]">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-500" />
            <h3 className="text-sm font-semibold text-slate-700">Natural Language Query</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                  msg.role === 'user'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed">{msg.text}</pre>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleNlpSubmit} className="p-3 border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={nlpQuery}
                onChange={e => setNlpQuery(e.target.value)}
                placeholder="Ask about routes, fares, mergers..."
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {['JFK routes', 'Market share', 'Fare trends', 'Merger analysis', 'Fleet data'].map(q => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setNlpQuery(q)}
                  className="px-2 py-0.5 text-[10px] bg-slate-100 text-slate-500 rounded hover:bg-slate-200 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Insights feed */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                    categoryFilter === c ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
              {severities.map(s => (
                <button
                  key={s}
                  onClick={() => setSeverityFilter(s)}
                  className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                    severityFilter === s ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((insight) => {
              const Icon = TYPE_ICONS[insight.type] || BrainCircuit;
              const style = SEVERITY_STYLES[insight.severity] || SEVERITY_STYLES.info;
              return (
                <div
                  key={insight.id}
                  className={`${style.bg} border-l-4 ${style.border} rounded-r-xl p-4`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${style.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${style.badge}`}>
                          {insight.type}
                        </span>
                        <span className="text-[10px] text-slate-400 bg-white/60 px-1.5 py-0.5 rounded">
                          {insight.category}
                        </span>
                        <span className="text-[10px] text-slate-400 ml-auto">{insight.date}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-800">{insight.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Predictive: Booking curve */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-1">Predictive Model: Advanced Booking Curve (JFK-LHR)</h3>
        <p className="text-xs text-slate-500 mb-4">Average fare and booking percentage by days before departure</p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={bookingCurve}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="daysBeforeDeparture" reversed tick={{ fontSize: 11 }} label={{ value: 'Days Before Departure', position: 'bottom', offset: -5, fontSize: 11 }} />
            <YAxis yAxisId="fare" tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} />
            <YAxis yAxisId="pct" orientation="right" tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
            <Tooltip />
            <Legend />
            <Line yAxisId="fare" type="monotone" dataKey="avgFare" name="Avg Fare ($)" stroke="#6366f1" strokeWidth={2} />
            <Line yAxisId="pct" type="monotone" dataKey="bookingPct" name="Booking %" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
