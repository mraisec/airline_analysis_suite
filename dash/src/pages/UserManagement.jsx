import { useState } from 'react';
import { userAccounts, auditLog } from '../data/dummyData';
import { ROLE_PERMISSIONS } from '../context/AuthContext';
import { Users, Shield, Clock, Search, Plus, MoreHorizontal, Info, Eye, Lock, Unlock, UserCog } from 'lucide-react';

const PRODUCTION_NOTE = {
  title: 'Production Implementation',
  description: 'In production, user management will integrate with Active Directory / SAML SSO for the DOT network. Account creation, role changes, and deactivation will be handled via a backend API with full audit trail. MFA enforcement, password policies, and session management will comply with FedRAMP requirements.',
  tech: ['Active Directory / SAML 2.0', 'OAuth2 + JWT', 'bcrypt password hashing', 'TOTP/WebAuthn MFA', 'Audit trail DB'],
};

const roleBadge = (role) => {
  const p = ROLE_PERMISSIONS[role];
  if (!p) return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{role}</span>;
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.color}`}>{p.label}</span>;
};

const statusBadge = (status) => {
  const styles = {
    Active: 'bg-emerald-100 text-emerald-700',
    Inactive: 'bg-slate-100 text-slate-500',
    Locked: 'bg-red-100 text-red-700',
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>;
};

export default function UserManagement() {
  const [tab, setTab] = useState('users');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = userAccounts.filter((u) => {
    if (roleFilter !== 'All' && u.role !== roleFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filteredLogs = auditLog.filter((l) => {
    if (search && !l.user.toLowerCase().includes(search.toLowerCase()) && !l.action.toLowerCase().includes(search.toLowerCase()) && !l.target.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Accounts, roles, permissions, and audit trail</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">Placeholder - Requires Backend</span>
          <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add User
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: userAccounts.length, icon: Users, color: 'text-slate-700' },
          { label: 'Active', value: userAccounts.filter(u => u.status === 'Active').length, icon: Shield, color: 'text-emerald-600' },
          { label: 'Inactive / Locked', value: userAccounts.filter(u => u.status !== 'Active').length, icon: Lock, color: 'text-red-600' },
          { label: 'Audit Events (30d)', value: auditLog.length, icon: Clock, color: 'text-indigo-600' },
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
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          {['users', 'audit'].map((t) => (
            <button key={t} onClick={() => { setTab(t); setSearch(''); }} className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${tab === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {t === 'users' ? 'User Accounts' : 'Audit Log'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-white w-48" />
          </div>
          {tab === 'users' && (
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white">
              <option value="All">All Roles</option>
              <option value="admin">Administrator</option>
              <option value="senior_analyst">Senior Analyst</option>
              <option value="analyst">Analyst</option>
            </select>
          )}
        </div>
      </div>

      {tab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500">
                  <th className="text-left px-4 py-3 font-semibold">User</th>
                  <th className="text-left px-4 py-3 font-semibold">Role</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Last Login</th>
                  <th className="text-left px-4 py-3 font-semibold">Logins</th>
                  <th className="text-left px-4 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className={`border-t border-slate-100 hover:bg-slate-50 cursor-pointer ${selectedUser?.id === u.id ? 'bg-sky-50' : ''}`} onClick={() => setSelectedUser(u)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {u.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-700">{u.name}</p>
                          <p className="text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{roleBadge(u.role)}</td>
                    <td className="px-4 py-3">{statusBadge(u.status)}</td>
                    <td className="px-4 py-3 text-slate-500">{u.lastLogin.split(' ')[0]}</td>
                    <td className="px-4 py-3 text-slate-500">{u.loginCount}</td>
                    <td className="px-4 py-3"><MoreHorizontal className="w-4 h-4 text-slate-300" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail panel */}
          <div className="space-y-4">
            {selectedUser ? (
              <>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sm font-bold text-sky-600">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-700">{selectedUser.name}</h3>
                      <p className="text-xs text-slate-400">{selectedUser.title}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between"><span className="text-slate-400">Email</span><span className="text-slate-700">{selectedUser.email}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Department</span><span className="text-slate-700">{selectedUser.department}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Role</span>{roleBadge(selectedUser.role)}</div>
                    <div className="flex justify-between"><span className="text-slate-400">Status</span>{statusBadge(selectedUser.status)}</div>
                    <div className="flex justify-between"><span className="text-slate-400">Last Login</span><span className="text-slate-700">{selectedUser.lastLogin}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Total Logins</span><span className="text-slate-700">{selectedUser.loginCount}</span></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h4 className="text-xs font-semibold text-slate-600 mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100"><UserCog className="w-3.5 h-3.5" /> Edit Role</button>
                    <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100"><Eye className="w-3.5 h-3.5" /> View Activity</button>
                    {selectedUser.status === 'Locked' ? (
                      <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 col-span-2"><Unlock className="w-3.5 h-3.5" /> Unlock Account</button>
                    ) : (
                      <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 col-span-2"><Lock className="w-3.5 h-3.5" /> Lock Account</button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-xs text-slate-400">
                <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                Click a user to view details
              </div>
            )}

            {/* Role summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h4 className="text-xs font-semibold text-slate-600 mb-3">Roles & Permissions</h4>
              <div className="space-y-3">
                {Object.entries(ROLE_PERMISSIONS).map(([key, perm]) => (
                  <div key={key} className="text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-semibold px-2 py-0.5 rounded-full ${perm.color}`}>{perm.label}</span>
                      <span className="text-slate-400">{userAccounts.filter(u => u.role === key).length} users</span>
                    </div>
                    <p className="text-slate-400 pl-1">{perm.pages.length} pages, Export: {perm.canExport ? 'Yes' : 'No'}, Mergers: {perm.canViewMergers ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500">
                <th className="text-left px-4 py-3 font-semibold">Timestamp</th>
                <th className="text-left px-4 py-3 font-semibold">User</th>
                <th className="text-left px-4 py-3 font-semibold">Action</th>
                <th className="text-left px-4 py-3 font-semibold">Target</th>
                <th className="text-left px-4 py-3 font-semibold">IP</th>
                <th className="text-left px-4 py-3 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-4 py-3 font-semibold text-slate-700">{log.user}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${
                      log.action.includes('Failed') || log.action.includes('Locked') ? 'bg-red-100 text-red-700'
                      : log.action.includes('Created') || log.action.includes('Completed') ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                    }`}>{log.action}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{log.target}</td>
                  <td className="px-4 py-3 text-slate-400 font-mono">{log.ip}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-[200px] truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
