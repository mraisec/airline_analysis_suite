import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Seeded user credentials with roles
const USERS = [
  {
    id: 1,
    email: 'admin@oaa.dot.gov',
    password: 'Admin@2025',
    name: 'Robin Golden',
    role: 'admin',
    title: 'System Administrator',
    avatar: 'RG',
  },
  {
    id: 2,
    email: 'senior.analyst@oaa.dot.gov',
    password: 'Analyst@2025',
    name: 'Sarah Mitchell',
    role: 'senior_analyst',
    title: 'Senior Aviation Analyst',
    avatar: 'SM',
  },
  {
    id: 3,
    email: 'analyst@oaa.dot.gov',
    password: 'Analyst@2025',
    name: 'James Carter',
    role: 'analyst',
    title: 'Aviation Analyst',
    avatar: 'JC',
  },
];

// Role-based access control
const ROLE_PERMISSIONS = {
  admin: {
    label: 'Administrator',
    color: 'bg-purple-100 text-purple-700',
    pages: ['/', '/traffic', '/fleet', '/schedules', '/route-map', '/regulatory', '/reports', '/ai-insights', '/data-pipelines', '/admin/users', '/admin/settings', '/project-management'],
    canExport: true,
    canManageUsers: true,
    canViewMergers: true,
    canViewAI: true,
  },
  senior_analyst: {
    label: 'Senior Analyst',
    color: 'bg-sky-100 text-sky-700',
    pages: ['/', '/traffic', '/fleet', '/schedules', '/route-map', '/regulatory', '/reports', '/ai-insights', '/data-pipelines'],
    canExport: true,
    canManageUsers: false,
    canViewMergers: true,
    canViewAI: true,
  },
  analyst: {
    label: 'Analyst',
    color: 'bg-emerald-100 text-emerald-700',
    pages: ['/', '/traffic', '/fleet', '/schedules', '/route-map', '/reports'],
    canExport: true,
    canManageUsers: false,
    canViewMergers: false,
    canViewAI: false,
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('oaa_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      localStorage.setItem('oaa_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('oaa_user');
    }
  }, [user]);

  const login = (email, password) => {
    setError('');
    const found = USERS.find(
      (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim() && u.password === password.trim()
    );
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      return true;
    }
    setError('Invalid email or password');
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const hasAccess = (path) => {
    if (!user) return false;
    const perms = ROLE_PERMISSIONS[user.role];
    return perms?.pages.includes(path) ?? false;
  };

  const getPermissions = () => {
    if (!user) return null;
    return ROLE_PERMISSIONS[user.role] || null;
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, hasAccess, getPermissions, ROLE_PERMISSIONS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { ROLE_PERMISSIONS };
