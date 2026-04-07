'use client'
import { useState, useEffect, useRef, Fragment } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { getLiveKPIs, getDeviceParams, initialTimeSeries, generateHeatmap } from '../../../lib/demo-data'
import { Wifi, WifiOff, Zap } from 'lucide-react'

const DEVICES = ['Main Incomer', 'Production Floor DB', 'Chiller Plant']

function KpiCard({ label, value, unit, sub, highlight }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm" style={{ border: highlight ? '2px solid #2563eb' : '1px solid #e5e7eb' }}>
      <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color:'#6b7280' }}>{label}</p>
      <p className="text-3xl font-bold" style={{ color: highlight ? '#2563eb' : '#1e3a5f' }}>
        {value} <span className="text-sm font-normal" style={{ color:'#9ca3af' }}>{unit}</span>
      </p>
      {sub && <p className="text-xs mt-1" style={{ color:'#9ca3af' }}>{sub}</p>}
    </div>
  )
}

function ParamCard({ label, value, unit, status = 'normal' }) {
  const color = status === 'warn' ? '#d97706' : status === 'bad' ? '#dc2626' : '#2563eb'
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm" style={{ border:'1px solid #e5e7eb' }}>
      <p className="text-xs uppercase tracking-wide mb-1" style={{ color:'#9ca3af' }}>{label}</p>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
      <p className="text-xs" style={{ color:'#9ca3af' }}>{unit}</p>
    </div>
  )
}

function HeatmapCell({ kwh, day, hour }) {
  const max = 100
  const intensity = Math.min(kwh / max, 1)
  const r = Math.round(239 - intensity * (239 - 30))
  const g = Math.round(246 - intensity * (246 - 58))
  const b = Math.round(255 - intensity * (255 - 95))
  return (
    <div title={`${day} ${hour.toString().padStart(2,'0')}:00 — ${kwh} kWh`}
      style={{ backgroundColor: `rgb(${r},${g},${b})`, width:'100%', aspectRatio:'1', cursor:'default',
               border:'1px solid rgba(255,255,255,0.3)', borderRadius:'2px' }} />
  )
}

export default function DashboardPage() {
  const [tick,   setTick]   = useState(0)
  const [device, setDevice] = useState(DEVICES[0])
  const [series, setSeries] = useState(() => initialTimeSeries(DEVICES[0]))
  const [heatmap] = useState(generateHeatmap)
  const [kpis,   setKpis]   = useState(() => getLiveKPIs(0))
  const [params, setParams] = useState(() => getDeviceParams(DEVICES[0], 0))
  const tickRef  = useRef(0)

  // KPIs update every 3s
  useEffect(() => {
    const id = setInterval(() => {
      const next = tickRef.current + 1
      tickRef.current = next
      setTick(next)
      setKpis(getLiveKPIs(next))
    }, 3000)
    return () => clearInterval(id)
  }, [])

  // Sync params when tick or device changes
  useEffect(() => {
    setParams(getDeviceParams(device, tickRef.current))
  }, [tick, device])

  // New time-series point every 5s
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date()
      const label = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`
      const base = device === 'Main Incomer' ? 287 : device === 'Production Floor DB' ? 234 : 53
      const newPt = { time: label, power: +(base + Math.sin(tickRef.current*0.4)*18 + (Math.random()-0.5)*10).toFixed(1) }
      setSeries(prev => [...prev.slice(-35), newPt])
    }, 5000)
    return () => clearInterval(id)
  }, [device])

  // Reset series when device changes
  useEffect(() => { setSeries(initialTimeSeries(device)) }, [device])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Active Power" value={kpis.activePower} unit="kW" highlight />
        <KpiCard label="Energy Today" value={kpis.energyToday.toLocaleString()} unit="kWh" sub="Incrementing live" />
        <KpiCard label="Power Factor"  value={kpis.powerFactor} unit="" />
        <KpiCard label="Devices Online" value={`${kpis.devicesOnline} / ${kpis.devicesTotal}`} unit=""
          sub={<span className="flex items-center gap-1 text-xs" style={{color:'#16a34a'}}><Wifi className="h-3 w-3"/>Live</span>} />
      </div>

      {/* Device selector */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color:'#6b7280' }}>Select Device</p>
        <div className="flex gap-2 flex-wrap">
          {DEVICES.map(d => (
            <button key={d} onClick={() => setDevice(d)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{ backgroundColor: device===d ? '#1e3a5f':'#ffffff', color: device===d?'#fff':'#374151',
                       border: device===d?'2px solid #1e3a5f':'1px solid #e5e7eb' }}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Parameter grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wide" style={{ color:'#1e3a5f' }}>
          Live Parameters — {device}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <ParamCard label="L1-N Voltage" value={params.voltage.l1n} unit="V" />
          <ParamCard label="L2-N Voltage" value={params.voltage.l2n} unit="V" />
          <ParamCard label="L3-N Voltage" value={params.voltage.l3n} unit="V" />
          <ParamCard label="L1-L2 Voltage" value={params.voltage.l1l2} unit="V" />
          <ParamCard label="L1 Current" value={params.current.l1} unit="A" />
          <ParamCard label="L2 Current" value={params.current.l2} unit="A" />
          <ParamCard label="L3 Current" value={params.current.l3} unit="A" />
          <ParamCard label="Neutral Current" value={params.current.neutral} unit="A" />
          <ParamCard label="Active Power" value={params.power.active} unit="kW" />
          <ParamCard label="Apparent Power" value={params.power.apparent} unit="kVA" />
          <ParamCard label="Reactive Power" value={params.power.reactive} unit="kVAr" />
          <ParamCard label="L1 Active Power" value={params.power.l1} unit="kW" />
          <ParamCard label="Power Factor" value={params.quality.pf} unit=""
            status={params.quality.pf >= 0.9 ? 'normal' : params.quality.pf >= 0.85 ? 'warn' : 'bad'} />
          <ParamCard label="THD Voltage" value={params.quality.thdV} unit="%" />
          <ParamCard label="THD Current" value={params.quality.thdI} unit="%" />
          <ParamCard label="Frequency" value={params.quality.freq} unit="Hz" />
          <ParamCard label="Import Energy" value={(params.energy.import).toLocaleString()} unit="kWh" />
          <ParamCard label="Export Energy" value="0" unit="kWh" />
        </div>
      </div>

      {/* Time series chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border:'1px solid #e5e7eb' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold" style={{ color:'#1e3a5f' }}>Active Power — Last 30 Minutes</h3>
          <span className="flex items-center gap-1 text-xs font-semibold" style={{ color:'#16a34a' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor:'#16a34a'}} />
            Live · updates every 5s
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="time" tick={{ fontSize:10, fill:'#9ca3af' }} interval={5} />
            <YAxis tick={{ fontSize:10, fill:'#9ca3af' }} unit=" kW" domain={['auto','auto']} />
            <Tooltip formatter={(v) => [`${v} kW`, 'Active Power']} />
            <Line type="monotone" dataKey="power" stroke="#2563eb" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border:'1px solid #e5e7eb' }}>
        <h3 className="font-bold mb-1" style={{ color:'#1e3a5f' }}>Energy Intensity Heatmap — 7 Days × 24 Hours</h3>
        <p className="text-xs mb-4" style={{ color:'#9ca3af' }}>Darker = higher consumption. Hover for exact value.</p>
        <div className="overflow-x-auto">
          <div style={{ display:'grid', gridTemplateColumns:'40px repeat(24, 1fr)', gap:'2px', minWidth:'600px' }}>
            {/* Hour labels */}
            <div />
            {Array.from({length:24},(_,h) => (
              <div key={h} className="text-center" style={{ fontSize:'9px', color:'#9ca3af' }}>
                {h % 4 === 0 ? `${h.toString().padStart(2,'0')}` : ''}
              </div>
            ))}
            {heatmap.map(row => (
              <Fragment key={row.day}>
                <div className="flex items-center text-xs font-medium" style={{ color:'#6b7280' }}>{row.day}</div>
                {row.hours.map(cell => (
                  <HeatmapCell key={`${row.day}-${cell.hour}`} kwh={cell.kwh} day={row.day} hour={cell.hour} />
                ))}
              </Fragment>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 text-xs" style={{ color:'#6b7280' }}>
          <span>Low</span>
          <div className="flex gap-0.5">
            {[0.1,0.3,0.5,0.7,0.9].map(i => {
              const r=Math.round(239-i*(239-30)),g=Math.round(246-i*(246-58)),b=Math.round(255-i*(255-95))
              return <div key={i} style={{width:'20px',height:'12px',borderRadius:'2px',backgroundColor:`rgb(${r},${g},${b})`}} />
            })}
          </div>
          <span>High</span>
        </div>
      </div>

    </div>
  )
}
