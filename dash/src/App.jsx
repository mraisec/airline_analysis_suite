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
import RouteMap from './pages/RouteMap';
import DataPipelines from './pages/DataPipelines';
import UserManagement from './pages/UserManagement';
import SystemSettings from './pages/SystemSettings';

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
            <Route path="/route-map" element={<ProtectedRoute path="/route-map"><RouteMap /></ProtectedRoute>} />
            <Route path="/regulatory" element={<ProtectedRoute path="/regulatory"><Regulatory /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute path="/reports"><Reports /></ProtectedRoute>} />
            <Route path="/ai-insights" element={<ProtectedRoute path="/ai-insights"><AiInsights /></ProtectedRoute>} />
            <Route path="/data-pipelines" element={<ProtectedRoute path="/data-pipelines"><DataPipelines /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute path="/admin/users"><UserManagement /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute path="/admin/settings"><SystemSettings /></ProtectedRoute>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
