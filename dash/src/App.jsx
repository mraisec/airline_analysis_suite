import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TrafficMarkets from './pages/TrafficMarkets';
import FleetIntelligence from './pages/FleetIntelligence';
import ScheduleExplorer from './pages/ScheduleExplorer';
import Regulatory from './pages/Regulatory';
import Reports from './pages/Reports';
import AiInsights from './pages/AiInsights';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute path="/"><Layout /></ProtectedRoute>}>
            <Route path="/" element={<ProtectedRoute path="/"><Dashboard /></ProtectedRoute>} />
            <Route path="/traffic" element={<ProtectedRoute path="/traffic"><TrafficMarkets /></ProtectedRoute>} />
            <Route path="/fleet" element={<ProtectedRoute path="/fleet"><FleetIntelligence /></ProtectedRoute>} />
            <Route path="/schedules" element={<ProtectedRoute path="/schedules"><ScheduleExplorer /></ProtectedRoute>} />
            <Route path="/regulatory" element={<ProtectedRoute path="/regulatory"><Regulatory /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute path="/reports"><Reports /></ProtectedRoute>} />
            <Route path="/ai-insights" element={<ProtectedRoute path="/ai-insights"><AiInsights /></ProtectedRoute>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
