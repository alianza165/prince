'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, LineChart, Line, ComposedChart, Scatter, XAxis, YAxis,
         Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine, Area } from 'recharts'
import { machineHealth, factorLabels, maintenanceItems, upcomingEvents, faultProbability,
         mttrData, downtimeEvents, generateEWMASource, computeEWMA, ewmaAnomalies } from '../../../lib/demo-data'
import { AlertCircle, AlertTriangle, Info, Calendar, Activity } from 'lucide-react'

const TABS = ['Machine Health', 'Predictive Maintenance', 'MTTR / MTBF', 'EWMA Anomaly Detection']
const EWMA_PARAMS = ['Active Power', 'L1 Current', 'L3 Current', 'Power Factor', 'THD']

const levelColor = { good:'#16a34a', warning:'#d97706', critical:'#dc2626', info:'#2563eb' }
const levelBg    = { critical:'#fef2f2', warning:'#fffbeb', info:'#eff6ff', good:'#f0fdf4' }

function SectionHeader({ title }) {
  return (
    <div className="rounded-lg px-5 py-3 mb-4" style={{ backgroundColor:'#1e3a5f' }}>
      <h2 className="text-white font-bold text-sm uppercase tracking-wider">{title}</h2>
    </div>
  )
}

// ── Machine Health ────────────────────────────────────────────────────────────
function HealthDonut({ score, color }) {
  return (
    <div className="relative w-24 h-24 mx-auto">
      <PieChart width={96} height={96}>
        <Pie data={[{v:score},{v:100-score}]} dataKey="v" startAngle={90} endAngle={-270}
          innerRadius={32} outerRadius={44} strokeWidth={0}>
          <Cell fill={color} />
          <Cell fill="#e5e7eb" />
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold" style={{ color }}>{score}%</span>
      </div>
    </div>
  )
}

function HealthCard({ asset }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm" style={{ border:`1px solid #e5e7eb` }}>
      <HealthDonut score={asset.score} color={asset.color} />
      <p className="text-center font-bold text-sm mt-2" style={{ color:'#1e3a5f' }}>{asset.name}</p>
      <span className="block text-center text-xs font-semibold mt-0.5" style={{ color: asset.color }}>{asset.status}</span>
      <div className="mt-4 space-y-1.5">
        {factorLabels.map((label, i) => (
          <div key={label}>
            <div className="flex justify-between text-xs mb-0.5" style={{ color:'#6b7280' }}>
              <span>{label}</span><span>{asset.factors[i]}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ backgroundColor:'#e5e7eb' }}>
              <div className="h-full rounded-full" style={{ width:`${asset.factors[i]}%`,
                backgroundColor: asset.factors[i]>=80?'#16a34a':asset.factors[i]>=60?'#d97706':'#dc2626' }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs" style={{ color:'#9ca3af' }}>Trend (30d)</span>
        <span className="text-xs font-semibold"
          style={{ color: asset.trend==='improving'?'#16a34a':asset.trend==='declining'?'#dc2626':'#6b7280' }}>
          {asset.trend==='improving'?'↑ Improving':asset.trend==='declining'?'↓ Declining':'→ Stable'}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={asset.spark.map((v,i)=>({i,v}))}>
          <Line type="monotone" dataKey="v" stroke={asset.color} strokeWidth={1.5} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── Gauge (semicircular) for fault probability ────────────────────────────────
function FaultGauge({ label, pct, color }) {
  const R=50,cx=60,cy=60
  const ang = (pct/100)*180
  const toXY = d => ({
    x: cx + R*Math.cos(((180-d)*Math.PI)/180),
    y: cy - R*Math.sin(((180-d)*Math.PI)/180),
  })
  const tip = toXY(ang)
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm text-center" style={{ border:'1px solid #e5e7eb' }}>
      <svg viewBox="0 0 120 70" className="w-36 mx-auto">
        <path d={`M ${cx-R} ${cy} A ${R} ${R} 0 0 1 ${cx+R} ${cy}`} fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
        <path d={`M ${toXY(0).x} ${toXY(0).y} A ${R} ${R} 0 0 1 ${tip.x} ${tip.y}`}
          fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="3.5" fill="#1e3a5f" />
        <text x={cx} y={cy+14} textAnchor="middle" fontSize="16" fontWeight="bold" fill={color}>{pct}%</text>
      </svg>
      <p className="text-xs font-medium mt-1" style={{ color:'#374151' }}>{label}</p>
    </div>
  )
}

// ── EWMA chart ────────────────────────────────────────────────────────────────
function EwmaTab() {
  const [param, setParam] = useState('Active Power')
  const [alpha, setAlpha] = useState(0.2)
  const source = useMemo(() => generateEWMASource(param), [param])
  const { ewma, ucl, lcl } = useMemo(() => computeEWMA(source.map(d=>d.raw), alpha), [source, alpha])

  const chartData = source.map((d, i) => ({
    day: d.day, raw: d.raw, ewma: ewma[i], ucl, lcl,
    anomaly: d.raw > ucl || d.raw < lcl ? d.raw : null,
  }))

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 shadow-sm" style={{ border:'1px solid #e5e7eb' }}>
        <div className="p-4 rounded-lg mb-4 text-sm" style={{ backgroundColor:'#eff6ff', color:'#1e40af', border:'1px solid #bfdbfe' }}>
          <strong>How EWMA works:</strong> The Exponentially Weighted Moving Average applies a smoothing factor α to give more weight to recent observations.
          Anomalies are flagged when readings exceed control limits (μ ± 3σ). This catches gradual drift that threshold-only alarms miss.
        </div>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide mr-2" style={{ color:'#6b7280' }}>Parameter</label>
            <select value={param} onChange={e=>setParam(e.target.value)}
              className="text-sm rounded-lg px-3 py-2" style={{ border:'1px solid #e5e7eb', backgroundColor:'#f9fafb' }}>
              {EWMA_PARAMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color:'#6b7280' }}>α (smoothing) = {alpha}</label>
            <input type="range" min="0.1" max="0.5" step="0.05" value={alpha} onChange={e=>setAlpha(+e.target.value)} className="w-32" />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="day" tick={{ fontSize:9, fill:'#9ca3af' }} interval={4} />
            <YAxis tick={{ fontSize:9, fill:'#9ca3af' }} />
            <Tooltip />
            <Area dataKey="ucl" fill="#fee2e2" stroke="none" />
            <Area dataKey="lcl" fill="#fff" stroke="none" />
            <Scatter dataKey="raw" fill="#9ca3af" shape={(p) => <circle cx={p.cx} cy={p.cy} r={2.5} fill={p.anomaly!=null?'#dc2626':'#9ca3af'} />} />
            <Line type="monotone" dataKey="ewma" stroke="#2563eb" strokeWidth={2} dot={false} isAnimationActive={false} />
            <ReferenceLine y={ucl} stroke="#dc2626" strokeDasharray="5 3" label={{ value:'UCL', fontSize:9, fill:'#dc2626' }} />
            <ReferenceLine y={lcl} stroke="#dc2626" strokeDasharray="5 3" label={{ value:'LCL', fontSize:9, fill:'#dc2626' }} />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-2 text-xs" style={{ color:'#6b7280' }}>
          <span className="flex items-center gap-1"><span className="w-4 h-0.5 inline-block" style={{backgroundColor:'#2563eb'}} /> EWMA</span>
          <span className="flex items-center gap-1"><span className="w-4 h-0.5 inline-block border-t-2 border-dashed" style={{borderColor:'#dc2626'}} /> UCL/LCL (μ ± 3σ)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{backgroundColor:'#dc2626'}} /> Anomaly</span>
        </div>
      </div>

      {/* Anomaly table */}
      <div>
        <SectionHeader title="Detected Anomalies" />
        <div className="bg-white rounded-xl shadow-sm overflow-auto" style={{ border:'1px solid #e5e7eb' }}>
          <table className="w-full text-sm">
            <thead style={{ backgroundColor:'#f9fafb' }}>
              <tr>{['Timestamp','Parameter','Observed','EWMA','UCL','Deviation','Severity'].map(h =>
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase" style={{ color:'#6b7280' }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {ewmaAnomalies.map((r, i) => (
                <tr key={i} style={{ backgroundColor: i%2===0?'#fff':'#f9fafb' }}>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color:'#374151' }}>{r.ts}</td>
                  <td className="px-4 py-3" style={{ color:'#374151' }}>{r.param}</td>
                  <td className="px-4 py-3 font-bold" style={{ color:'#1e3a5f' }}>{r.observed}</td>
                  <td className="px-4 py-3" style={{ color:'#6b7280' }}>{r.ewma}</td>
                  <td className="px-4 py-3" style={{ color:'#6b7280' }}>{r.ucl}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: r.level==='critical'?'#dc2626':'#d97706' }}>{r.dev}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: r.level==='critical'?'#fef2f2':'#fffbeb',
                               color: r.level==='critical'?'#dc2626':'#d97706' }}>
                      {r.level === 'critical' ? '🔴 High' : '🟡 Medium'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function PredictivePage() {
  const [tab, setTab] = useState(0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-wrap gap-2 border-b" style={{ borderColor:'#e5e7eb' }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className="px-5 py-3 text-sm font-semibold transition-colors"
            style={{ color: tab===i?'#2563eb':'#6b7280', borderBottom: tab===i?'2px solid #2563eb':'2px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {/* Machine Health */}
      {tab === 0 && (
        <div>
          <SectionHeader title="Equipment Health Scores" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {machineHealth.map(a => <HealthCard key={a.name} asset={a} />)}
          </div>
        </div>
      )}

      {/* Predictive Maintenance */}
      {tab === 1 && (
        <div className="space-y-8">
          <div>
            <SectionHeader title="Remaining Useful Life" />
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-5" style={{ border:'1px solid #e5e7eb' }}>
              {maintenanceItems.map(item => (
                <div key={item.asset}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold" style={{ color:'#1e3a5f' }}>{item.asset}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm" style={{ color: levelColor[item.level] }}>
                        <strong>{item.days}</strong> days remaining
                      </span>
                      <button className="text-xs font-bold px-3 py-1 rounded-lg"
                        style={{ backgroundColor: item.level==='critical'?'#dc2626':item.level==='warning'?'#d97706':'#2563eb',
                                 color:'#fff' }}>
                        {item.level === 'critical' ? 'URGENT ⛔' : item.level === 'warning' ? 'Schedule Now ⚠' : 'Schedule'}
                      </button>
                    </div>
                  </div>
                  <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor:'#e5e7eb' }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width:`${Math.min((item.days/item.max)*100,100)}%`, backgroundColor: levelColor[item.level] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Upcoming Maintenance Schedule" />
            <div className="space-y-3">
              {upcomingEvents.map((e, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ backgroundColor: levelBg[e.level], border:`1px solid ${e.level==='critical'?'#fca5a5':e.level==='warning'?'#fcd34d':'#bfdbfe'}` }}>
                  <Calendar className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: levelColor[e.level] }} />
                  <div>
                    <span className="text-sm font-bold" style={{ color: levelColor[e.level] }}>{e.date}</span>
                    <span className="text-sm font-semibold ml-2" style={{ color:'#111827' }}>{e.asset}</span>
                    <p className="text-sm" style={{ color:'#374151' }}>{e.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Fault Probability — Top 3 At-Risk Components" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {faultProbability.map(f => <FaultGauge key={f.label} label={f.label} pct={f.pct} color={f.color} />)}
            </div>
          </div>
        </div>
      )}

      {/* MTTR / MTBF */}
      {tab === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Fleet Mean MTBF', value:'1,847', unit:'hours' },
              { label:'Fleet Mean MTTR', value:'3.2', unit:'hours' },
              { label:'Fleet Availability', value:'99.83', unit:'%' },
              { label:'Total Downtime (30d)', value:'14.1', unit:'hours' },
            ].map(k => (
              <div key={k.label} className="bg-white rounded-xl p-5 shadow-sm" style={{ border:'1px solid #e5e7eb' }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color:'#6b7280' }}>{k.label}</p>
                <p className="text-3xl font-bold" style={{ color:'#1e3a5f' }}>{k.value}<span className="text-sm ml-1" style={{color:'#9ca3af'}}>{k.unit}</span></p>
              </div>
            ))}
          </div>

          <div>
            <SectionHeader title="MTBF by Asset (hours)" />
            <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border:'1px solid #e5e7eb' }}>
              <div className="space-y-4">
                {mttrData.map(row => (
                  <div key={row.asset}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold" style={{ color:'#1e3a5f' }}>{row.asset}</span>
                      <span style={{ color:'#6b7280' }}>MTBF: <strong>{row.mtbf.toLocaleString()}h</strong> · MTTR: <strong>{row.mttr}h</strong> · Avail: <strong style={{color:'#16a34a'}}>{row.avail}%</strong></span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor:'#e5e7eb' }}>
                      <div className="h-full rounded-full" style={{ width:`${Math.min(row.mtbf/50,100)}%`, backgroundColor:'#2563eb' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <SectionHeader title="Downtime Events — Last 30 Days" />
            <div className="space-y-3">
              {downtimeEvents.map((e, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm flex gap-4" style={{ border:'1px solid #fca5a5' }}>
                  <Activity className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color:'#dc2626' }} />
                  <div>
                    <span className="text-sm font-bold" style={{ color:'#dc2626' }}>{e.date} &nbsp;{e.start}–{e.end}</span>
                    <span className="text-xs ml-2 px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor:'#fef2f2', color:'#dc2626' }}>{e.dur}</span>
                    <p className="text-sm mt-1"><span className="font-semibold">{e.asset}</span> — {e.cause}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EWMA */}
      {tab === 3 && <EwmaTab />}
    </div>
  )
}
