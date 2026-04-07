'use client'
import { useState } from 'react'
import { configuredDevices, registerMap } from '../../../lib/demo-data'
import { CheckCircle, AlertTriangle, Settings, Database, Wifi, WifiOff } from 'lucide-react'

const statusMeta = {
  online:   { label:'Online',   color:'#16a34a', bg:'#dcfce7', icon: <Wifi className="h-3 w-3" /> },
  degraded: { label:'Degraded', color:'#d97706', bg:'#fef3c7', icon: <AlertTriangle className="h-3 w-3" /> },
  offline:  { label:'Offline',  color:'#dc2626', bg:'#fee2e2', icon: <WifiOff className="h-3 w-3" /> },
}

export default function ConfigPage() {
  const [selected, setSelected] = useState(configuredDevices[0])
  const [tab,      setTab]      = useState('config')
  const [editing,  setEditing]  = useState(false)
  const [toast,    setToast]    = useState(null)
  const [showAll,  setShowAll]  = useState(false)

  const testConnection = () => {
    setToast({ type:'loading', msg:'Testing connection…' })
    setTimeout(() => {
      setToast({ type:'success', msg:`✓ Connection to "${selected.name}" successful. Response: 45 ms.` })
      setTimeout(() => setToast(null), 4000)
    }, 1500)
  }

  const registers = showAll ? registerMap : registerMap.slice(0, 12)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Device list */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ border:'1px solid #e5e7eb' }}>
            <div className="px-5 py-4" style={{ backgroundColor:'#1e3a5f' }}>
              <h2 className="text-white font-bold text-sm uppercase tracking-wide">Configured Devices</h2>
              <p className="text-xs mt-0.5" style={{ color:'#93c5fd' }}>{configuredDevices.length} devices registered</p>
            </div>
            <div className="divide-y" style={{ borderColor:'#f3f4f6' }}>
              {configuredDevices.map(dev => {
                const s = statusMeta[dev.status]
                return (
                  <button key={dev.id} onClick={() => { setSelected(dev); setEditing(false); setTab('config') }}
                    className="w-full text-left px-5 py-4 transition-colors"
                    style={{ backgroundColor: selected.id===dev.id ? '#eff6ff' : '#fff' }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold" style={{ color:'#1e3a5f' }}>{dev.name}</p>
                        <p className="text-xs mt-0.5" style={{ color:'#9ca3af' }}>{dev.type}</p>
                        <p className="text-xs mt-0.5 font-mono" style={{ color:'#6b7280' }}>{dev.port}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor:s.bg, color:s.color }}>
                        {s.icon} {s.label}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div className="flex-grow">
          {toast && (
            <div className="mb-4 px-5 py-3 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: toast.type==='success'?'#dcfce7':'#eff6ff',
                       color: toast.type==='success'?'#166534':'#1e40af',
                       border: `1px solid ${toast.type==='success'?'#86efac':'#bfdbfe'}` }}>
              {toast.msg}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ border:'1px solid #e5e7eb' }}>
            {/* Device header */}
            <div className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor:'#f9fafb', borderBottom:'1px solid #e5e7eb' }}>
              <div>
                <h2 className="font-bold" style={{ color:'#1e3a5f' }}>{selected.name}</h2>
                <p className="text-xs" style={{ color:'#9ca3af' }}>{selected.type} · {selected.protocol}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setTab('config')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  style={{ backgroundColor: tab==='config'?'#1e3a5f':'transparent', color: tab==='config'?'#fff':'#6b7280', border:'1px solid #e5e7eb' }}>
                  <Settings className="h-4 w-4" /> Configuration
                </button>
                <button onClick={() => setTab('registers')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  style={{ backgroundColor: tab==='registers'?'#1e3a5f':'transparent', color: tab==='registers'?'#fff':'#6b7280', border:'1px solid #e5e7eb' }}>
                  <Database className="h-4 w-4" /> Register Map
                </button>
              </div>
            </div>

            {/* Config tab */}
            {tab === 'config' && (
              <div className="p-6">
                <div className="flex justify-end mb-4">
                  <button onClick={() => setEditing(!editing)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: editing?'#dc2626':'#2563eb', color:'#fff' }}>
                    {editing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label:'Device Name',   value: selected.name },
                    { label:'Device Type',   value: selected.type },
                    { label:'Protocol',      value: selected.protocol },
                    { label:'Port / Address',value: selected.port },
                    { label:'Baud Rate',     value: '9600' },
                    { label:'Parity',        value: 'None' },
                    { label:'Stop Bits',     value: '1' },
                    { label:'Slave Address', value: selected.id.toString() },
                    { label:'Poll Interval', value: '5 seconds' },
                    { label:'Location',      value: 'Main Switchroom' },
                    { label:'Active',        value: 'Yes' },
                  ].map(field => (
                    <div key={field.label}>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1" style={{ color:'#6b7280' }}>{field.label}</label>
                      {editing ? (
                        <input defaultValue={field.value}
                          className="w-full px-3 py-2 rounded-lg text-sm"
                          style={{ border:'1px solid #2563eb', outline:'none', backgroundColor:'#eff6ff' }} />
                      ) : (
                        <div className="px-3 py-2 rounded-lg text-sm" style={{ backgroundColor:'#f9fafb', color:'#374151', border:'1px solid #e5e7eb' }}>
                          {field.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={testConnection}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor:'#1e3a5f', color:'#fff' }}>
                    <Wifi className="h-4 w-4" /> Test Connection
                  </button>
                  {editing && (
                    <button onClick={() => { setEditing(false); setToast({ type:'success', msg:'Changes saved successfully.' }); setTimeout(()=>setToast(null),3000) }}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold"
                      style={{ backgroundColor:'#16a34a', color:'#fff' }}>
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Register map tab */}
            {tab === 'registers' && (
              <div className="p-6">
                <p className="text-sm mb-4" style={{ color:'#6b7280' }}>
                  Modbus register map for <strong>{selected.name}</strong>. Showing {registers.length} of {registerMap.length} registers.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead style={{ backgroundColor:'#f9fafb' }}>
                      <tr>{['#','Reg Addr','Parameter','Type','Scale','Unit','Category','Active'].map(h =>
                        <th key={h} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color:'#6b7280' }}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {registers.map((r, i) => (
                        <tr key={r.n} style={{ backgroundColor: i%2===0?'#fff':'#f9fafb' }}>
                          <td className="px-3 py-2.5 text-xs" style={{ color:'#9ca3af' }}>{r.n}</td>
                          <td className="px-3 py-2.5 font-mono text-xs font-semibold" style={{ color:'#2563eb' }}>{r.addr}</td>
                          <td className="px-3 py-2.5 text-sm font-medium" style={{ color:'#1e3a5f' }}>{r.param}</td>
                          <td className="px-3 py-2.5 font-mono text-xs" style={{ color:'#6b7280' }}>{r.dtype}</td>
                          <td className="px-3 py-2.5 text-xs" style={{ color:'#6b7280' }}>{r.scale}</td>
                          <td className="px-3 py-2.5 text-xs font-semibold" style={{ color:'#374151' }}>{r.unit || '—'}</td>
                          <td className="px-3 py-2.5">
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor:'#eff6ff', color:'#1d4ed8' }}>{r.cat}</span>
                          </td>
                          <td className="px-3 py-2.5">
                            {r.active && <CheckCircle className="h-4 w-4" style={{ color:'#16a34a' }} />}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {!showAll && (
                  <button onClick={() => setShowAll(true)}
                    className="mt-4 text-sm font-semibold" style={{ color:'#2563eb' }}>
                    Show all {registerMap.length} registers ↓
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
