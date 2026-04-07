// ─── Demo Data Generation ────────────────────────────────────────────────────
// All data is 100% client-side simulated. No API calls.

export function noise(amplitude = 1) {
  return (Math.random() - 0.5) * 2 * amplitude
}

export function sinNoise(t, period, amplitude, noiseAmp = 0) {
  return amplitude * Math.sin((2 * Math.PI * t) / period) + noise(noiseAmp)
}

// ─── KPI Live Values ─────────────────────────────────────────────────────────
export function getLiveKPIs(tick = 0) {
  return {
    activePower:  +(287.4 + sinNoise(tick, 12, 4, 1.5)).toFixed(1),
    energyToday:  +(1842  + tick * 0.08).toFixed(0),
    powerFactor:  +(0.912 + sinNoise(tick, 20, 0.015, 0.004)).toFixed(3),
    devicesOnline: 12,
    devicesTotal:  14,
  }
}

// ─── Device Parameter Grids ──────────────────────────────────────────────────
const deviceBases = {
  'Main Incomer': { v: 231, i: 142, p: 287.4, pf: 0.912 },
  'Production Floor DB': { v: 229, i: 118, p: 234.1, pf: 0.903 },
  'Chiller Plant': { v: 230, i:  38, p:  53.3, pf: 0.881 },
}

export function getDeviceParams(deviceName, tick = 0) {
  const b = deviceBases[deviceName] || deviceBases['Main Incomer']
  const v = (n) => +(n + sinNoise(tick, 15, 1.5, 0.5)).toFixed(1)
  const a = (n) => +(n + sinNoise(tick, 10, 2, 0.8)).toFixed(1)
  return {
    voltage: { l1n: v(b.v+1), l2n: v(b.v-2), l3n: v(b.v),
               l1l2: v(b.v*Math.sqrt(3)-0.5), l2l3: v(b.v*Math.sqrt(3)-2.5), l3l1: v(b.v*Math.sqrt(3)-1) },
    current: { l1: a(b.i), l2: a(b.i-4), l3: a(b.i+3), neutral: a(8) },
    power: {
      active:   +(b.p + sinNoise(tick, 8, 3, 1)).toFixed(1),
      apparent: +(b.p / b.pf + noise(2)).toFixed(1),
      reactive: +(b.p * Math.tan(Math.acos(b.pf)) + noise(2)).toFixed(1),
      l1: +(b.p / 3 + noise(1)).toFixed(1),
      l2: +(b.p / 3 + noise(1)).toFixed(1),
      l3: +(b.p / 3 + noise(1)).toFixed(1),
    },
    quality: {
      pf:    +(b.pf + sinNoise(tick, 20, 0.01, 0.003)).toFixed(3),
      pfl1:  +(b.pf + noise(0.01)).toFixed(3),
      pfl2:  +(b.pf - 0.01 + noise(0.01)).toFixed(3),
      pfl3:  +(b.pf + 0.002 + noise(0.01)).toFixed(3),
      thdV:  +(2.8 + noise(0.3)).toFixed(1),
      thdI:  +(4.1 + noise(0.5)).toFixed(1),
      freq:  +(50 + noise(0.04)).toFixed(2),
    },
    energy: {
      import: 84291 + tick,
      export: 0,
    },
  }
}

// ─── Time Series (30 minutes of Active Power) ─────────────────────────────
export function initialTimeSeries(device = 'Main Incomer') {
  const base = deviceBases[device]?.p || 287
  return Array.from({ length: 36 }, (_, i) => {
    const t = i * 50 // 50s intervals → 30min
    const h = new Date(Date.now() - (36 - i) * 50000)
    return {
      time: `${h.getHours().toString().padStart(2,'0')}:${h.getMinutes().toString().padStart(2,'0')}`,
      power: +(base + sinNoise(i, 8, 18, 6)).toFixed(1),
    }
  })
}

// ─── Heatmap (7 days × 24 hours) ─────────────────────────────────────────
export function generateHeatmap() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  return days.map(day => ({
    day,
    hours: Array.from({ length: 24 }, (_, h) => {
      const isSat = day === 'Sat', isSun = day === 'Sun'
      const factor = isSun ? 0.25 : isSat ? 0.55 : 1
      const base = h < 6 ? 18 : h < 8 ? 55 : h < 12 ? 88 : h < 14 ? 75 : h < 18 ? 92 : h < 22 ? 50 : 22
      return { hour: h, kwh: +(base * factor + noise(5)).toFixed(1) }
    }),
  }))
}

// ─── Analytics Page Data ─────────────────────────────────────────────────
export const analyticsData = {
  device: 'Main Incomer',
  today:              { energy: 1842, meanPower: 287.4, peakPower: 342.1, pf: 0.912 },
  yesterday:          { energy: 1798, meanPower: 281.2, peakPower: 318.4, pf: 0.904 },
  sameDayLastWeek:    { energy: 1901, meanPower: 295.3, peakPower: 354.8, pf: 0.891 },
  thisWeek:           { energy: 8420 },
  prevMonthSameWeek:  { energy: 9104 },
  powerQuality: {
    pf: 0.912, activePower: 287.4, apparentPower: 315.2,
    status: 'good', note: 'Operating within acceptable limits. Consider capacitor bank if PF drops below 0.90.',
  },
  phaseBalance: {
    l1: 142.3, l2: 138.1, l3: 145.2, imbalance: 2.5, status: 'good',
    note: 'Phase balance is excellent. All phases within 5% of mean.',
  },
}

export function generateHourlyProfile() {
  return Array.from({ length: 24 }, (_, h) => {
    const base = h < 6 ? 22 : h < 8 ? 62 : h < 12 ? 91 : h < 14 ? 78 : h < 18 ? 95 : h < 22 ? 52 : 28
    return {
      hour: `${h.toString().padStart(2,'0')}:00`,
      today:     +(base + noise(8)).toFixed(0),
      yesterday: +(base * 0.97 + noise(8)).toFixed(0),
    }
  })
}

export const insights = [
  { level: 'info',     tag: 'Efficiency',    title: 'Off-peak consumption elevated',
    body: 'Energy draw between 00:00–05:00 is averaging 42 kW — 18% above baseline. Investigate HVAC scheduling or idle equipment.' },
  { level: 'warning',  tag: 'Power Quality', title: 'Power Factor approaching threshold',
    body: 'Mean PF over the last 7 days is 0.91, trending downward (−0.02 vs last month). Consider reactive power compensation to avoid utility penalties.' },
  { level: 'critical', tag: 'Demand',        title: 'Peak demand spike on Tuesday',
    body: 'A 342 kW peak was recorded at 14:30 on Tuesday — 23% above monthly average. This may trigger demand charges on your utility bill.' },
  { level: 'warning',  tag: 'Cost',          title: 'Projected monthly bill impact',
    body: 'At current consumption rate, this month\'s energy cost is projected at PKR 487,000 — 8% above last month. Primary driver: increased peak demand charges.' },
  { level: 'info',     tag: 'Efficiency',    title: 'Best efficiency window identified',
    body: 'Lowest specific energy consumption occurs between 08:00–10:00. Consider scheduling high-energy processes in this window.' },
  { level: 'warning',  tag: 'Maintenance',   title: 'Phase L3 current trending up',
    body: 'L3 current has increased 11% over the past 5 days while L1 and L2 remain stable. Possible loose connection or load imbalance on this phase.' },
]

// ─── EWMA Calculation ────────────────────────────────────────────────────
export function computeEWMA(values, alpha = 0.2) {
  const ewma = []
  let prev = values[0]
  for (const x of values) {
    const val = alpha * x + (1 - alpha) * prev
    ewma.push(+val.toFixed(2))
    prev = val
  }
  const mean = ewma.reduce((a, b) => a + b, 0) / ewma.length
  const std  = Math.sqrt(ewma.map(v => (v - mean) ** 2).reduce((a, b) => a + b, 0) / ewma.length)
  return { ewma, mean: +mean.toFixed(2), std: +std.toFixed(2), ucl: +(mean + 3 * std).toFixed(2), lcl: +(mean - 3 * std).toFixed(2) }
}

export function generateEWMASource(param) {
  const cfg = {
    'Active Power':  { base: 287, amp: 30, noise: 12, anomalyIdx: [12, 25, 8] },
    'L1 Current':    { base: 142, amp: 15, noise:  6, anomalyIdx: [10, 22] },
    'L3 Current':    { base: 145, amp: 15, noise:  6, anomalyIdx: [6, 20, 28] },
    'Power Factor':  { base: 0.91, amp: 0.02, noise: 0.015, anomalyIdx: [14, 27] },
    'THD':           { base: 4.1, amp: 0.8, noise: 0.4, anomalyIdx: [18] },
  }
  const c = cfg[param] || cfg['Active Power']
  return Array.from({ length: 30 }, (_, i) => {
    const isAnomaly = c.anomalyIdx.includes(i)
    const raw = c.base + sinNoise(i, 10, c.amp, c.noise) + (isAnomaly ? c.amp * 1.8 : 0)
    const date = new Date(); date.setDate(date.getDate() - (30 - i))
    return { day: date.toLocaleDateString('en-GB',{day:'2-digit',month:'short'}), raw: +raw.toFixed(2), isAnomaly }
  })
}

export const ewmaAnomalies = [
  { ts: 'Apr 01  14:30', param: 'Active Power', observed: '342 kW',  ewma: '291 kW',  ucl: '318 kW',  dev: '+17.5%', level: 'critical' },
  { ts: 'Mar 28  09:15', param: 'L3 Current',   observed: '178 A',   ewma: '145 A',   ucl: '162 A',   dev: '+22.8%', level: 'critical' },
  { ts: 'Mar 25  22:00', param: 'Power Factor',  observed: '0.81',    ewma: '0.90',    ucl: '0.87',    dev: '−10.0%', level: 'warning'  },
  { ts: 'Mar 19  03:45', param: 'Active Power',  observed: '218 kW',  ewma: '286 kW',  ucl: '261 kW',  dev: '−23.7%', level: 'warning'  },
]

// ─── Machine Health ──────────────────────────────────────────────────────
export const machineHealth = [
  { name: 'Main Incomer',       score: 94, status: 'Excellent', trend: 'stable',   color: '#16a34a',
    factors: [95,82,88,91,90,87], spark: [92,93,93,94,94,94,95,94,94,94] },
  { name: 'Production Floor DB',score: 78, status: 'Fair',      trend: 'declining', color: '#d97706',
    factors: [85,72,80,68,88,75], spark: [85,84,83,82,81,80,79,79,78,78] },
  { name: 'Chiller Plant',      score: 85, status: 'Good',      trend: 'stable',   color: '#16a34a',
    factors: [88,80,85,84,90,83], spark: [84,85,85,85,86,85,85,85,85,85] },
  { name: 'Compressed Air',     score: 61, status: 'Poor',      trend: 'declining', color: '#dc2626',
    factors: [65,55,70,52,75,61], spark: [72,70,68,67,66,65,63,62,61,61] },
  { name: 'Cooling Tower',      score: 88, status: 'Good',      trend: 'improving', color: '#16a34a',
    factors: [90,85,88,84,92,87], spark: [82,83,84,85,86,86,87,87,88,88] },
]

export const factorLabels = ['Voltage Stability','Current Balance','Power Factor','Temp Index','Harmonic Distortion','Operational Hours']

// ─── Predictive Maintenance ─────────────────────────────────────────────
export const maintenanceItems = [
  { asset: 'Main Transformer',   days: 78,  max: 120, level: 'good'    },
  { asset: 'Chiller Compressor', days: 34,  max: 120, level: 'warning'  },
  { asset: 'Air Compressor',     days:  8,  max: 120, level: 'critical' },
  { asset: 'Circuit Breakers',   days: 142, max: 180, level: 'good'    },
  { asset: 'Cooling Tower Pump', days: 91,  max: 120, level: 'good'    },
]

export const upcomingEvents = [
  { level:'critical', date:'Apr 10', asset:'Air Compressor',     note:'Predicted bearing wear. Recommend immediate inspection.' },
  { level:'warning',  date:'Apr 21', asset:'Chiller Compressor', note:'Filter replacement due.' },
  { level:'info',     date:'May 15', asset:'Main Transformer',   note:'Scheduled oil analysis.' },
  { level:'info',     date:'Jun 02', asset:'Circuit Breakers',   note:'Periodic inspection due.' },
]

export const faultProbability = [
  { label: 'Air Compressor bearing fault', pct: 73, color: '#dc2626' },
  { label: 'Chiller refrigerant leak',     pct: 31, color: '#d97706' },
  { label: 'Cooling tower scale buildup',  pct: 22, color: '#d97706' },
]

// ─── MTTR / MTBF ────────────────────────────────────────────────────────
export const mttrData = [
  { asset: 'Main Incomer',    mtbf: 4200, mttr: 1.2, avail: 99.97 },
  { asset: 'Chiller Plant',   mtbf: 1240, mttr: 4.8, avail: 99.61 },
  { asset: 'Air Compressor',  mtbf:  620, mttr: 5.6, avail: 99.10 },
  { asset: 'Cooling Tower',   mtbf: 2100, mttr: 2.4, avail: 99.89 },
  { asset: 'Production DB',   mtbf: 3800, mttr: 1.8, avail: 99.95 },
]

export const downtimeEvents = [
  { date:'Mar 14', start:'02:30', end:'06:10', dur:'3.7h', asset:'Chiller Plant',   cause:'Compressor overload trip. Reset + inspection.' },
  { date:'Mar 22', start:'11:15', end:'13:45', dur:'2.5h', asset:'Air Compressor',  cause:'Pressure relief valve fault. Valve replaced.' },
  { date:'Apr 01', start:'00:00', end:'03:30', dur:'3.5h', asset:'Cooling Tower',   cause:'Pump cavitation. Impeller cleaned.' },
]

// ─── Device Config ────────────────────────────────────────────────────────
export const configuredDevices = [
  { id:1, name:'Main Incomer Meter',   type:'Electricity Analyzer', protocol:'Modbus RTU', port:'/dev/ttyUSB0',       status:'online' },
  { id:2, name:'Production Floor DB',  type:'Electricity Analyzer', protocol:'Modbus RTU', port:'/dev/ttyUSB0',       status:'online' },
  { id:3, name:'Chiller Plant Meter',  type:'Electricity Analyzer', protocol:'Modbus TCP', port:'192.168.1.101:502',  status:'online' },
  { id:4, name:'Compressed Air Flow',  type:'Flow Meter',           protocol:'Modbus RTU', port:'/dev/ttyUSB1',       status:'degraded' },
  { id:5, name:'Cooling Tower Flow',   type:'Flow Meter',           protocol:'Modbus RTU', port:'/dev/ttyUSB1',       status:'online' },
]

export const registerMap = [
  { n:1,  addr:'0x0000', param:'L1 Phase Voltage',       dtype:'FLOAT32', scale:'1.0',   unit:'V',   cat:'Voltage', active:true },
  { n:2,  addr:'0x0002', param:'L2 Phase Voltage',       dtype:'FLOAT32', scale:'1.0',   unit:'V',   cat:'Voltage', active:true },
  { n:3,  addr:'0x0004', param:'L3 Phase Voltage',       dtype:'FLOAT32', scale:'1.0',   unit:'V',   cat:'Voltage', active:true },
  { n:4,  addr:'0x0006', param:'L1 Current',             dtype:'FLOAT32', scale:'1.0',   unit:'A',   cat:'Current', active:true },
  { n:5,  addr:'0x0008', param:'L2 Current',             dtype:'FLOAT32', scale:'1.0',   unit:'A',   cat:'Current', active:true },
  { n:6,  addr:'0x000A', param:'L3 Current',             dtype:'FLOAT32', scale:'1.0',   unit:'A',   cat:'Current', active:true },
  { n:7,  addr:'0x000C', param:'Active Three-phase Power',dtype:'FLOAT32',scale:'0.001', unit:'kW',  cat:'Power',   active:true },
  { n:8,  addr:'0x000E', param:'Apparent Power',         dtype:'FLOAT32', scale:'0.001', unit:'kVA', cat:'Power',   active:true },
  { n:9,  addr:'0x0010', param:'Reactive Power',         dtype:'FLOAT32', scale:'0.001', unit:'kVAr',cat:'Power',   active:true },
  { n:10, addr:'0x0012', param:'Power Factor (total)',   dtype:'FLOAT32', scale:'1.0',   unit:'',    cat:'Quality', active:true },
  { n:11, addr:'0x0014', param:'THD Voltage',            dtype:'FLOAT32', scale:'1.0',   unit:'%',   cat:'Quality', active:true },
  { n:12, addr:'0x0016', param:'Frequency',              dtype:'FLOAT32', scale:'1.0',   unit:'Hz',  cat:'Quality', active:true },
]
