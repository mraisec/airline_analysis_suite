import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, Lock, Mail, Eye, EyeOff, ShieldCheck, ChevronRight } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { email: 'admin@oaa.dot.gov', password: 'Admin@2025', role: 'Administrator', name: 'Robin Golden' },
  { email: 'senior.analyst@oaa.dot.gov', password: 'Analyst@2025', role: 'Senior Analyst', name: 'Sarah Mitchell' },
  { email: 'analyst@oaa.dot.gov', password: 'Analyst@2025', role: 'Analyst', name: 'James Carter' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/');
    }
  };

  const handleDemoLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    if (login(account.email, account.password)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-sky-400 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-16 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`h${i}`} className="absolute w-full h-px bg-white" style={{ top: `${i * 5}%` }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`v${i}`} className="absolute h-full w-px bg-white" style={{ left: `${i * 5}%` }} />
          ))}
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-wide">OAA Aviation</h1>
              <p className="text-[10px] text-sky-300 uppercase tracking-[0.2em]">Analysis Suite</p>
            </div>
          </div>

          {/* Center content */}
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white leading-tight mb-6">
              Airline Analysis &<br />Scheduling Solution
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Comprehensive aviation data analytics platform for the
              U.S. Department of Transportation — Office of Aviation Analysis.
            </p>

            <div className="space-y-4">
              {[
                { label: 'Traffic & Market Analysis', desc: 'Global O&D traffic, fares, and market share data' },
                { label: 'Fleet Intelligence', desc: 'Aircraft fleet composition with capacity and configuration' },
                { label: 'AI-Powered Insights', desc: 'Natural language queries, predictive modeling, and trend analysis' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <ChevronRight className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.label}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted • FedRAMP Compliant • USA-Based Operations</span>
          </div>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800">OAA Aviation</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">Analysis Suite</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
            <p className="text-sm text-slate-500 mt-1">Sign in to access the Aviation Analysis Suite</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@oaa.dot.gov"
                  required
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-11 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          {/* Demo accounts toggle */}
          <div className="mt-8">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="w-full text-center text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showDemo ? 'Hide demo accounts' : 'Show demo accounts for testing'}
            </button>

            {showDemo && (
              <div className="mt-4 space-y-2">
                {DEMO_ACCOUNTS.map((account, i) => (
                  <button
                    key={i}
                    onClick={() => handleDemoLogin(account)}
                    className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl hover:border-sky-300 hover:bg-sky-50/50 transition-all group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-sky-600 transition-colors">
                        {account.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{account.name}</p>
                        <p className="text-[11px] text-slate-400">{account.email}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                      account.role === 'Administrator' ? 'bg-purple-100 text-purple-700'
                      : account.role === 'Senior Analyst' ? 'bg-sky-100 text-sky-700'
                      : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {account.role}
                    </span>
                  </button>
                ))}
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Click any account above to sign in instantly
                </p>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-400 text-center mt-10">
            U.S. Department of Transportation • Office of Aviation Analysis
          </p>
        </div>
      </div>
    </div>
  );
}
