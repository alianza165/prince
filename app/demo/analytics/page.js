'use client'
import { useState, useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'
import { analyticsData, generateHourlyProfile, insights } from '../../../lib/demo-data'
import { TrendingUp, TrendingDown, Minus, AlertCircle, AlertTriangle, Info, DownloadCloud } from 'lucide-react'

const { today, yesterday, sameDayLastWeek, thisWeek, prevMonthSameWeek, powerQuality, phaseBalance } = analyticsData

function delta(a, b) { return +(((a - b) / b) * 100).toFixed(1) }
function DeltaBadge({ pct, invert = false }) {
  const good = invert ? pct < 0 : pct > 0
  const color = pct === 0 ? '#6b7280' : good ? '#16a34a' : '#dc2626'
  const Icon  = pct > 0 ? TrendingUp : pct < 0 ? TrendingDown : Minus
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color }}>
      <Icon className="h-3 w-3" />
      {pct > 0 ? '+' : ''}{pct}% vs yesterday
    </span>
  )
}

function KpiCard({ label, value, unit, delta: d, invert }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm" style={{ border: '1px solid #e5e7eb' }}>
      <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#6b7280' }}>{label}</p>
      <p className="text-3xl font-bold mb-1" style={{ color: '#1e3a5f' }}>
        {value} <span className="text-base font-normal" style={{ color: '#9ca3af' }}>{unit}</span>
      </p>
      <DeltaBadge pct={d} invert={invert} />
    </div>
  )
}

function SectionHeader({ title }) {
  return (
    <div className="rounded-lg px-5 py-3 mb-4" style={{ backgroundColor: '#1e3a5f' }}>
      <h2 className="text-white font-bold text-sm uppercase tracking-wider">{title}</h2>
    </div>
  )
}

function InsightIcon({ level }) {
  if (level === 'critical') return <AlertCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#dc2626' }} />
  if (level === 'warning')  return <AlertTriangle className="h-5 w-5 flex-shrink-0" style={{ color: '#d97706' }} />
  return <Info className="h-5 w-5 flex-shrink-0" style={{ color: '#2563eb' }} />
}

const levelBg = { critical: '#fef2f2', warning: '#fffbeb', info: '#eff6ff' }
const levelBorder = { critical: '#fca5a5', warning: '#fcd34d', info: '#bfdbfe' }

// Semicircular PF Gauge drawn with SVG
function PfGauge({ value }) {
  const pct  = (value - 0.8) / 0.2  // 0.8→1.0 maps to 0→1
  const angle = pct * 180
  const R = 70, cx = 90, cy = 90
  const toXY = (deg) => ({
    x: cx + R * Math.cos(((180 - deg) * Math.PI) / 180),
    y: cy - R * Math.sin(((180 - deg) * Math.PI) / 180),
  })
  const tip = toXY(angle)
  const color = value >= 0.9 ? '#16a34a' : value >= 0.85 ? '#d97706' : '#dc2626'
  return (
    <svg viewBox="0 0 180 100" className="w-48 mx-auto">
      {/* Track */}
      <path d={`M ${cx-R} ${cy} A ${R} ${R} 0 0 1 ${cx+R} ${cy}`} fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
      {/* Green zone */}
      <path d={`M ${toXY(0).x} ${toXY(0).y} A ${R} ${R} 0 0 1 ${toXY(Math.min(angle,180)).x} ${toXY(Math.min(angle,180)).y}`}
        fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" />
      {/* Needle */}
      <line x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="#1e3a5f" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4" fill="#1e3a5f" />
      {/* Value */}
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="18" fontWeight="bold" fill={color}>{value}</text>
      <text x={cx} y={cy + 30} textAnchor="middle" fontSize="8" fill="#9ca3af">POWER FACTOR</text>
    </svg>
  )
}

export default function AnalyticsPage() {
  const [hourly] = useState(() => generateHourlyProfile())
  const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  const handlePDF = useCallback(async () => {
    const { jsPDF } = await import('jspdf')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const W = 210, blue = [30, 58, 95], gray = [107, 114, 128], light = [249, 250, 251]

    // Header
    pdf.setFillColor(...blue); pdf.rect(0, 0, W, 22, 'F')
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(13); pdf.setFont(undefined, 'bold')
    pdf.text('EnergyOS — Live Energy Insights Report', 14, 10)
    pdf.setFontSize(8); pdf.setFont(undefined, 'normal')
    pdf.text(`Generated: ${new Date().toLocaleDateString('en-GB')} · ${now} PKT  |  Device: Main Incomer`, 14, 17)

    // KPI boxes
    const kpis = [
      { l: 'Energy Today', v: '1,842 kWh' }, { l: 'Mean Demand', v: '287 kW' },
      { l: 'Peak Demand',  v: '342 kW'    }, { l: 'Power Factor', v: '0.912' },
    ]
    pdf.setFillColor(...light); pdf.rect(10, 26, W - 20, 28, 'F')
    kpis.forEach((k, i) => {
      const x = 14 + i * 47
      pdf.setTextColor(...gray); pdf.setFontSize(7); pdf.setFont(undefined, 'normal')
      pdf.text(k.l.toUpperCase(), x, 34)
      pdf.setTextColor(...blue); pdf.setFontSize(14); pdf.setFont(undefined, 'bold')
      pdf.text(k.v, x, 44)
    })

    // Comparison table
    let y = 62
    pdf.setFillColor(...blue); pdf.rect(10, y, W - 20, 7, 'F')
    pdf.setTextColor(255,255,255); pdf.setFontSize(8); pdf.setFont(undefined,'bold')
    pdf.text('ELECTRICITY COMPARISONS', 14, y + 5)
    y += 10
    const rows = [
      ['Energy (kWh)', '1,842', '1,798', '1,901', '+2.4%', '−3.1%'],
      ['Peak Demand (kW)', '342', '318', '355', '+7.5%', '−3.7%'],
      ['Mean Power (kW)', '287', '281', '294', '+2.1%', '−2.4%'],
      ['Power Factor', '0.912', '0.904', '0.891', '+0.9%', '+2.4%'],
    ]
    const cols = [50, 25, 25, 35, 25, 25]
    const headers = ['Metric', 'Today', 'Yesterday', 'Same Day Last Wk', 'vs Yday', 'vs Lst Wk']
    pdf.setFontSize(7); pdf.setFont(undefined,'bold'); pdf.setTextColor(60,60,60)
    headers.forEach((h, i) => pdf.text(h, 14 + cols.slice(0, i).reduce((a,b)=>a+b,0), y))
    y += 5
    rows.forEach((row, ri) => {
      pdf.setFillColor(ri%2===0 ? 255:245,ri%2===0?255:247,ri%2===0?255:250)
      pdf.rect(10, y-4, W-20, 7, 'F')
      pdf.setFont(undefined,'normal'); pdf.setTextColor(40,40,40)
      row.forEach((cell, i) => pdf.text(cell, 14 + cols.slice(0,i).reduce((a,b)=>a+b,0), y))
      y += 7
    })

    // Power quality
    y += 6
    pdf.setFillColor(...blue); pdf.rect(10, y, W-20, 7, 'F')
    pdf.setTextColor(255,255,255); pdf.setFont(undefined,'bold')
    pdf.text('POWER QUALITY & PHASE BALANCE', 14, y+5)
    y += 12
    pdf.setTextColor(40,40,40); pdf.setFont(undefined,'normal'); pdf.setFontSize(8)
    pdf.text(`Power Factor: ${powerQuality.pf}  |  Active Power: ${powerQuality.activePower} kW  |  Apparent Power: ${powerQuality.apparentPower} kVA  |  Status: GOOD`, 14, y)
    y += 8
    pdf.text(`Phase Balance — L1: ${phaseBalance.l1}A  L2: ${phaseBalance.l2}A  L3: ${phaseBalance.l3}A  Imbalance: ${phaseBalance.imbalance}%  Status: GOOD`, 14, y)

    // Insights
    y += 14
    pdf.setFillColor(...blue); pdf.rect(10, y, W-20, 7, 'F')
    pdf.setTextColor(255,255,255); pdf.setFont(undefined,'bold')
    pdf.text('KEY INSIGHTS & RECOMMENDATIONS', 14, y+5)
    y += 12
    insights.forEach(ins => {
      if (y > 270) { pdf.addPage(); y = 20 }
      const c = ins.level==='critical'?[220,38,38]:ins.level==='warning'?[217,119,6]:[37,99,235]
      pdf.setTextColor(...c); pdf.setFont(undefined,'bold'); pdf.setFontSize(8)
      pdf.text(`[${ins.tag.toUpperCase()}] ${ins.title}`, 14, y)
      y += 5
      pdf.setTextColor(80,80,80); pdf.setFont(undefined,'normal'); pdf.setFontSize(7)
      const lines = pdf.splitTextToSize(ins.body, W - 28)
      pdf.text(lines, 14, y); y += lines.length * 4 + 4
    })

    // Footer
    pdf.setFillColor(245,245,245); pdf.rect(0, 285, W, 12, 'F')
    pdf.setTextColor(...gray); pdf.setFontSize(7); pdf.setFont(undefined,'normal')
    pdf.text('Data source: EnergyOS Demo · All comparisons use same elapsed-time windows · Prince Electric', 14, 291)

    pdf.save('EnergyOS-Report.pdf')
  }, [now])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Header strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-xl p-5 shadow-sm" style={{ border: '1px solid #e5e7eb' }}>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>Live Energy Insights</h1>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            Comparisons auto-calculated · Data cutoff: {now} PKT
          </p>
        </div>
        <button onClick={handlePDF} className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm"
          style={{ backgroundColor: '#2563eb', color: '#fff' }}>
          <DownloadCloud className="h-4 w-4" /> Download PDF Report
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Energy Today" value="1,842" unit="kWh" delta={delta(today.energy, yesterday.energy)} invert />
        <KpiCard label="Mean Demand"  value="287.4" unit="kW"  delta={delta(today.meanPower, yesterday.meanPower)} invert />
        <KpiCard label="Peak Demand"  value="342.1" unit="kW"  delta={delta(today.peakPower, yesterday.peakPower)} invert />
        <KpiCard label="Power Factor" value="0.912" unit=""    delta={delta(today.pf, yesterday.pf)} />
      </div>

      {/* Comparison tables */}
      <div>
        <SectionHeader title="Electricity Comparisons" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today vs yesterday */}
          <div className="bg-white rounded-xl shadow-sm overflow-auto" style={{ border:'1px solid #e5e7eb' }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>{['Metric','Today','Yesterday','Same Day Last Wk','Trend'].map(h =>
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color:'#6b7280' }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {[
                  ['Energy (kWh)', '1,842','1,798','1,901', {a:2.4,b:-3.1}],
                  ['Peak Demand (kW)', '342','318','355', {a:7.5,b:-3.7}],
                  ['Mean Power (kW)', '287','281','294', {a:2.1,b:-2.4}],
                  ['Power Factor', '0.912','0.904','0.891', {a:0.9,b:2.4}],
                ].map(([m,t,y,w,d],i) => (
                  <tr key={m} style={{ backgroundColor: i%2===0?'#fff':'#f9fafb' }}>
                    <td className="px-4 py-3 font-medium" style={{ color:'#111827' }}>{m}</td>
                    <td className="px-4 py-3 font-bold" style={{ color:'#1e3a5f' }}>{t}</td>
                    <td className="px-4 py-3" style={{ color:'#6b7280' }}>{y}</td>
                    <td className="px-4 py-3" style={{ color:'#6b7280' }}>{w}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold" style={{ color: d.a>=0 ? '#dc2626':'#16a34a' }}>{d.a>=0?'+':''}{d.a}%</span>
                      <span className="text-xs mx-1" style={{color:'#d1d5db'}}>/</span>
                      <span className="text-xs font-semibold" style={{ color: d.b<=0 ? '#16a34a':'#dc2626' }}>{d.b>0?'+':''}{d.b}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* This week vs prev month */}
          <div className="bg-white rounded-xl shadow-sm overflow-auto" style={{ border:'1px solid #e5e7eb' }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor:'#f9fafb' }}>
                <tr>{['Metric','This Week','Ref Week (prev month)','Change'].map(h =>
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color:'#6b7280' }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {[
                  ['Total Energy','8,420 kWh','9,104 kWh','−7.5% ✓','good'],
                  ['Peak Demand','342 kW','371 kW','−7.8% ✓','good'],
                  ['Avg Power Factor','0.912','0.880','+3.4% ✓','good'],
                ].map(([m,tw,rw,ch,level],i) => (
                  <tr key={m} style={{ backgroundColor: i%2===0?'#fff':'#f9fafb' }}>
                    <td className="px-4 py-3 font-medium" style={{ color:'#111827' }}>{m}</td>
                    <td className="px-4 py-3 font-bold" style={{ color:'#1e3a5f' }}>{tw}</td>
                    <td className="px-4 py-3" style={{ color:'#6b7280' }}>{rw}</td>
                    <td className="px-4 py-3 font-bold text-sm" style={{ color:'#16a34a' }}>{ch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Power Quality + Phase Balance */}
      <div>
        <SectionHeader title="Power Quality & Phase Balance" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* PF Gauge */}
          <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border:'1px solid #e5e7eb' }}>
            <h3 className="font-bold mb-4" style={{ color:'#1e3a5f' }}>Power Factor Status</h3>
            <PfGauge value={powerQuality.pf} />
            <div className="mt-4 flex justify-center gap-3 text-xs">
              {[['Good','#16a34a','≥ 0.90'],['Warning','#d97706','0.85–0.90'],['Critical','#dc2626','< 0.85']].map(([l,c,r]) => (
                <span key={l} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor:c}}/>
                  <span style={{color:'#6b7280'}}>{l} ({r})</span>
                </span>
              ))}
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1" style={{ color:'#6b7280' }}>
                <span>Active Power</span><span>Reactive component</span>
              </div>
              <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor:'#e5e7eb' }}>
                <div className="h-full rounded-full" style={{ width:`${(powerQuality.activePower/powerQuality.apparentPower*100).toFixed(0)}%`, backgroundColor:'#2563eb' }} />
              </div>
              <div className="flex justify-between text-xs mt-1" style={{ color:'#6b7280' }}>
                <span>{powerQuality.activePower} kW active</span>
                <span>{powerQuality.apparentPower} kVA apparent</span>
              </div>
            </div>
            <p className="mt-4 text-xs italic" style={{ color:'#6b7280' }}>{powerQuality.note}</p>
          </div>

          {/* Phase Balance */}
          <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border:'1px solid #e5e7eb' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color:'#1e3a5f' }}>Phase Balance</h3>
              <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor:'#dcfce7', color:'#16a34a' }}>GOOD</span>
            </div>
            {[['L1', phaseBalance.l1],['L2', phaseBalance.l2],['L3', phaseBalance.l3]].map(([phase, amps]) => {
              const mean = (phaseBalance.l1+phaseBalance.l2+phaseBalance.l3)/3
              const pct = (amps/Math.max(phaseBalance.l1,phaseBalance.l2,phaseBalance.l3))*100
              return (
                <div key={phase} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold" style={{ color:'#1e3a5f' }}>{phase}</span>
                    <span style={{ color:'#374151' }}>{amps} A &nbsp;<span style={{color:'#9ca3af',fontSize:'11px'}}>{((amps-mean)/mean*100).toFixed(1)}% vs mean</span></span>
                  </div>
                  <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor:'#e5e7eb' }}>
                    <div className="h-full rounded-full transition-all" style={{ width:`${pct}%`, backgroundColor:'#2563eb' }} />
                  </div>
                </div>
              )
            })}
            <div className="mt-2 p-3 rounded-lg text-sm" style={{ backgroundColor:'#f0fdf4', color:'#166534' }}>
              Imbalance: <strong>{phaseBalance.imbalance}%</strong> — {phaseBalance.note}
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Load Profile */}
      <div>
        <SectionHeader title="Hourly Load Profile — Today vs Yesterday" />
        <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border:'1px solid #e5e7eb' }}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={hourly} barGap={2} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill:'#9ca3af' }} interval={2} />
              <YAxis tick={{ fontSize: 10, fill:'#9ca3af' }} unit=" kWh" />
              <Tooltip formatter={(v, n) => [`${v} kWh`, n === 'today' ? 'Today' : 'Yesterday']} />
              <Legend formatter={v => v === 'today' ? 'Today' : 'Yesterday'} />
              <Bar dataKey="today"     fill="#2563eb" radius={[3,3,0,0]} />
              <Bar dataKey="yesterday" fill="#93c5fd" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div>
        <SectionHeader title="Key Insights & Alerts" />
        <div className="space-y-3">
          {insights.map((ins, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-xl"
              style={{ backgroundColor: levelBg[ins.level], border: `1px solid ${levelBorder[ins.level]}` }}>
              <InsightIcon level={ins.level} />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded"
                    style={{ backgroundColor: ins.level==='critical'?'#fca5a5':ins.level==='warning'?'#fcd34d':'#bfdbfe',
                             color: ins.level==='critical'?'#7f1d1d':ins.level==='warning'?'#451a03':'#1e3a8a' }}>
                    {ins.tag}
                  </span>
                  <span className="font-bold text-sm" style={{ color:'#111827' }}>{ins.title}</span>
                </div>
                <p className="text-sm" style={{ color:'#374151' }}>{ins.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
