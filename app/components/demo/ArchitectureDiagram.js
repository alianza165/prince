'use client'
import { useState } from 'react'
import { Zap, Wifi, Cloud, Monitor, ChevronDown, ChevronUp, Server } from 'lucide-react'

const zones = [
  {
    id: 'main',
    label: 'Zone 1 — Main Incomer',
    color: '#1e3a5f',
    bg: '#eff6ff',
    border: '#bfdbfe',
    meters: [
      { type: 'Energy Analyzer', model: 'Mitsubishi ME96SS-Ver.B', protocol: 'Modbus RTU' },
      { type: 'Energy Analyzer', model: 'Mitsubishi EMU4-FD2-MB',  protocol: 'Modbus RTU' },
    ],
  },
  {
    id: 'prod',
    label: 'Zone 2 — Production Floor',
    color: '#065f46',
    bg: '#f0fdf4',
    border: '#86efac',
    meters: [
      { type: 'Energy Analyzer', model: 'Mitsubishi EMU4-FD2-MB',  protocol: 'Modbus RTU' },
      { type: 'Energy Analyzer', model: 'Mitsubishi EMU4-FD2-MB',  protocol: 'Modbus RTU' },
      { type: 'Flow Meter',      model: 'Analog → RS485 Module',    protocol: 'Modbus RTU' },
    ],
  },
  {
    id: 'hvac',
    label: 'Zone 3 — HVAC / Utilities',
    color: '#7c2d12',
    bg: '#fff7ed',
    border: '#fdba74',
    meters: [
      { type: 'Energy Analyzer', model: 'Mitsubishi EMU4-FD2-MB',  protocol: 'Modbus TCP'  },
      { type: 'Flow Meter',      model: 'Analog → RS485 Module',    protocol: 'Modbus RTU' },
    ],
  },
]

const outputs = [
  { icon: <Monitor className="h-5 w-5" />, label: 'Web Dashboard', desc: 'Real-time gauges, charts, heatmaps', color: '#2563eb' },
  { icon: <Server className="h-5 w-5" />,  label: 'ERP / API',     desc: 'REST endpoints: daily kWh, peaks, alerts', color: '#7c3aed' },
  { icon: <Cloud className="h-5 w-5" />,   label: 'PDF Reports',   desc: 'Auto-generated energy reports', color: '#059669' },
]

function MeterIcon({ type }) {
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
      <rect x="4" y="8" width="32" height="24" rx="3" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="9" y="14" width="22" height="10" rx="1.5" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="14" cy="19" r="2" fill="currentColor"/>
      <circle cx="20" cy="19" r="2" fill="currentColor"/>
      <circle cx="26" cy="19" r="2" fill="currentColor"/>
      <rect x="16" y="26" width="8" height="2" rx="1" fill="currentColor"/>
    </svg>
  )
}

function ArrowDown({ color = '#94a3b8', dashed = false }) {
  return (
    <div className="flex flex-col items-center my-1">
      <div style={{ width: '2px', height: '28px', backgroundColor: dashed ? 'transparent' : color,
        backgroundImage: dashed ? `repeating-linear-gradient(to bottom, ${color} 0, ${color} 5px, transparent 5px, transparent 10px)` : 'none' }} />
      <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 6 5-6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
    </div>
  )
}

export default function ArchitectureDiagram() {
  const [expanded, setExpanded] = useState(null)
  const [activeZone, setActiveZone] = useState(null)

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#0f172a' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor:'rgba(37,99,235,0.2)', color:'#60a5fa', border:'1px solid rgba(37,99,235,0.4)' }}>
            System Architecture
          </span>
          <h2 className="text-3xl font-bold text-white mb-3">What You Get — End to End</h2>
          <p style={{ color:'#94a3b8' }}>From individual meters on your machines to a unified cloud dashboard. Click any layer to learn more.</p>
        </div>

        {/* ── Flow diagram ──────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-0">

          {/* Layer 1: Field Zones */}
          <div className="w-full">
            <p className="text-center text-xs font-semibold uppercase tracking-widest mb-4" style={{ color:'#475569' }}>
              Layer 1 — Field Measurement Devices
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {zones.map(zone => (
                <div key={zone.id}
                  className="rounded-xl p-5 cursor-pointer transition-all"
                  style={{ backgroundColor: activeZone===zone.id ? zone.bg : '#1e293b',
                           border: `2px solid ${activeZone===zone.id ? zone.border : '#334155'}` }}
                  onClick={() => setActiveZone(activeZone===zone.id ? null : zone.id)}>
                  <p className="text-sm font-bold mb-3" style={{ color: activeZone===zone.id ? zone.color : '#e2e8f0' }}>
                    {zone.label}
                  </p>
                  <div className="space-y-2">
                    {zone.meters.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg"
                        style={{ backgroundColor: activeZone===zone.id ? 'rgba(255,255,255,0.7)' : '#0f172a' }}>
                        <div style={{ color: activeZone===zone.id ? zone.color : '#60a5fa' }}>
                          <MeterIcon type={m.type} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: activeZone===zone.id ? zone.color : '#e2e8f0' }}>{m.type}</p>
                          <p className="text-xs" style={{ color: activeZone===zone.id ? '#374151' : '#64748b' }}>{m.model}</p>
                          <span className="text-xs px-1.5 py-0.5 rounded font-mono"
                            style={{ backgroundColor: activeZone===zone.id?zone.color:'#1d4ed8', color:'#fff', fontSize:'10px' }}>
                            {m.protocol}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow down: RS485 */}
          <div className="flex flex-col items-center my-2">
            <div className="flex gap-32">
              <ArrowDown color="#2563eb" dashed />
              <ArrowDown color="#059669" dashed />
              <ArrowDown color="#d97706" dashed />
            </div>
            <div className="flex gap-2 items-center px-4 py-1.5 rounded-full mt-1"
              style={{ backgroundColor:'#1e293b', border:'1px solid #334155' }}>
              <Wifi className="h-3 w-3" style={{ color:'#60a5fa' }} />
              <span className="text-xs font-mono" style={{ color:'#94a3b8' }}>RS485 / Modbus RTU · Modbus TCP · up to 247 devices per bus</span>
            </div>
          </div>

          {/* Layer 2: DataBridge Gateway */}
          <div className="w-full max-w-sm">
            <p className="text-center text-xs font-semibold uppercase tracking-widest mb-3" style={{ color:'#475569' }}>
              Layer 2 — DataBridge Gateway
            </p>
            <div className="rounded-xl p-6 cursor-pointer transition-all"
              style={{ backgroundColor: expanded==='gateway'?'#eff6ff':'#1e293b',
                       border: `2px solid ${expanded==='gateway'?'#2563eb':'#334155'}` }}
              onClick={() => setExpanded(expanded==='gateway'?null:'gateway')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: expanded==='gateway'?'#dbeafe':'#0f172a' }}>
                    <Server className="h-6 w-6" style={{ color: expanded==='gateway'?'#1d4ed8':'#60a5fa' }} />
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: expanded==='gateway'?'#1e3a5f':'#e2e8f0' }}>DataBridge Hardware</p>
                    <p className="text-xs" style={{ color: expanded==='gateway'?'#374151':'#64748b' }}>Plug & Play · LAN / Ethernet</p>
                  </div>
                </div>
                {expanded==='gateway'
                  ? <ChevronUp className="h-4 w-4" style={{ color:'#6b7280' }} />
                  : <ChevronDown className="h-4 w-4" style={{ color:'#475569' }} />}
              </div>
              {expanded === 'gateway' && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    ['Connection','RS485 + Ethernet'],['Protocols','Modbus RTU/TCP'],
                    ['Setup','Plug & Play — no specialist needed'],['Brands','Preconfigured for all major meters'],
                    ['Backup','Cloud config + raw data backup'],['Scale','1 device to multi-site'],
                  ].map(([k,v]) => (
                    <div key={k} className="p-2 rounded-lg" style={{ backgroundColor:'#f9fafb' }}>
                      <p className="text-xs font-semibold" style={{ color:'#1e3a5f' }}>{k}</p>
                      <p className="text-xs" style={{ color:'#374151' }}>{v}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Arrow: Ethernet → Cloud */}
          <div className="flex flex-col items-center my-2">
            <ArrowDown color="#2563eb" />
            <div className="flex gap-2 items-center px-4 py-1.5 rounded-full mt-1"
              style={{ backgroundColor:'#1e293b', border:'1px solid #334155' }}>
              <Cloud className="h-3 w-3" style={{ color:'#60a5fa' }} />
              <span className="text-xs font-mono" style={{ color:'#94a3b8' }}>HTTPS / MQTT · encrypted · AWS cloud</span>
            </div>
          </div>

          {/* Layer 3: AWS Cloud */}
          <div className="w-full max-w-sm">
            <p className="text-center text-xs font-semibold uppercase tracking-widest mb-3" style={{ color:'#475569' }}>
              Layer 3 — Cloud Infrastructure
            </p>
            <div className="rounded-xl p-6 cursor-pointer transition-all"
              style={{ backgroundColor: expanded==='cloud'?'#f5f3ff':'#1e293b',
                       border:`2px solid ${expanded==='cloud'?'#7c3aed':'#334155'}` }}
              onClick={() => setExpanded(expanded==='cloud'?null:'cloud')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: expanded==='cloud'?'#ede9fe':'#0f172a' }}>
                    <Cloud className="h-6 w-6" style={{ color: expanded==='cloud'?'#7c3aed':'#a78bfa' }} />
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: expanded==='cloud'?'#4c1d95':'#e2e8f0' }}>AWS Cloud (EC2 + S3 + Route53)</p>
                    <p className="text-xs" style={{ color: expanded==='cloud'?'#374151':'#64748b' }}>Persistent storage · API server · backups</p>
                  </div>
                </div>
                {expanded==='cloud'
                  ? <ChevronUp className="h-4 w-4" style={{ color:'#6b7280' }} />
                  : <ChevronDown className="h-4 w-4" style={{ color:'#475569' }} />}
              </div>
              {expanded === 'cloud' && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    ['EC2','Application + API server'],['S3','Raw data + config backups'],
                    ['Route 53','DNS + failover routing'],['API','REST endpoints for ERP integration'],
                    ['Retention','All historical data preserved'],['Redundancy','Auto-recovery from device failure'],
                  ].map(([k,v]) => (
                    <div key={k} className="p-2 rounded-lg" style={{ backgroundColor:'#f9fafb' }}>
                      <p className="text-xs font-semibold" style={{ color:'#4c1d95' }}>{k}</p>
                      <p className="text-xs" style={{ color:'#374151' }}>{v}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Arrow */}
          <ArrowDown color="#059669" />

          {/* Layer 4: Outputs */}
          <div className="w-full">
            <p className="text-center text-xs font-semibold uppercase tracking-widest mb-4" style={{ color:'#475569' }}>
              Layer 4 — What You See & Use
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {outputs.map(o => (
                <div key={o.label} className="rounded-xl p-5 text-center"
                  style={{ backgroundColor:'#1e293b', border:'1px solid #334155' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor:`${o.color}20`, color:o.color }}>
                    {o.icon}
                  </div>
                  <p className="font-bold text-sm mb-1" style={{ color:'#e2e8f0' }}>{o.label}</p>
                  <p className="text-xs" style={{ color:'#64748b' }}>{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOQ strip */}
        <div className="mt-12 rounded-xl p-6" style={{ backgroundColor:'#1e293b', border:'1px solid #334155' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color:'#475569' }}>
            Typical Bill of Materials — Medium Manufacturing Facility
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { item:'Energy Analyzers', qty:'10–50', note:'1 per circuit / machine' },
              { item:'DataBridge Gateway', qty:'1–5', note:'1 per zone / building' },
              { item:'RS485 Modules', qty:'As required', note:'For analog sensors' },
              { item:'Cloud Server', qty:'1', note:'Shared across all sites' },
            ].map(r => (
              <div key={r.item} className="p-4 rounded-lg" style={{ backgroundColor:'#0f172a' }}>
                <p className="text-sm font-bold" style={{ color:'#60a5fa' }}>{r.qty}</p>
                <p className="text-sm font-semibold" style={{ color:'#e2e8f0' }}>{r.item}</p>
                <p className="text-xs" style={{ color:'#64748b' }}>{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
