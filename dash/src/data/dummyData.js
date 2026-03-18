// ─── Airlines ───
export const airlines = [
  { code: 'AA', name: 'American Airlines', country: 'US', alliance: 'oneworld' },
  { code: 'DL', name: 'Delta Air Lines', country: 'US', alliance: 'SkyTeam' },
  { code: 'UA', name: 'United Airlines', country: 'US', alliance: 'Star Alliance' },
  { code: 'WN', name: 'Southwest Airlines', country: 'US', alliance: 'None' },
  { code: 'B6', name: 'JetBlue Airways', country: 'US', alliance: 'None' },
  { code: 'AS', name: 'Alaska Airlines', country: 'US', alliance: 'oneworld' },
  { code: 'NK', name: 'Spirit Airlines', country: 'US', alliance: 'None' },
  { code: 'BA', name: 'British Airways', country: 'GB', alliance: 'oneworld' },
  { code: 'LH', name: 'Lufthansa', country: 'DE', alliance: 'Star Alliance' },
  { code: 'AF', name: 'Air France', country: 'FR', alliance: 'SkyTeam' },
  { code: 'EK', name: 'Emirates', country: 'AE', alliance: 'None' },
  { code: 'QR', name: 'Qatar Airways', country: 'QA', alliance: 'oneworld' },
];

// ─── Airports ───
export const airports = [
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta', city: 'Atlanta', country: 'US', lat: 33.64, lon: -84.43, slotControlled: false },
  { code: 'ORD', name: "O'Hare International", city: 'Chicago', country: 'US', lat: 41.97, lon: -87.91, slotControlled: true },
  { code: 'DFW', name: 'Dallas/Fort Worth', city: 'Dallas', country: 'US', lat: 32.90, lon: -97.04, slotControlled: false },
  { code: 'DEN', name: 'Denver International', city: 'Denver', country: 'US', lat: 39.86, lon: -104.67, slotControlled: false },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'US', lat: 33.94, lon: -118.41, slotControlled: false },
  { code: 'JFK', name: 'John F. Kennedy', city: 'New York', country: 'US', lat: 40.64, lon: -73.78, slotControlled: true },
  { code: 'LGA', name: 'LaGuardia', city: 'New York', country: 'US', lat: 40.77, lon: -73.87, slotControlled: true },
  { code: 'DCA', name: 'Reagan National', city: 'Washington DC', country: 'US', lat: 38.85, lon: -77.04, slotControlled: true },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'US', lat: 37.62, lon: -122.38, slotControlled: false },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'US', lat: 25.79, lon: -80.29, slotControlled: false },
  { code: 'LHR', name: 'London Heathrow', city: 'London', country: 'GB', lat: 51.47, lon: -0.46, slotControlled: true },
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'FR', lat: 49.01, lon: 2.55, slotControlled: true },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'DE', lat: 50.03, lon: 8.57, slotControlled: true },
  { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'JP', lat: 35.77, lon: 140.39, slotControlled: true },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'AE', lat: 25.25, lon: 55.36, slotControlled: false },
];

// ─── Aircraft types / Fleet ───
export const aircraftTypes = [
  { type: 'B737-800', manufacturer: 'Boeing', seats: 162, range: 2935, category: 'Narrow-body' },
  { type: 'B737 MAX 8', manufacturer: 'Boeing', seats: 178, range: 3550, category: 'Narrow-body' },
  { type: 'B787-9', manufacturer: 'Boeing', seats: 296, range: 7530, category: 'Wide-body' },
  { type: 'B777-300ER', manufacturer: 'Boeing', seats: 396, range: 7370, category: 'Wide-body' },
  { type: 'A320neo', manufacturer: 'Airbus', seats: 165, range: 3400, category: 'Narrow-body' },
  { type: 'A321neo', manufacturer: 'Airbus', seats: 206, range: 4000, category: 'Narrow-body' },
  { type: 'A330-300', manufacturer: 'Airbus', seats: 300, range: 6350, category: 'Wide-body' },
  { type: 'A350-900', manufacturer: 'Airbus', seats: 325, range: 8100, category: 'Wide-body' },
  { type: 'E175', manufacturer: 'Embraer', seats: 76, range: 2200, category: 'Regional' },
  { type: 'CRJ-900', manufacturer: 'Bombardier', seats: 90, range: 1550, category: 'Regional' },
];

export const fleetData = [
  { airline: 'AA', type: 'B737-800', count: 304, avgAge: 12.3, cabinConfig: '16F/150Y' },
  { airline: 'AA', type: 'A321neo', count: 129, avgAge: 2.1, cabinConfig: '20F/186Y' },
  { airline: 'AA', type: 'B787-9', count: 42, avgAge: 5.4, cabinConfig: '30J/21P/215Y' },
  { airline: 'AA', type: 'B777-300ER', count: 20, avgAge: 9.8, cabinConfig: '52J/24P/310Y' },
  { airline: 'DL', type: 'B737-800', count: 77, avgAge: 14.1, cabinConfig: '16F/144Y' },
  { airline: 'DL', type: 'A321neo', count: 155, avgAge: 1.8, cabinConfig: '20F/186Y' },
  { airline: 'DL', type: 'A330-300', count: 31, avgAge: 11.2, cabinConfig: '34J/32P/213Y' },
  { airline: 'DL', type: 'A350-900', count: 39, avgAge: 3.6, cabinConfig: '32J/48P/226Y' },
  { airline: 'UA', type: 'B737 MAX 8', count: 188, avgAge: 1.5, cabinConfig: '16F/162Y' },
  { airline: 'UA', type: 'B787-9', count: 38, avgAge: 6.2, cabinConfig: '48J/21P/204Y' },
  { airline: 'UA', type: 'B777-300ER', count: 22, avgAge: 8.9, cabinConfig: '60J/102P/212Y' },
  { airline: 'WN', type: 'B737-800', count: 207, avgAge: 13.5, cabinConfig: '175Y' },
  { airline: 'WN', type: 'B737 MAX 8', count: 340, avgAge: 2.4, cabinConfig: '175Y' },
  { airline: 'B6', type: 'A320neo', count: 130, avgAge: 3.2, cabinConfig: '12EMS/150Y' },
  { airline: 'B6', type: 'A321neo', count: 76, avgAge: 1.9, cabinConfig: '16M/144Y' },
  { airline: 'BA', type: 'B777-300ER', count: 12, avgAge: 10.5, cabinConfig: '14F/48J/40P/185Y' },
  { airline: 'BA', type: 'A350-900', count: 18, avgAge: 2.8, cabinConfig: '56J/56P/219Y' },
  { airline: 'LH', type: 'A320neo', count: 64, avgAge: 2.9, cabinConfig: '12J/138Y' },
  { airline: 'LH', type: 'A350-900', count: 21, avgAge: 4.1, cabinConfig: '48J/21P/224Y' },
  { airline: 'EK', type: 'B777-300ER', count: 126, avgAge: 9.4, cabinConfig: '8F/42J/304Y' },
  { airline: 'EK', type: 'A350-900', count: 50, avgAge: 0.8, cabinConfig: '32J/303Y' },
];

// ─── Monthly traffic & fare data (2023-2025) ───
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const years = [2023, 2024, 2025];

function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

export const monthlyTraffic = [];
years.forEach((year) => {
  months.forEach((month, mi) => {
    const rand = seededRandom(year * 100 + mi);
    const seasonal = 1 + 0.2 * Math.sin((mi - 2) * Math.PI / 6);
    const yearGrowth = 1 + (year - 2023) * 0.05;
    const basePax = 75_000_000;
    monthlyTraffic.push({
      period: `${month} ${year}`,
      month,
      year,
      totalPax: Math.round(basePax * seasonal * yearGrowth * (0.95 + rand() * 0.1)),
      domesticPax: Math.round(basePax * 0.62 * seasonal * yearGrowth * (0.95 + rand() * 0.1)),
      internationalPax: Math.round(basePax * 0.38 * seasonal * yearGrowth * (0.95 + rand() * 0.1)),
      avgFare: Math.round(285 * seasonal * (0.9 + rand() * 0.2)),
      avgDomFare: Math.round(220 * seasonal * (0.9 + rand() * 0.2)),
      avgIntlFare: Math.round(485 * seasonal * (0.85 + rand() * 0.3)),
      loadFactor: Math.round((78 + 12 * Math.sin((mi - 1) * Math.PI / 6) + rand() * 4) * 10) / 10,
      onTimePerf: Math.round((76 + rand() * 14) * 10) / 10,
      flights: Math.round(850_000 * seasonal * yearGrowth * (0.97 + rand() * 0.06)),
    });
  });
});

// ─── OD Market Data (Top 30 city pairs) ───
export const odMarkets = [
  { origin: 'ATL', dest: 'LAX', pax: 3_120_000, avgFare: 245, carriers: ['DL','AA','WN','NK'], marketShare: { DL: 42, AA: 22, WN: 25, NK: 11 }, growth: 4.2 },
  { origin: 'JFK', dest: 'LAX', pax: 4_580_000, avgFare: 312, carriers: ['AA','DL','B6','UA'], marketShare: { AA: 30, DL: 28, B6: 24, UA: 18 }, growth: 3.8 },
  { origin: 'ORD', dest: 'LAX', pax: 2_840_000, avgFare: 228, carriers: ['UA','AA','WN'], marketShare: { UA: 40, AA: 35, WN: 25 }, growth: 2.1 },
  { origin: 'JFK', dest: 'SFO', pax: 3_200_000, avgFare: 335, carriers: ['UA','DL','B6','AA'], marketShare: { UA: 32, DL: 26, B6: 22, AA: 20 }, growth: 5.1 },
  { origin: 'JFK', dest: 'LHR', pax: 4_100_000, avgFare: 892, carriers: ['BA','AA','DL','UA'], marketShare: { BA: 32, AA: 28, DL: 22, UA: 18 }, growth: 6.4 },
  { origin: 'LAX', dest: 'LHR', pax: 1_560_000, avgFare: 945, carriers: ['BA','AA','UA'], marketShare: { BA: 38, AA: 32, UA: 30 }, growth: 7.2 },
  { origin: 'MIA', dest: 'LHR', pax: 820_000, avgFare: 876, carriers: ['BA','AA'], marketShare: { BA: 52, AA: 48 }, growth: 5.8 },
  { origin: 'DFW', dest: 'LAX', pax: 2_100_000, avgFare: 198, carriers: ['AA','WN','NK'], marketShare: { AA: 55, WN: 30, NK: 15 }, growth: 1.9 },
  { origin: 'ATL', dest: 'ORD', pax: 2_650_000, avgFare: 189, carriers: ['DL','UA','AA','WN'], marketShare: { DL: 38, UA: 25, AA: 22, WN: 15 }, growth: 2.5 },
  { origin: 'JFK', dest: 'CDG', pax: 2_300_000, avgFare: 780, carriers: ['AF','DL','AA'], marketShare: { AF: 40, DL: 35, AA: 25 }, growth: 4.9 },
  { origin: 'SFO', dest: 'NRT', pax: 1_100_000, avgFare: 1020, carriers: ['UA','AA'], marketShare: { UA: 58, AA: 42 }, growth: 8.3 },
  { origin: 'LAX', dest: 'DXB', pax: 620_000, avgFare: 1150, carriers: ['EK','UA'], marketShare: { EK: 65, UA: 35 }, growth: 12.1 },
  { origin: 'DEN', dest: 'LAX', pax: 2_440_000, avgFare: 175, carriers: ['UA','WN','NK'], marketShare: { UA: 42, WN: 38, NK: 20 }, growth: 3.6 },
  { origin: 'ORD', dest: 'LHR', pax: 1_340_000, avgFare: 910, carriers: ['UA','BA','AA'], marketShare: { UA: 42, BA: 33, AA: 25 }, growth: 5.5 },
  { origin: 'ATL', dest: 'MIA', pax: 2_200_000, avgFare: 168, carriers: ['DL','AA','NK'], marketShare: { DL: 45, AA: 30, NK: 25 }, growth: 1.4 },
  { origin: 'DCA', dest: 'ORD', pax: 1_560_000, avgFare: 215, carriers: ['UA','AA'], marketShare: { UA: 52, AA: 48 }, growth: 2.8 },
  { origin: 'LGA', dest: 'ORD', pax: 2_010_000, avgFare: 232, carriers: ['UA','AA','DL'], marketShare: { UA: 38, AA: 35, DL: 27 }, growth: 1.6 },
  { origin: 'JFK', dest: 'FRA', pax: 1_200_000, avgFare: 820, carriers: ['LH','UA','DL'], marketShare: { LH: 42, UA: 32, DL: 26 }, growth: 4.1 },
  { origin: 'SFO', dest: 'LHR', pax: 980_000, avgFare: 930, carriers: ['BA','UA'], marketShare: { BA: 48, UA: 52 }, growth: 6.8 },
  { origin: 'MIA', dest: 'JFK', pax: 2_800_000, avgFare: 195, carriers: ['AA','DL','B6'], marketShare: { AA: 40, DL: 30, B6: 30 }, growth: 3.2 },
];

// ─── Schedule data (sample flights) ───
export const scheduleData = (() => {
  const flights = [];
  const routes = [
    { origin: 'JFK', dest: 'LAX', airline: 'AA', flight: 'AA1', aircraft: 'A321neo', dep: '06:00', arr: '09:15', freq: 'Daily' },
    { origin: 'JFK', dest: 'LAX', airline: 'DL', flight: 'DL401', aircraft: 'B737-800', dep: '07:30', arr: '10:45', freq: 'Daily' },
    { origin: 'JFK', dest: 'LAX', airline: 'B6', flight: 'B6523', aircraft: 'A320neo', dep: '08:00', arr: '11:20', freq: 'Daily' },
    { origin: 'JFK', dest: 'LAX', airline: 'UA', flight: 'UA35', aircraft: 'B737 MAX 8', dep: '09:00', arr: '12:10', freq: 'Daily' },
    { origin: 'JFK', dest: 'LHR', airline: 'BA', flight: 'BA178', aircraft: 'B777-300ER', dep: '19:00', arr: '07:15+1', freq: 'Daily' },
    { origin: 'JFK', dest: 'LHR', airline: 'AA', flight: 'AA100', aircraft: 'B777-300ER', dep: '20:00', arr: '08:20+1', freq: 'Daily' },
    { origin: 'JFK', dest: 'LHR', airline: 'DL', flight: 'DL1', aircraft: 'A330-300', dep: '21:30', arr: '09:45+1', freq: 'Daily' },
    { origin: 'ATL', dest: 'LAX', airline: 'DL', flight: 'DL185', aircraft: 'B787-9', dep: '06:30', arr: '08:45', freq: 'Daily' },
    { origin: 'ATL', dest: 'LAX', airline: 'WN', flight: 'WN1223', aircraft: 'B737-800', dep: '07:00', arr: '09:30', freq: 'Daily' },
    { origin: 'ORD', dest: 'LAX', airline: 'UA', flight: 'UA923', aircraft: 'B737 MAX 8', dep: '08:15', arr: '10:30', freq: 'Daily' },
    { origin: 'ORD', dest: 'LAX', airline: 'AA', flight: 'AA337', aircraft: 'A321neo', dep: '09:45', arr: '12:00', freq: 'Daily' },
    { origin: 'ORD', dest: 'LHR', airline: 'UA', flight: 'UA958', aircraft: 'B787-9', dep: '17:30', arr: '07:00+1', freq: 'Daily' },
    { origin: 'DFW', dest: 'LAX', airline: 'AA', flight: 'AA2451', aircraft: 'A321neo', dep: '06:00', arr: '07:15', freq: 'Daily' },
    { origin: 'DFW', dest: 'LAX', airline: 'WN', flight: 'WN412', aircraft: 'B737 MAX 8', dep: '10:00', arr: '11:10', freq: 'Daily' },
    { origin: 'SFO', dest: 'NRT', airline: 'UA', flight: 'UA837', aircraft: 'B787-9', dep: '11:30', arr: '15:00+1', freq: 'Daily' },
    { origin: 'LAX', dest: 'DXB', airline: 'EK', flight: 'EK216', aircraft: 'A350-900', dep: '16:20', arr: '19:10+1', freq: 'Daily' },
    { origin: 'JFK', dest: 'CDG', airline: 'AF', flight: 'AF9', aircraft: 'A350-900', dep: '18:00', arr: '07:30+1', freq: 'Daily' },
    { origin: 'JFK', dest: 'FRA', airline: 'LH', flight: 'LH401', aircraft: 'A350-900', dep: '16:45', arr: '06:45+1', freq: 'Daily' },
    { origin: 'DCA', dest: 'ORD', airline: 'UA', flight: 'UA636', aircraft: 'A320neo', dep: '07:00', arr: '08:15', freq: 'Daily' },
    { origin: 'DCA', dest: 'ORD', airline: 'AA', flight: 'AA4721', aircraft: 'E175', dep: '09:00', arr: '10:20', freq: 'Weekdays' },
    { origin: 'LGA', dest: 'ORD', airline: 'UA', flight: 'UA512', aircraft: 'B737 MAX 8', dep: '07:30', arr: '09:00', freq: 'Daily' },
    { origin: 'LGA', dest: 'ORD', airline: 'AA', flight: 'AA332', aircraft: 'A321neo', dep: '10:00', arr: '11:25', freq: 'Daily' },
    { origin: 'MIA', dest: 'JFK', airline: 'AA', flight: 'AA1585', aircraft: 'A321neo', dep: '06:30', arr: '09:45', freq: 'Daily' },
    { origin: 'MIA', dest: 'JFK', airline: 'DL', flight: 'DL872', aircraft: 'B737-800', dep: '08:00', arr: '11:10', freq: 'Daily' },
    { origin: 'ATL', dest: 'MIA', airline: 'DL', flight: 'DL2143', aircraft: 'B737-800', dep: '07:15', arr: '09:20', freq: 'Daily' },
    { origin: 'DEN', dest: 'LAX', airline: 'UA', flight: 'UA1245', aircraft: 'A320neo', dep: '08:30', arr: '09:45', freq: 'Daily' },
    { origin: 'DEN', dest: 'LAX', airline: 'WN', flight: 'WN2067', aircraft: 'B737 MAX 8', dep: '11:00', arr: '12:10', freq: 'Daily' },
  ];
  // Generate 90 days of schedules
  for (let d = 0; d < 90; d++) {
    const date = new Date(2025, 0, 1 + d);
    const dayOfWeek = date.getDay();
    const dateStr = date.toISOString().split('T')[0];
    routes.forEach((r) => {
      if (r.freq === 'Weekdays' && (dayOfWeek === 0 || dayOfWeek === 6)) return;
      flights.push({ ...r, date: dateStr, status: Math.random() > 0.05 ? 'On Time' : 'Delayed' });
    });
  }
  return flights;
})();

// ─── Advanced Booking Data ───
export const bookingData = (() => {
  const data = [];
  const daysOut = [0, 7, 14, 21, 30, 45, 60, 90, 120, 180];
  const markets = ['JFK-LAX', 'JFK-LHR', 'ATL-LAX', 'ORD-LAX', 'SFO-NRT', 'LAX-DXB', 'DCA-ORD'];
  markets.forEach((market) => {
    daysOut.forEach((day) => {
      const rand = seededRandom(market.charCodeAt(0) * 1000 + day);
      const isIntl = market.includes('LHR') || market.includes('NRT') || market.includes('DXB') || market.includes('CDG');
      const baseFare = isIntl ? 750 : 220;
      const multiplier = day <= 7 ? 1.8 : day <= 21 ? 1.3 : day <= 60 ? 1.0 : 0.85;
      data.push({
        market,
        daysBeforeDeparture: day,
        avgFare: Math.round(baseFare * multiplier * (0.9 + rand() * 0.2)),
        bookingPct: Math.round((day <= 7 ? 95 : day <= 14 ? 88 : day <= 30 ? 72 : day <= 60 ? 50 : day <= 90 ? 30 : day <= 120 ? 15 : 5) * (0.9 + rand() * 0.2)),
        class: isIntl ? 'J/Y' : 'F/Y',
      });
    });
  });
  return data;
})();

// ─── Merger / Regulatory scenarios ───
export const mergerScenarios = [
  {
    id: 1,
    title: 'JetBlue - Spirit Merger (Hypothetical)',
    status: 'Under Review',
    dateProposed: '2024-06-15',
    carriers: ['B6', 'NK'],
    affectedMarkets: 28,
    overlapRoutes: 45,
    hhi: { before: 2450, after: 3120 },
    summary: 'Merger would combine two major LCCs, reducing competition on 45 overlapping routes primarily in leisure markets.',
    impactedAirports: ['JFK', 'LAX', 'MIA', 'ATL', 'DFW'],
    fareImpact: '+8-15% on overlap routes',
    capacityChange: '-12% combined on overlap markets',
  },
  {
    id: 2,
    title: 'Alaska Airlines - Hawaiian Holdings',
    status: 'Approved with Conditions',
    dateProposed: '2023-12-03',
    carriers: ['AS'],
    affectedMarkets: 12,
    overlapRoutes: 8,
    hhi: { before: 1850, after: 2100 },
    summary: 'Acquisition creates stronger West Coast carrier with expanded Pacific network.',
    impactedAirports: ['SFO', 'LAX', 'SEA'],
    fareImpact: '+3-5% on overlap routes',
    capacityChange: '+5% Pacific network',
  },
  {
    id: 3,
    title: 'Hypothetical: Delta - LATAM Deepened JV',
    status: 'Proposed',
    dateProposed: '2025-02-01',
    carriers: ['DL'],
    affectedMarkets: 35,
    overlapRoutes: 15,
    hhi: { before: 2100, after: 2380 },
    summary: 'Enhanced joint venture covering all US-South America routes with antitrust immunity.',
    impactedAirports: ['ATL', 'JFK', 'MIA'],
    fareImpact: '-2-5% from network efficiencies',
    capacityChange: '+8% on JV routes',
  },
];

// ─── Slot allocation data ───
export const slotAllocations = [
  { airport: 'JFK', airline: 'AA', slots: 112, period: 'Summer 2025', type: 'Historic' },
  { airport: 'JFK', airline: 'DL', slots: 145, period: 'Summer 2025', type: 'Historic' },
  { airport: 'JFK', airline: 'B6', slots: 98, period: 'Summer 2025', type: 'Historic' },
  { airport: 'JFK', airline: 'UA', slots: 72, period: 'Summer 2025', type: 'Historic' },
  { airport: 'JFK', airline: 'BA', slots: 28, period: 'Summer 2025', type: 'Historic' },
  { airport: 'LGA', airline: 'AA', slots: 105, period: 'Summer 2025', type: 'Historic' },
  { airport: 'LGA', airline: 'DL', slots: 130, period: 'Summer 2025', type: 'Historic' },
  { airport: 'LGA', airline: 'UA', slots: 85, period: 'Summer 2025', type: 'Historic' },
  { airport: 'DCA', airline: 'AA', slots: 160, period: 'Summer 2025', type: 'Historic' },
  { airport: 'DCA', airline: 'UA', slots: 82, period: 'Summer 2025', type: 'Historic' },
  { airport: 'DCA', airline: 'DL', slots: 95, period: 'Summer 2025', type: 'Historic' },
  { airport: 'ORD', airline: 'UA', slots: 310, period: 'Summer 2025', type: 'Historic' },
  { airport: 'ORD', airline: 'AA', slots: 290, period: 'Summer 2025', type: 'Historic' },
];

// ─── KPI summary ───
export const kpiSummary = {
  totalPassengers: '912.4M',
  totalPassengersChange: '+4.8%',
  avgFare: '$298',
  avgFareChange: '+2.1%',
  loadFactor: '84.2%',
  loadFactorChange: '+1.3pp',
  onTimePerf: '79.6%',
  onTimePerfChange: '-0.8pp',
  totalFlights: '10.4M',
  totalFlightsChange: '+3.2%',
  activeCarriers: 92,
  trackedAirports: 4200,
  dataPointsProcessed: '2.8B',
};

// ─── Data Pipeline / ETL Jobs ───
export const dataPipelines = [
  {
    id: 'pipe-001', name: 'T-100 Domestic Traffic', source: 'BTS / DOT', frequency: 'Monthly',
    lastRun: '2025-03-01 02:15:00', nextRun: '2025-04-01 02:00:00', status: 'Completed',
    recordsProcessed: 524_310, recordsFailed: 12, duration: '4m 32s',
    stages: [
      { name: 'Download', status: 'success', duration: '45s' },
      { name: 'Validate Schema', status: 'success', duration: '12s' },
      { name: 'Transform', status: 'success', duration: '2m 18s' },
      { name: 'Load to DB', status: 'success', duration: '1m 05s' },
      { name: 'QA Check', status: 'success', duration: '12s' },
    ],
    description: 'Monthly T-100 domestic segment traffic data from Bureau of Transportation Statistics. Includes passenger counts, departures, seats, freight tons, and mail tons by carrier, origin, and destination.',
  },
  {
    id: 'pipe-002', name: 'T-100 International Traffic', source: 'BTS / DOT', frequency: 'Monthly',
    lastRun: '2025-03-01 02:45:00', nextRun: '2025-04-01 02:30:00', status: 'Completed',
    recordsProcessed: 312_847, recordsFailed: 5, duration: '3m 10s',
    stages: [
      { name: 'Download', status: 'success', duration: '38s' },
      { name: 'Validate Schema', status: 'success', duration: '8s' },
      { name: 'Transform', status: 'success', duration: '1m 42s' },
      { name: 'Load to DB', status: 'success', duration: '35s' },
      { name: 'QA Check', status: 'success', duration: '7s' },
    ],
    description: 'Monthly T-100 international segment traffic data. Covers all US carrier international operations and foreign carrier operations to/from the US.',
  },
  {
    id: 'pipe-003', name: 'DB1B Fare Survey', source: 'BTS / DOT', frequency: 'Quarterly',
    lastRun: '2025-02-15 03:00:00', nextRun: '2025-05-15 03:00:00', status: 'Completed',
    recordsProcessed: 9_845_221, recordsFailed: 342, duration: '18m 45s',
    stages: [
      { name: 'Download', status: 'success', duration: '3m 12s' },
      { name: 'Validate Schema', status: 'success', duration: '1m 05s' },
      { name: 'Transform', status: 'success', duration: '8m 20s' },
      { name: 'Load to DB', status: 'success', duration: '5m 02s' },
      { name: 'QA Check', status: 'success', duration: '1m 06s' },
    ],
    description: '10% sample of all domestic airline tickets. Includes itinerary fare, number of passengers, distance, origin/destination, and operating/ticketing carriers. Core dataset for fare analysis.',
  },
  {
    id: 'pipe-004', name: 'AOTP On-Time Performance', source: 'BTS / DOT', frequency: 'Monthly',
    lastRun: '2025-03-05 01:00:00', nextRun: '2025-04-05 01:00:00', status: 'Running',
    recordsProcessed: 412_000, recordsFailed: 0, duration: '—',
    stages: [
      { name: 'Download', status: 'success', duration: '52s' },
      { name: 'Validate Schema', status: 'success', duration: '10s' },
      { name: 'Transform', status: 'running', duration: '—' },
      { name: 'Load to DB', status: 'pending', duration: '—' },
      { name: 'QA Check', status: 'pending', duration: '—' },
    ],
    description: 'Airline on-time performance data including departure/arrival delays, cancellations, diversions, and causes of delay by carrier, flight number, origin, and destination.',
  },
  {
    id: 'pipe-005', name: 'OAG Schedule Data', source: 'OAG / Cirium', frequency: 'Weekly',
    lastRun: '2025-03-10 05:00:00', nextRun: '2025-03-17 05:00:00', status: 'Failed',
    recordsProcessed: 0, recordsFailed: 0, duration: '0m 22s',
    stages: [
      { name: 'Download', status: 'failed', duration: '22s' },
      { name: 'Validate Schema', status: 'skipped', duration: '—' },
      { name: 'Transform', status: 'skipped', duration: '—' },
      { name: 'Load to DB', status: 'skipped', duration: '—' },
      { name: 'QA Check', status: 'skipped', duration: '—' },
    ],
    description: 'Global airline schedule data from OAG/Cirium. Includes planned frequencies, aircraft types, codeshares, and seasonal schedules. Used for schedule analysis and route planning.',
  },
];

export const dataQualityMetrics = [
  { dataset: 'T-100 Domestic', completeness: 99.8, accuracy: 99.5, freshness: 'Current', lastCheck: '2025-03-01', issues: 0 },
  { dataset: 'T-100 International', completeness: 99.6, accuracy: 99.2, freshness: 'Current', lastCheck: '2025-03-01', issues: 1 },
  { dataset: 'DB1B Fare Survey', completeness: 98.9, accuracy: 98.7, freshness: 'Current', lastCheck: '2025-02-15', issues: 3 },
  { dataset: 'AOTP On-Time', completeness: 99.4, accuracy: 99.1, freshness: 'Processing', lastCheck: '2025-03-05', issues: 0 },
  { dataset: 'OAG Schedules', completeness: 97.2, accuracy: 98.8, freshness: 'Stale (7d)', lastCheck: '2025-03-03', issues: 2 },
  { dataset: 'Fleet Registry', completeness: 99.9, accuracy: 99.7, freshness: 'Current', lastCheck: '2025-03-10', issues: 0 },
];

// ─── User Management Data ───
export const userAccounts = [
  { id: 1, name: 'Robin Golden', email: 'admin@oaa.dot.gov', role: 'admin', title: 'System Administrator', status: 'Active', lastLogin: '2025-03-18 09:15:00', loginCount: 342, department: 'IT Operations' },
  { id: 2, name: 'Sarah Mitchell', email: 'senior.analyst@oaa.dot.gov', role: 'senior_analyst', title: 'Senior Aviation Analyst', status: 'Active', lastLogin: '2025-03-18 08:30:00', loginCount: 567, department: 'Aviation Analysis' },
  { id: 3, name: 'James Carter', email: 'analyst@oaa.dot.gov', role: 'analyst', title: 'Aviation Analyst', status: 'Active', lastLogin: '2025-03-17 14:22:00', loginCount: 189, department: 'Aviation Analysis' },
  { id: 4, name: 'Maria Lopez', email: 'maria.lopez@oaa.dot.gov', role: 'senior_analyst', title: 'Lead Market Analyst', status: 'Active', lastLogin: '2025-03-18 07:45:00', loginCount: 423, department: 'Market Analysis' },
  { id: 5, name: 'David Chen', email: 'david.chen@oaa.dot.gov', role: 'analyst', title: 'Data Analyst', status: 'Active', lastLogin: '2025-03-15 16:10:00', loginCount: 98, department: 'Data Services' },
  { id: 6, name: 'Emily Watson', email: 'emily.watson@oaa.dot.gov', role: 'analyst', title: 'Regulatory Analyst', status: 'Inactive', lastLogin: '2025-01-20 11:30:00', loginCount: 45, department: 'Regulatory Affairs' },
  { id: 7, name: 'Robert Kim', email: 'robert.kim@oaa.dot.gov', role: 'senior_analyst', title: 'Senior Economist', status: 'Active', lastLogin: '2025-03-16 09:00:00', loginCount: 312, department: 'Economics Division' },
  { id: 8, name: 'Lisa Park', email: 'lisa.park@oaa.dot.gov', role: 'analyst', title: 'Junior Analyst', status: 'Locked', lastLogin: '2025-02-28 13:45:00', loginCount: 23, department: 'Aviation Analysis' },
];

export const auditLog = [
  { id: 1, user: 'Robin Golden', action: 'User Created', target: 'lisa.park@oaa.dot.gov', timestamp: '2025-03-15 10:30:00', ip: '10.0.1.45', details: 'Created new analyst account' },
  { id: 2, user: 'Sarah Mitchell', action: 'Report Exported', target: 'Q4 2024 Traffic Summary', timestamp: '2025-03-14 14:22:00', ip: '10.0.1.102', details: 'Exported as PDF' },
  { id: 3, user: 'Robin Golden', action: 'Role Changed', target: 'david.chen@oaa.dot.gov', timestamp: '2025-03-13 09:15:00', ip: '10.0.1.45', details: 'Changed from viewer to analyst' },
  { id: 4, user: 'James Carter', action: 'Data Queried', target: 'DB1B Fare Database', timestamp: '2025-03-12 11:45:00', ip: '10.0.1.78', details: 'NLP query: "Average fares JFK-LAX 2024"' },
  { id: 5, user: 'System', action: 'Pipeline Failed', target: 'OAG Schedule Data', timestamp: '2025-03-10 05:00:22', ip: 'system', details: 'Download timeout - API rate limit exceeded' },
  { id: 6, user: 'Maria Lopez', action: 'Login', target: 'Session Started', timestamp: '2025-03-18 07:45:00', ip: '10.0.1.115', details: 'MFA verified via authenticator app' },
  { id: 7, user: 'Robin Golden', action: 'Account Locked', target: 'lisa.park@oaa.dot.gov', timestamp: '2025-03-01 08:00:00', ip: '10.0.1.45', details: '5 failed login attempts' },
  { id: 8, user: 'Sarah Mitchell', action: 'Merger Analysis', target: 'JetBlue-Spirit Scenario', timestamp: '2025-03-08 15:30:00', ip: '10.0.1.102', details: 'Ran HHI simulation with 3 divestiture options' },
  { id: 9, user: 'System', action: 'Pipeline Completed', target: 'T-100 Domestic Traffic', timestamp: '2025-03-01 02:19:32', ip: 'system', details: '524,310 records processed, 12 failed QA' },
  { id: 10, user: 'David Chen', action: 'Data Exported', target: 'Fleet Registry', timestamp: '2025-03-09 10:12:00', ip: '10.0.1.88', details: 'Exported full fleet data as CSV (2,431 rows)' },
];

// ─── System Settings / Infrastructure Data ───
export const systemServices = [
  { name: 'API Gateway', status: 'Healthy', uptime: '99.97%', lastRestart: '2025-02-15', responseTime: '42ms', version: 'v3.2.1', cpu: 12, memory: 34 },
  { name: 'PostgreSQL Primary', status: 'Healthy', uptime: '99.99%', lastRestart: '2025-01-20', responseTime: '8ms', version: '16.2', cpu: 28, memory: 62 },
  { name: 'PostgreSQL Replica', status: 'Healthy', uptime: '99.98%', lastRestart: '2025-01-20', responseTime: '12ms', version: '16.2', cpu: 15, memory: 58 },
  { name: 'Redis Cache', status: 'Healthy', uptime: '99.99%', lastRestart: '2025-03-01', responseTime: '1ms', version: '7.2.4', cpu: 5, memory: 42 },
  { name: 'ML Inference Server', status: 'Warning', uptime: '98.50%', lastRestart: '2025-03-10', responseTime: '380ms', version: 'v1.4.0', cpu: 78, memory: 89 },
  { name: 'Background Workers', status: 'Healthy', uptime: '99.90%', lastRestart: '2025-03-05', responseTime: '—', version: 'v3.2.1', cpu: 22, memory: 45 },
];

export const complianceChecks = [
  { category: 'FedRAMP', check: 'Access Control (AC)', status: 'Compliant', lastAudit: '2025-02-01', nextAudit: '2025-08-01', notes: 'Role-based access control implemented' },
  { category: 'FedRAMP', check: 'Audit & Accountability (AU)', status: 'Compliant', lastAudit: '2025-02-01', nextAudit: '2025-08-01', notes: 'Full audit trail with tamper detection' },
  { category: 'FedRAMP', check: 'System & Comms Protection (SC)', status: 'Compliant', lastAudit: '2025-02-01', nextAudit: '2025-08-01', notes: 'TLS 1.3, AES-256 encryption at rest' },
  { category: 'FedRAMP', check: 'Incident Response (IR)', status: 'Partial', lastAudit: '2025-02-01', nextAudit: '2025-05-01', notes: 'Runbook needs update for new ML services' },
  { category: 'Section 508', check: 'WCAG 2.1 Level AA', status: 'In Progress', lastAudit: '2025-01-15', nextAudit: '2025-04-15', notes: 'Chart accessibility pending screen reader testing' },
  { category: 'Section 508', check: 'Keyboard Navigation', status: 'Compliant', lastAudit: '2025-01-15', nextAudit: '2025-04-15', notes: 'All interactive elements keyboard accessible' },
  { category: 'FISMA', check: 'Risk Assessment (RA)', status: 'Compliant', lastAudit: '2025-03-01', nextAudit: '2025-09-01', notes: 'Annual risk assessment completed' },
  { category: 'FISMA', check: 'Contingency Planning (CP)', status: 'Compliant', lastAudit: '2025-03-01', nextAudit: '2025-09-01', notes: 'DR plan tested quarterly' },
];

export const backupHistory = [
  { id: 1, type: 'Full Database', size: '248 GB', started: '2025-03-17 01:00:00', completed: '2025-03-17 02:45:00', status: 'Completed', retention: '90 days' },
  { id: 2, type: 'Incremental', size: '12 GB', started: '2025-03-18 01:00:00', completed: '2025-03-18 01:18:00', status: 'Completed', retention: '30 days' },
  { id: 3, type: 'Config & Secrets', size: '45 MB', started: '2025-03-18 00:30:00', completed: '2025-03-18 00:31:00', status: 'Completed', retention: '365 days' },
  { id: 4, type: 'Full Database', size: '245 GB', started: '2025-03-10 01:00:00', completed: '2025-03-10 02:40:00', status: 'Completed', retention: '90 days' },
  { id: 5, type: 'ML Model Artifacts', size: '8.2 GB', started: '2025-03-15 03:00:00', completed: '2025-03-15 03:12:00', status: 'Completed', retention: '180 days' },
];

// ─── Route Map Data ───
export const routeMapData = airports.map((apt) => ({
  ...apt,
  totalDepartures: Math.round(200 + Math.random() * 800),
  totalPax: Math.round(500_000 + Math.random() * 8_000_000),
  carriers: Math.round(3 + Math.random() * 12),
  destinations: Math.round(10 + Math.random() * 150),
}));

export const routeConnections = odMarkets.map((od) => {
  const orig = airports.find(a => a.code === od.origin);
  const dest = airports.find(a => a.code === od.dest);
  return {
    ...od,
    origLat: orig?.lat, origLon: orig?.lon,
    destLat: dest?.lat, destLon: dest?.lon,
    type: (orig?.country !== 'US' || dest?.country !== 'US') ? 'International' : 'Domestic',
  };
});

// ─── AI Insights ───
export const aiInsights = [
  { id: 1, type: 'Trend', severity: 'info', title: 'Pacific Route Recovery', description: 'Trans-Pacific traffic has recovered to 94% of 2019 levels, with SFO-NRT showing strongest growth at 8.3% YoY.', date: '2025-03-15', category: 'Traffic' },
  { id: 2, type: 'Anomaly', severity: 'warning', title: 'JFK-LHR Fare Spike', description: 'Average fares on JFK-LHR have increased 12% in the last 30 days, deviating from seasonal norms by 2 standard deviations.', date: '2025-03-14', category: 'Fares' },
  { id: 3, type: 'Prediction', severity: 'info', title: 'Summer 2025 Capacity Outlook', description: 'Model predicts 6.2% capacity increase for domestic US summer 2025, driven primarily by B737 MAX 8 deliveries.', date: '2025-03-12', category: 'Capacity' },
  { id: 4, type: 'Alert', severity: 'error', title: 'DCA Slot Utilization Below Threshold', description: 'Two carriers at DCA are below 80% slot utilization threshold for Winter 2024/25. Slots may be subject to reallocation.', date: '2025-03-10', category: 'Regulatory' },
  { id: 5, type: 'Trend', severity: 'info', title: 'ULCC Market Share Decline', description: 'Ultra-low-cost carriers have lost 2.3 market share points over the past 12 months as legacy carriers adopt basic economy fares.', date: '2025-03-08', category: 'Market' },
  { id: 6, type: 'Prediction', severity: 'warning', title: 'Merger Concentration Risk', description: 'If JetBlue-Spirit merger proceeds, HHI on 12 domestic routes would exceed DOJ threshold of 2500.', date: '2025-03-06', category: 'Regulatory' },
  { id: 7, type: 'Anomaly', severity: 'info', title: 'Middle East Demand Surge', description: 'LAX-DXB bookings up 22% vs. last year, driven by increased business travel and new Emirates A350 service.', date: '2025-03-04', category: 'Traffic' },
  { id: 8, type: 'Trend', severity: 'info', title: 'Regional Jet Fleet Aging', description: 'Average age of E175/CRJ-900 fleets now exceeds 12 years. Several carriers evaluating replacement timelines.', date: '2025-03-02', category: 'Fleet' },
];
