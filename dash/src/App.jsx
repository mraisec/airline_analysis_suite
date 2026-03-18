import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/traffic" element={<TrafficMarkets />} />
          <Route path="/fleet" element={<FleetIntelligence />} />
          <Route path="/schedules" element={<ScheduleExplorer />} />
          <Route path="/regulatory" element={<Regulatory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ai-insights" element={<AiInsights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
