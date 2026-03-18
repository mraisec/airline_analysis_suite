import { useState } from 'react';
import { FileDown, FileText, Table2, BarChart3, Filter, Download, Check, Clock } from 'lucide-react';
import { odMarkets, monthlyTraffic, fleetData, scheduleData, airlines, airports } from '../data/dummyData';

const REPORT_TEMPLATES = [
  { id: 'od-traffic', name: 'O&D Traffic Report', description: 'Passenger volumes by origin-destination pair with carrier market shares', icon: BarChart3, category: 'Traffic' },
  { id: 'fare-analysis', name: 'Fare Analysis Report', description: 'Average fares by market, class of service, and time period', icon: Table2, category: 'Fares' },
  { id: 'market-share', name: 'Carrier Market Share', description: 'Market share by carrier across selected routes and time periods', icon: BarChart3, category: 'Traffic' },
  { id: 'fleet-summary', name: 'Fleet Summary Report', description: 'Aircraft fleet composition with capacity and cabin configuration', icon: FileText, category: 'Fleet' },
  { id: 'schedule-extract', name: 'Schedule Data Extract', description: 'Flight-level schedule data export with all attributes', icon: Table2, category: 'Schedules' },
  { id: 'load-factor', name: 'Load Factor Report', description: 'Monthly load factors by carrier and route', icon: BarChart3, category: 'Traffic' },
  { id: 'slot-utilization', name: 'Slot Utilization Report', description: 'Slot allocation and utilization at controlled airports', icon: FileText, category: 'Regulatory' },
  { id: 'merger-impact', name: 'Merger Impact Assessment', description: 'HHI analysis and competitive impact of proposed mergers', icon: FileText, category: 'Regulatory' },
  { id: 'booking-curves', name: 'Advanced Booking Curves', description: 'Booking patterns and fare progression by days before departure', icon: BarChart3, category: 'Fares' },
  { id: 'custom', name: 'Custom Report Builder', description: 'Build a custom report by selecting data fields and filters', icon: Filter, category: 'Custom' },
];

const EXPORT_HISTORY = [
  { name: 'JFK-LHR Traffic Q4 2024.csv', date: '2025-03-10', size: '2.4 MB', status: 'complete' },
  { name: 'Fleet Summary All Carriers.csv', date: '2025-03-08', size: '845 KB', status: 'complete' },
  { name: 'Merger HHI Analysis - B6-NK.csv', date: '2025-03-05', size: '312 KB', status: 'complete' },
  { name: 'Schedule Extract Jan 2025.csv', date: '2025-03-01', size: '18.7 MB', status: 'complete' },
  { name: 'OD Market Shares 2024.csv', date: '2025-02-28', size: '5.1 MB', status: 'complete' },
];

function convertToCSV(data) {
  if (!data.length) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => {
    const val = row[h];
    if (typeof val === 'object') return JSON.stringify(val);
    return val;
  }).join(','));
  return [headers.join(','), ...rows].join('\n');
}

function downloadCSV(filename, csvContent) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [exportFormat, setExportFormat] = useState('csv');
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);

  const filteredReports = categoryFilter === 'all'
    ? REPORT_TEMPLATES
    : REPORT_TEMPLATES.filter(r => r.category === categoryFilter);

  const categories = ['all', ...new Set(REPORT_TEMPLATES.map(r => r.category))];

  const handleExport = (reportId) => {
    setExporting(true);
    setExportDone(false);

    setTimeout(() => {
      let data, filename;
      switch (reportId) {
        case 'od-traffic':
          data = odMarkets.map(m => ({ origin: m.origin, dest: m.dest, passengers: m.pax, avgFare: m.avgFare, yoyGrowth: m.growth, carriers: m.carriers.join(';') }));
          filename = 'OD_Traffic_Report.csv';
          break;
        case 'fleet-summary':
          data = fleetData.map(f => {
            const al = airlines.find(a => a.code === f.airline);
            return { airline: al?.name || f.airline, code: f.airline, aircraft: f.type, count: f.count, avgAge: f.avgAge, cabinConfig: f.cabinConfig };
          });
          filename = 'Fleet_Summary.csv';
          break;
        case 'schedule-extract':
          data = scheduleData.slice(0, 500).map(f => ({
            date: f.date, flight: f.flight, airline: f.airline, origin: f.origin, dest: f.dest,
            departure: f.dep, arrival: f.arr, aircraft: f.aircraft, frequency: f.freq, status: f.status,
          }));
          filename = 'Schedule_Extract.csv';
          break;
        default:
          data = monthlyTraffic.map(m => ({
            period: m.period, totalPax: m.totalPax, domesticPax: m.domesticPax, internationalPax: m.internationalPax,
            avgFare: m.avgFare, loadFactor: m.loadFactor, flights: m.flights,
          }));
          filename = `${reportId}_Report.csv`;
      }
      downloadCSV(filename, convertToCSV(data));
      setExporting(false);
      setExportDone(true);
      setTimeout(() => setExportDone(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Reports & Data Export</h2>
        <p className="text-sm text-slate-500 mt-1">
          Generate pre-defined reports or build custom data exports in .csv or .txt format
        </p>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategoryFilter(c)}
            className={`px-4 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
              categoryFilter === c ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Report templates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredReports.map((report) => {
          const Icon = report.icon;
          const isSelected = selectedReport === report.id;
          return (
            <div
              key={report.id}
              onClick={() => setSelectedReport(isSelected ? null : report.id)}
              className={`bg-white rounded-xl border p-5 cursor-pointer transition-all ${
                isSelected ? 'border-sky-300 ring-2 ring-sky-100' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-sky-100' : 'bg-slate-100'
                }`}>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-sky-600' : 'text-slate-500'}`} />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                  {report.category}
                </span>
              </div>
              <h4 className="font-semibold text-slate-800 text-sm">{report.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{report.description}</p>

              {isSelected && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-xs text-slate-500">Format:</label>
                    <select
                      value={exportFormat}
                      onChange={e => setExportFormat(e.target.value)}
                      className="px-2 py-1 text-xs border border-slate-200 rounded bg-white"
                      onClick={e => e.stopPropagation()}
                    >
                      <option value="csv">.csv</option>
                      <option value="txt">.txt</option>
                    </select>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleExport(report.id); }}
                    disabled={exporting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 disabled:bg-slate-300 transition-colors"
                  >
                    {exporting ? (
                      <><Clock className="w-4 h-4 animate-spin" /> Generating...</>
                    ) : exportDone ? (
                      <><Check className="w-4 h-4" /> Downloaded!</>
                    ) : (
                      <><Download className="w-4 h-4" /> Export Report</>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Export History */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Recent Exports</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">File</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Size</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {EXPORT_HISTORY.map((item, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <FileDown className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{item.date}</td>
                  <td className="py-2.5 px-3 text-slate-500">{item.size}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button className="text-xs text-sky-600 hover:text-sky-700 font-medium">
                      Re-download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
