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

// ─── Project Management / Roadmap ───
// Based on RFP No. 693JK426R600002 Technical Proposal
export const projectTeam = [
  { id: 'R1', name: 'Technical Architect', type: 'Equity (Unbilled)', rate: 0, skills: ['System Architecture', 'AI Strategy', 'Data Governance', 'Security Architecture', 'Gov Stakeholder Liaison'], allocation: 100,
    responsibilities: 'Overall platform architecture oversight, AI capability integration strategy, data workflow governance, security architecture direction, technical liaison with Government stakeholders. This role is not billed as direct labor.' },
  { id: 'R2', name: 'AI Full-Stack Engineer', type: '1099 FTE', rate: 72, skills: ['React', 'Node.js', 'Python', 'AI/LLM Integration', 'PostgreSQL', 'Cloud Infrastructure', 'Data Pipelines', 'Reporting'], allocation: 100,
    responsibilities: 'Platform sustainment and feature enhancements, AI analytical module implementation, reporting functionality optimization, data integration monitoring, analytical performance tuning, user-driven analytical workflow improvements. Consolidates multiple engineering functions via AI-augmented development.' },
  { id: 'R3', name: 'AI-Enabled Ops Support Engineer', type: '1099 FTE', rate: 43, skills: ['System Monitoring', 'Data QA', 'User Admin', 'Support Triage', 'AI-Assisted Monitoring', 'Training Coordination'], allocation: 100,
    responsibilities: 'System performance monitoring and uptime assurance, data refresh validation and quality verification, user account administration and access control, support request triage and coordination, AI-assisted operational monitoring automation, training logistics coordination.' },
];

export const projectSprints = [
  {
    id: 'S1', name: 'Sprint 1 - Platform Foundation & Cloud Setup', startDate: '2025-04-07', endDate: '2025-04-18',
    phase: 'P0 - Foundation', totalPoints: 34, completedPoints: 0, status: 'Planned',
    goals: 'Stand up secure commercial cloud hosting, database, API scaffold, CI/CD, and base SaaS platform. AI-assisted code generation accelerates all infrastructure tasks.',
    tasks: [
      { id: 'T1.1', title: 'Cloud infrastructure provisioning', points: 5, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'Provision secure commercial cloud environment (AWS/Azure): VPC, compute (ECS Fargate or App Service), managed PostgreSQL, Redis cache, S3/Blob storage, SSL/TLS, and monitoring. AI-assisted Terraform/IaC generation for reproducible deployments.',
        why: 'Secure commercial cloud hosting is the delivery model per RFP. Must meet federal security expectations while maintaining SaaS operational simplicity.',
        dataVolume: 'Initial: ~200GB database, scaling to ~1TB over contract period',
        prereqs: [], risk: 'Low', riskNotes: 'Standard commercial cloud provisioning' },
      { id: 'T1.2', title: 'Database schema & optimized datastore', points: 5, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'Design and deploy optimized analytical datastore for aviation datasets: T-100 traffic, DB1B fares, AOTP on-time, fleet registry, and schedule data. AI-assisted schema generation with indexing strategy for O&D lookups, time-series, and carrier aggregations.',
        why: 'Optimized analytical datastore is a core architectural principle per Technical Proposal. Must support historical and forward-looking market trend evaluation efficiently.',
        dataVolume: 'T-100: ~6M rows/yr, DB1B: ~40M rows/yr, AOTP: ~6M rows/yr. 10yr backfill: ~500M+ rows total.',
        prereqs: ['T1.1'], risk: 'Low', riskNotes: 'Well-understood domain model; AI accelerates schema design' },
      { id: 'T1.3', title: 'API server & CI/CD pipeline', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'AI-generated Express.js/Node.js API server with TypeScript, structured routing, validation, error handling, logging, health checks. GitHub Actions CI/CD: lint → test → build → deploy to staging. AI code review on all PRs.',
        why: 'Scalable analytical compute layer and automated deployment pipeline are foundational to SaaS delivery model and rapid analytical response capability.',
        dataVolume: 'N/A - API layer',
        prereqs: ['T1.1'], risk: 'Low', riskNotes: 'AI-assisted code generation reduces development time by ~60%' },
      { id: 'T1.4', title: 'Security baseline & auth system', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'Implement secure authentication (JWT + role-based access control), encryption in transit (TLS 1.3) and at rest (AES-256), system activity logging, secure cloud hosting configuration. AI-assisted security policy generation.',
        why: 'Security controls consistent with commercial best practices aligned to federal expectations are required per Technical Proposal Section 5.',
        dataVolume: 'N/A',
        prereqs: ['T1.1', 'T1.3'], risk: 'Low', riskNotes: 'Standard security implementation' },
      { id: 'T1.5', title: 'AI-assisted monitoring & alerting setup', points: 5, status: 'Planned', assignee: 'R3', priority: 'High',
        what: 'Deploy AI-assisted operational monitoring tools: automated health checks, performance anomaly detection, proactive issue alerts, uptime dashboards. Reduces manual intervention requirements per Technical Proposal.',
        why: 'AI-assisted operational monitoring automation enables proactive issue detection with lean Ops team.',
        dataVolume: 'N/A',
        prereqs: ['T1.1'], risk: 'Low', riskNotes: '' },
      { id: 'T1.6', title: 'Platform documentation & architecture records', points: 3, status: 'Planned', assignee: 'R1', priority: 'Medium',
        what: 'Architecture decision records (ADRs), API documentation (OpenAPI 3.1), security architecture overview, deployment runbook. AI-assisted documentation generation.',
        why: 'Technical documentation supports Government stakeholder liaison role and operational handoff.',
        dataVolume: 'N/A',
        prereqs: [], risk: 'Low', riskNotes: '' },
    ],
  },
  {
    id: 'S2', name: 'Sprint 2 - Data Ingestion & Airline Market Analytics', startDate: '2025-04-21', endDate: '2025-05-02',
    phase: 'P0 - Data Ingestion', totalPoints: 34, completedPoints: 0, status: 'Planned',
    goals: 'Build AI-automated ETL pipelines for DOT aviation data sources. Populate analytical datastore with T-100, DB1B, and AOTP datasets. Enable global O&D traffic analysis.',
    tasks: [
      { id: 'T2.1', title: 'T-100 traffic data pipeline (domestic + international)', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'AI-generated ETL pipeline: automated download from BTS (transtats.bts.gov), schema validation, data cleaning (standardize carrier/airport codes, handle nulls), transform, bulk load to PostgreSQL. AI handles format variation detection and auto-repair.',
        why: 'T-100 is the primary traffic dataset for global origin-destination traffic analysis — core capability per Technical Proposal Section 2.1.',
        dataVolume: 'Monthly: ~500K domestic + ~300K international rows. 10yr backfill: ~96M rows.',
        prereqs: ['T1.2', 'T1.3'], risk: 'Low', riskNotes: 'AI handles format variations automatically' },
      { id: 'T2.2', title: 'DB1B fare survey pipeline', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'AI-generated quarterly ETL pipeline for DB1B coupon/ticket/market data. Validate fare ranges, link itineraries, compute O&D fares, handle 10% sampling methodology. AI detects fare outliers automatically.',
        why: 'DB1B is the only source of actual fare data — essential for fare trend and service class comparison per Technical Proposal Section 2.1.',
        dataVolume: 'Quarterly: ~10M rows. 10yr backfill: ~400M rows. Largest single dataset.',
        prereqs: ['T1.2', 'T1.3'], risk: 'Medium', riskNotes: 'Complex multi-table structure; AI handles edge cases' },
      { id: 'T2.3', title: 'AOTP on-time performance pipeline', points: 5, status: 'Planned', assignee: 'R2', priority: 'High',
        what: 'Monthly ETL for AOTP data: download, validate delay codes, compute on-time metrics by carrier/airport/route. AI-assisted delay cause classification.',
        why: 'On-time performance supports regulatory case development and market evaluation per Technical Proposal.',
        dataVolume: 'Monthly: ~500K rows. 10yr backfill: ~60M rows.',
        prereqs: ['T1.2', 'T1.3'], risk: 'Low', riskNotes: 'Straightforward pipeline; AI handles delay code ambiguity' },
      { id: 'T2.4', title: 'Historical data backfill (10 years)', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'Backfill T-100, DB1B, and AOTP data from 2015-2024. AI-managed batch processing with automated validation against published BTS totals. Runs overnight with progress monitoring.',
        why: 'Historical and forward-looking market trend evaluation requires 10+ years of data per Technical Proposal Section 1.',
        dataVolume: '~556M total rows across all datasets. Estimated processing: 12-24 hours with AI-optimized batch loading.',
        prereqs: ['T2.1', 'T2.2', 'T2.3'], risk: 'Medium', riskNotes: 'Large volume; AI handles schema variations across historical files' },
      { id: 'T2.5', title: 'Data quality framework & validation', points: 5, status: 'Planned', assignee: 'R3', priority: 'High',
        what: 'AI-powered data quality checks: row count validation, null field detection, referential integrity, statistical distribution anomaly detection, month-over-month variance alerts. Automated QA reports.',
        why: 'Data refresh validation and quality verification is a core Ops Support Engineer responsibility per Technical Proposal Section 4.3.',
        dataVolume: 'Runs on each pipeline execution and data refresh cycle',
        prereqs: ['T2.4'], risk: 'Low', riskNotes: 'AI automates most QA checks' },
    ],
  },
  {
    id: 'S3', name: 'Sprint 3 - Airline Market Analytics & Fleet Intelligence', startDate: '2025-05-05', endDate: '2025-05-16',
    phase: 'P1 - Core Analytics', totalPoints: 34, completedPoints: 0, status: 'Planned',
    goals: 'Build core airline market analytics and fleet intelligence capabilities. Connect frontend to live data APIs. Enable global O&D traffic analysis, fare comparisons, and fleet deployment visibility.',
    tasks: [
      { id: 'T3.1', title: 'Market analytics API endpoints', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'AI-generated REST APIs: traffic summary, O&D market analysis, carrier market share, concentration metrics, fare trends, service class comparison. Paginated, filtered, with aggregation support.',
        why: 'Comprehensive airline market evaluation including global O&D traffic analysis, fare trend comparison, and market share analysis per Technical Proposal Section 2.1.',
        dataVolume: 'Queries across ~500M+ rows with response < 1s via materialized views',
        prereqs: ['T2.4', 'T1.3'], risk: 'Low', riskNotes: 'AI generates optimized query layers rapidly' },
      { id: 'T3.2', title: 'Fleet intelligence API & analytics', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'AI-generated APIs for fleet analytics: aircraft type deployment by carrier/route, capacity distribution analysis, fleet evolution trends, fleet age/composition. Connect existing Fleet Intelligence page to live data.',
        why: 'Enhanced fleet analytics capability per Technical Proposal Section 2.2: aircraft type deployment visibility, capacity distribution analysis, fleet evolution trend evaluation.',
        dataVolume: '~15K active aircraft records, fleet changes tracked monthly',
        prereqs: ['T2.4', 'T1.3'], risk: 'Low', riskNotes: '' },
      { id: 'T3.3', title: 'Frontend live data integration', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'Replace all dummy data imports with live API calls using React Query (TanStack). Add loading states, error boundaries, retry logic. AI-generated hooks for all endpoints.',
        why: 'Frontend must transition from static dummy data to live API-driven analytics seamlessly for analyst productivity.',
        dataVolume: 'N/A - frontend layer',
        prereqs: ['T3.1', 'T3.2'], risk: 'Low', riskNotes: 'AI accelerates frontend integration significantly' },
      { id: 'T3.4', title: 'Competitive route structure evaluation', points: 5, status: 'Planned', assignee: 'R2', priority: 'High',
        what: 'Market concentration analysis (HHI), competitive overlap detection, route-level carrier comparison. AI-assisted identification of anti-competitive market structures.',
        why: 'Competitive route structure evaluation and analytical support for regulatory case development per Technical Proposal Section 2.1.',
        dataVolume: 'Analysis across ~100K O&D market pairs',
        prereqs: ['T3.1'], risk: 'Low', riskNotes: '' },
      { id: 'T3.5', title: 'Capacity-driven market performance', points: 5, status: 'Planned', assignee: 'R2', priority: 'High',
        what: 'Integrate fleet capacity data with traffic data to compute load factors, capacity utilization, and capacity-driven market performance metrics. AI auto-generates performance scorecards.',
        why: 'Capacity-driven market performance assessment is a key fleet intelligence capability per Technical Proposal Section 2.2.',
        dataVolume: 'Joins fleet + traffic data for ~2K active routes',
        prereqs: ['T3.1', 'T3.2'], risk: 'Low', riskNotes: '' },
    ],
  },
  {
    id: 'S4', name: 'Sprint 4 - AI-Augmented Analytical Functionality', startDate: '2025-05-19', endDate: '2025-05-30',
    phase: 'P1 - AI Integration', totalPoints: 34, completedPoints: 0, status: 'Planned',
    goals: 'Integrate AI-assisted analytical augmentation: natural language query assistance, automated anomaly identification, predictive visualizations. Core differentiator per Technical Proposal Section 2.3.',
    tasks: [
      { id: 'T4.1', title: 'LLM integration & NL query assistance', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'Integrate LLM (OpenAI GPT-4o or Azure OpenAI) for natural language analytical query assistance. Implement RAG pipeline with pgvector: embed schema + docs + sample queries. NL-to-SQL engine with safety validation (read-only). Aviation domain prompt engineering.',
        why: 'Natural language analytical query assistance is a core AI-enabled capability per Technical Proposal Section 2.3. Designed to supplement, not replace, traditional analytical methodologies.',
        dataVolume: 'Est. ~5K queries/month. RAG: ~5K embedding vectors.',
        prereqs: ['T1.2', 'T3.1'], risk: 'Medium', riskNotes: 'LLM accuracy requires iterative prompt tuning; AI-generated SQL must be validated for safety' },
      { id: 'T4.2', title: 'Automated traffic pattern anomaly detection', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'AI-powered anomaly detection: fare spikes, traffic drops, on-time degradation, unusual market share shifts. Z-score and IQR methods with seasonal adjustment. Automated alerts surfaced in dashboard.',
        why: 'Automated identification of traffic pattern anomalies is a key AI capability per Technical Proposal Section 2.3.',
        dataVolume: 'Scans ~50 metrics daily across all markets',
        prereqs: ['T2.4', 'T3.1'], risk: 'Low', riskNotes: 'Threshold tuning requires analyst feedback over time' },
      { id: 'T4.3', title: 'Predictive demand & capacity visualization', points: 5, status: 'Planned', assignee: 'R2', priority: 'High',
        what: 'AI-generated predictive models for demand forecasting and capacity trend visualization. Time-series forecasting with seasonal decomposition. Interactive forecast charts with confidence intervals.',
        why: 'Predictive visualization of demand and capacity trends per Technical Proposal Section 2.3.',
        dataVolume: 'Forecasts across top ~500 markets',
        prereqs: ['T2.4', 'T4.1'], risk: 'Medium', riskNotes: 'Forecast accuracy depends on data completeness' },
      { id: 'T4.4', title: 'AI-assisted report preparation', points: 8, status: 'Planned', assignee: 'R2', priority: 'High',
        what: 'AI generates draft report narratives, executive summaries, and trend descriptions. Analyst reviews and edits AI-generated content. Auto-chart generation from NL queries. Export as PDF/Excel.',
        why: 'AI-assisted report preparation support and analytical workflow acceleration tools per Technical Proposal Section 2.3.',
        dataVolume: 'N/A',
        prereqs: ['T4.1', 'T3.1'], risk: 'Low', riskNotes: '' },
      { id: 'T4.5', title: 'Analytical workflow acceleration tools', points: 5, status: 'Planned', assignee: 'R2', priority: 'High',
        what: 'AI-powered shortcuts: auto-fill filters based on recent queries, smart search across all datasets, query history with AI suggestions, saved analytical workflows, bulk data comparison tools.',
        why: 'Analytical workflow acceleration tools and high analyst productivity per Technical Proposal Section 2.3.',
        dataVolume: 'N/A',
        prereqs: ['T4.1'], risk: 'Low', riskNotes: '' },
    ],
  },
  {
    id: 'S5', name: 'Sprint 5 - Regulatory & Export Capabilities', startDate: '2025-06-02', endDate: '2025-06-13',
    phase: 'P1 - Core Analytics', totalPoints: 34, completedPoints: 0, status: 'Planned',
    goals: 'Build ad-hoc regulatory analytical workflows, exportable analytical datasets, and secure role-based analytical access.',
    tasks: [
      { id: 'T5.1', title: 'Regulatory analytical workflow support', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'AI-enhanced regulatory analysis tools: merger impact assessment with HHI computation, slot allocation analysis, competitive market evaluation, fare premium analysis. Supports ad-hoc analytical workflows for case development.',
        why: 'Ad-hoc regulatory analytical workflows and analytical support for regulatory case development per Technical Proposal Sections 1 and 2.1.',
        dataVolume: 'HHI across ~100K O&D markets per scenario',
        prereqs: ['T3.1', 'T3.4'], risk: 'Medium', riskNotes: 'Methodology must align with DOT analytical precedent' },
      { id: 'T5.2', title: 'Exportable analytical datasets', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'Server-side export engine: Excel (ExcelJS) with formatted sheets and charts, CSV for raw data, PDF reports (Puppeteer) with DOT branding. Support large exports (>100K rows) via streaming. AI generates report narratives.',
        why: 'Exportable analytical datasets is a core system capability per Technical Proposal Section 1.',
        dataVolume: 'Exports up to 1M rows per request',
        prereqs: ['T3.1'], risk: 'Low', riskNotes: '' },
      { id: 'T5.3', title: 'Secure role-based analytical access', points: 5, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'Enhanced RBAC: department-level data access controls, audit trail for all data access and exports, session management, user account administration interface. AI-monitored access patterns for anomaly detection.',
        why: 'Secure role-based user access and secure web-based analytical interface per Technical Proposal Section 3.',
        dataVolume: '~100 users, ~10K audit events/month',
        prereqs: ['T1.4'], risk: 'Low', riskNotes: '' },
      { id: 'T5.4', title: 'Route map & network visualization', points: 8, status: 'Planned', assignee: 'R2', priority: 'High',
        what: 'Interactive geographic map (Mapbox GL JS): airport markers sized by traffic, great circle route arcs, carrier network overlays, heat map for traffic density. Click interactions for route-level detail.',
        why: 'Visual network analysis is essential for competitive route structure evaluation and merger impact assessment.',
        dataVolume: 'Rendering ~500 airports, ~2000 routes',
        prereqs: ['T3.1'], risk: 'Medium', riskNotes: 'Mapbox token required; WebGL performance needs optimization for large networks' },
      { id: 'T5.5', title: 'User account admin & support tools', points: 5, status: 'Planned', assignee: 'R3', priority: 'High',
        what: 'Admin interface for user account management, role assignments, access requests. Support request triage system. AI-assisted monitoring of system access patterns.',
        why: 'User account administration and access control, support request triage and coordination per Technical Proposal Section 4.3.',
        dataVolume: 'N/A',
        prereqs: ['T5.3'], risk: 'Low', riskNotes: '' },
    ],
  },
  {
    id: 'S6', name: 'Sprint 6 - Security, Training & Transition', startDate: '2025-06-16', endDate: '2025-06-27',
    phase: 'P2 - Delivery', totalPoints: 34, completedPoints: 0, status: 'Planned',
    goals: 'Security hardening, analyst training program, transition support, and production readiness. Per Technical Proposal Sections 5, 6, and 7.',
    tasks: [
      { id: 'T6.1', title: 'Security hardening & compliance', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'Encryption in transit (TLS 1.3) and at rest (AES-256), HTTP security headers (CSP, HSTS), dependency vulnerability scanning, incident detection and response readiness, secure cloud hosting configuration hardening.',
        why: 'Security controls consistent with commercial best practices aligned to federal expectations per Technical Proposal Section 5.',
        dataVolume: 'N/A',
        prereqs: ['T1.4'], risk: 'Low', riskNotes: 'Standard security hardening; AI-assisted vulnerability scanning' },
      { id: 'T6.2', title: 'Analyst training program & materials', points: 8, status: 'Planned', assignee: 'R3', priority: 'Critical',
        what: 'Annual structured analyst training sessions, AI-augmented analytics training modules, technical documentation, user guides, web-based support capability. Focus on maximizing analytical productivity using both traditional and AI-enhanced workflows.',
        why: 'Training will focus on maximizing analytical productivity per Technical Proposal Section 6. Annual structured analyst training sessions required.',
        dataVolume: 'N/A',
        prereqs: ['T4.1', 'T5.2'], risk: 'Low', riskNotes: '' },
      { id: 'T6.3', title: 'Transition support & onboarding', points: 5, status: 'Planned', assignee: 'R1', priority: 'Critical',
        what: 'Platform onboarding coordination, user environment configuration, analytical workflow validation, parallel operational support during transition period. No historical data migration anticipated per Technical Proposal.',
        why: 'Technical team will support transition activities per Technical Proposal Section 7. Minimal transition risk.',
        dataVolume: 'N/A',
        prereqs: ['T6.2'], risk: 'Low', riskNotes: 'No historical data migration reduces transition complexity' },
      { id: 'T6.4', title: 'System activity logging & monitoring', points: 5, status: 'Planned', assignee: 'R3', priority: 'High',
        what: 'Comprehensive system activity logging, AI-assisted operational monitoring automation, proactive issue detection, uptime assurance dashboards, performance monitoring.',
        why: 'System activity logging and monitoring, incident detection and response readiness per Technical Proposal Section 5.',
        dataVolume: 'N/A',
        prereqs: ['T1.5'], risk: 'Low', riskNotes: '' },
      { id: 'T6.5', title: 'Performance testing & optimization', points: 5, status: 'Planned', assignee: 'R2', priority: 'High',
        what: 'Load testing (simulate 50 concurrent analysts), query optimization, connection pooling tuning, CDN configuration, caching optimization. Target: p95 < 1s for data queries.',
        why: 'Rapid analytical response capability and high system availability per Technical Proposal Section 3.',
        dataVolume: '50 concurrent users x 100 requests',
        prereqs: ['T3.1', 'T4.1'], risk: 'Low', riskNotes: '' },
      { id: 'T6.6', title: 'Email-based technical escalation support', points: 3, status: 'Planned', assignee: 'R3', priority: 'Medium',
        what: 'Set up email-based technical escalation support system, support request tracking, SLA monitoring, knowledge base for common issues.',
        why: 'Email-based technical escalation support per Technical Proposal Section 6.',
        dataVolume: 'N/A',
        prereqs: ['T5.5'], risk: 'Low', riskNotes: '' },
    ],
  },
  {
    id: 'S7', name: 'Sprint 7 - UAT & Production Launch', startDate: '2025-06-30', endDate: '2025-07-11',
    phase: 'P2 - Delivery', totalPoints: 30, completedPoints: 0, status: 'Planned',
    goals: 'User acceptance testing with DOT OAA analysts, final remediation, production deployment, and operational handoff.',
    tasks: [
      { id: 'T7.1', title: 'UAT with DOT OAA analysts', points: 8, status: 'Planned', assignee: 'R1', priority: 'Critical',
        what: 'Structured UAT sessions with DOT OAA analysts: walk through all analytical workflows (market analysis, fleet intelligence, regulatory cases, AI queries, exports). 2 rounds of UAT with fixes between rounds.',
        why: 'Government acceptance required before production deployment. Validates all capabilities per Technical Proposal.',
        dataVolume: 'N/A',
        prereqs: ['T6.2', 'T6.5'], risk: 'Medium', riskNotes: 'DOT analyst availability may be limited; feedback may require additional iteration' },
      { id: 'T7.2', title: 'UAT remediation & fixes', points: 8, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'Address all UAT findings: bug fixes, UX improvements, performance issues, analytical accuracy corrections. AI-accelerated remediation for rapid turnaround.',
        why: 'All analyst-reported issues must be resolved before production launch.',
        dataVolume: 'N/A',
        prereqs: ['T7.1'], risk: 'Medium', riskNotes: 'Scope of remediation depends on UAT findings' },
      { id: 'T7.3', title: 'Production deployment', points: 5, status: 'Planned', assignee: 'R2', priority: 'Critical',
        what: 'Blue-green deployment to production. DNS cutover. 48-hour monitoring period. Rollback plan tested. Final data validation. AI-assisted deployment verification.',
        why: 'Production launch with minimal operational overhead and high system availability per Technical Proposal Section 3.',
        dataVolume: 'N/A',
        prereqs: ['T7.2'], risk: 'Low', riskNotes: 'AI-assisted deployment reduces risk' },
      { id: 'T7.4', title: 'Operations handoff & runbook', points: 5, status: 'Planned', assignee: 'R3', priority: 'High',
        what: 'Complete operations documentation: incident response procedures, data refresh procedures, monitoring alert definitions, escalation paths, user onboarding checklist.',
        why: 'Efficient lifecycle sustainment and minimal operational overhead per Technical Proposal.',
        dataVolume: 'N/A',
        prereqs: ['T7.3'], risk: 'Low', riskNotes: '' },
      { id: 'T7.5', title: 'Post-launch monitoring & stabilization', points: 4, status: 'Planned', assignee: 'R3', priority: 'High',
        what: '2-week hypercare period: dedicated monitoring, immediate bug fixes, performance tuning, user support. AI-assisted monitoring for proactive issue detection.',
        why: 'System performance monitoring and uptime assurance per Technical Proposal Section 4.3.',
        dataVolume: 'N/A',
        prereqs: ['T7.3'], risk: 'Low', riskNotes: '' },
    ],
  },
];

export const projectRisks = [
  { id: 'RISK-01', title: 'Data Pipeline Schema Variations', probability: 'Medium', impact: 'Medium', score: 4,
    description: 'Historical BTS data files (2015-2024) may have schema variations, format changes, or missing fields across different years.',
    mitigation: 'AI-assisted format detection and auto-repair. Process in yearly batches with validation. Maintain schema mapping table.',
    affectedTasks: ['T2.4'], affectedSprints: ['S2'], daysAtRisk: 3,
    category: 'Technical' },
  { id: 'RISK-02', title: 'LLM Query Accuracy', probability: 'Medium', impact: 'Medium', score: 4,
    description: 'Natural language to SQL conversion may produce incorrect queries for complex multi-join analytical questions.',
    mitigation: 'Implement query validation layer. Show generated SQL to analyst for confirmation before execution. Curate library of validated query templates. Iterative prompt tuning.',
    affectedTasks: ['T4.1'], affectedSprints: ['S4'], daysAtRisk: 7,
    category: 'Technical' },
  { id: 'RISK-03', title: 'DOT Stakeholder UAT Availability', probability: 'Medium', impact: 'High', score: 6,
    description: 'DOT OAA analysts may have limited availability for UAT sessions due to ongoing operational workload and competing priorities.',
    mitigation: 'Schedule UAT sessions 4 weeks in advance. Provide self-service test scripts. Record demo videos. Flexible scheduling (early morning/late afternoon).',
    affectedTasks: ['T7.1'], affectedSprints: ['S7'], daysAtRisk: 10,
    category: 'External Dependency' },
  { id: 'RISK-04', title: 'Cloud Infrastructure Cost Overrun', probability: 'Low', impact: 'Medium', score: 3,
    description: 'Data volume growth or unexpected compute usage could exceed the $120K/year infrastructure budget.',
    mitigation: 'Implement cost monitoring alerts at 80% threshold. Use reserved instances for predictable workloads. Auto-scaling with hard caps. Engineering Risk Reserve ($50K) provides buffer.',
    affectedTasks: ['T1.1'], affectedSprints: ['S1'], daysAtRisk: 0,
    category: 'Financial' },
  { id: 'RISK-05', title: 'Transition Period Complexity', probability: 'Low', impact: 'Medium', score: 3,
    description: 'Parallel operational support during transition from incumbent solution may require additional coordination effort.',
    mitigation: 'No historical data migration anticipated per Technical Proposal. Focus on analytical workflow validation. Technical Architect provides dedicated Government stakeholder liaison.',
    affectedTasks: ['T6.3'], affectedSprints: ['S6'], daysAtRisk: 5,
    category: 'Operational' },
  { id: 'RISK-06', title: 'AI Augmentation Adoption', probability: 'Low', impact: 'Low', score: 2,
    description: 'Analysts may initially resist AI-augmented workflows or prefer traditional analytical methods.',
    mitigation: 'AI capabilities designed to supplement, not replace, traditional methodologies per Technical Proposal. Structured training program. Gradual rollout of AI features. Analyst feedback loop.',
    affectedTasks: ['T6.2'], affectedSprints: ['S6'], daysAtRisk: 0,
    category: 'Adoption' },
];

export const projectBudget = {
  // Per Technical Proposal Section 8 - Base Year
  baseYear: {
    labor: [
      { role: 'AI Full-Stack Engineer', type: '1099', annual: 150000 },
      { role: 'AI-Enabled Ops Support Engineer', type: '1099', annual: 90000 },
    ],
    laborTotal: 240000,
    cloudInfrastructure: 120000,
    securityMonitoring: 20000,
    trainingSupport: 25000,
    subtechnicalDelivery: 405000,
    engineeringRiskReserve: 50000,
    platformSustainmentMargin: 110000,
    total: 585000,
  },
  // Per Technical Proposal Section 8 - Option Years
  optionYear: {
    labor: 240000,
    infrastructure: 120000,
    security: 20000,
    training: 20000,
    sustainmentMargin: 70000,
    total: 470000,
  },
  // 5-year totals
  fiveYear: {
    baseYear: 585000,
    optionYears: 1880000,
    total: 2465000,
  },
  // Sprint-level labor cost breakdown (7 sprints over ~14 weeks in base year)
  laborCost: [
    { sprint: 'S1', cost: 34286 }, { sprint: 'S2', cost: 34286 }, { sprint: 'S3', cost: 34286 },
    { sprint: 'S4', cost: 34286 }, { sprint: 'S5', cost: 34286 }, { sprint: 'S6', cost: 34286 },
    { sprint: 'S7', cost: 34286 },
  ],
  infrastructure: [
    { item: 'Cloud Compute (ECS Fargate / App Service)', monthlyCost: 3500, annual: 42000 },
    { item: 'Managed PostgreSQL (RDS/Azure DB)', monthlyCost: 2800, annual: 33600 },
    { item: 'Redis Cache (ElastiCache)', monthlyCost: 350, annual: 4200 },
    { item: 'Object Storage (S3/Blob)', monthlyCost: 200, annual: 2400 },
    { item: 'LLM API (OpenAI / Azure OpenAI)', monthlyCost: 800, annual: 9600 },
    { item: 'CDN & DNS', monthlyCost: 150, annual: 1800 },
    { item: 'Networking (VPC, ALB, NAT)', monthlyCost: 500, annual: 6000 },
    { item: 'Backup & DR', monthlyCost: 300, annual: 3600 },
    { item: 'Security & Monitoring Tools', monthlyCost: 1667, annual: 20000 },
    { item: 'Training & Support Systems', monthlyCost: 2083, annual: 25000 },
  ],
  totalLaborCost: 240000,
  totalInfraCostAnnual: 120000,
  securityAnnual: 20000,
  trainingAnnual: 25000,
  grandTotal: 585000,
};

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
