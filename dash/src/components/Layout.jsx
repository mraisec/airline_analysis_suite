import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Plane,
  CalendarClock,
  Scale,
  FileDown,
  BrainCircuit,
  Menu,
  X,
  ChevronRight,
  Shield,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/traffic', label: 'Traffic & Markets', icon: TrendingUp },
  { to: '/fleet', label: 'Fleet Intelligence', icon: Plane },
  { to: '/schedules', label: 'Schedule Explorer', icon: CalendarClock },
  { to: '/regulatory', label: 'Regulatory & Mergers', icon: Scale },
  { to: '/reports', label: 'Reports & Export', icon: FileDown },
  { to: '/ai-insights', label: 'AI Insights', icon: BrainCircuit },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, hasAccess, getPermissions } = useAuth();
  const navigate = useNavigate();
  const perms = getPermissions();

  const visibleNav = navItems.filter(item => hasAccess(item.to));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          flex flex-col bg-slate-900 text-white
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64' : 'w-20'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700/50">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sky-500 shrink-0">
            <Plane className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold tracking-wide text-white leading-tight">
                OAA Aviation
              </h1>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase">
                Analysis Suite
              </p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {visibleNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-sky-500/20 text-sky-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User & Footer */}
        <div className="px-3 py-4 border-t border-slate-700/50 space-y-2">
          {user && sidebarOpen && (
            <div className="px-3 py-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-xs font-bold text-sky-400 shrink-0">
                  {user.avatar}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                  <p className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full inline-block mt-0.5 ${perms?.color || 'bg-slate-700 text-slate-300'}`}>
                    {perms?.label || user.role}
                  </p>
                </div>
              </div>
            </div>
          )}
          {user && !sidebarOpen && (
            <div className="flex justify-center py-1">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-xs font-bold text-sky-400" title={user.name}>
                {user.avatar}
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 px-3 py-2">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            {sidebarOpen && (
              <span className="text-xs text-slate-400">
                Secure • Encrypted
              </span>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`}
            />
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between h-14 px-4 bg-white border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              DOT / Office of Aviation Analysis
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">
              Data through: Mar 2025
            </span>
            {user && (
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${perms?.color || 'bg-slate-100 text-slate-600'}`}>
                  {perms?.label || user.role}
                </span>
                <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-bold">
                  {user.avatar}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
