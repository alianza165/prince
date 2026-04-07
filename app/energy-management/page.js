import Link from 'next/link'
import { TrendingUp, Eye, AlertTriangle, FileText, Activity, Target, Shield, Plug, ArrowRight, Zap, BarChart2, Bell } from 'lucide-react'
import ArchitectureDiagram from '../components/demo/ArchitectureDiagram'

const challenges = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Rising Energy Costs',
    desc: "Your second-largest expense — growing 10–20% yearly without warning. Rising tariffs compound the pain.",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: 'Lack of Visibility',
    desc: 'Monthly bills show what you spent, never where or why. You cannot reduce what you cannot see.',
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Hidden Energy Waste',
    desc: '30% of industrial energy vanishes through unseen inefficiencies daily — idle machines, vampiric loads, scheduling waste.',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Compliance Burden',
    desc: 'Manual sustainability reporting drains staff time and introduces costly errors when it matters most.',
  },
]

const useCases = [
  {
    number: '01',
    icon: <Target className="h-6 w-6" />,
    title: 'Targeted Consumption Reduction',
    color: '#2563eb',
    desc: 'Use real benchmarks to set realistic reduction goals — e.g., "Reduce HVAC consumption by 15%." Tactics: load shifting, equipment upgrades, scheduling changes.',
    example: '"Line 3 consumes 30% more than the department benchmark during night shifts."',
  },
  {
    number: '02',
    icon: <Activity className="h-6 w-6" />,
    title: 'Predictive Maintenance',
    color: '#dc2626',
    desc: 'Track motor amperage trends — not just anomalies. A 10% sustained rise in average amperage signals bearing degradation. Schedule maintenance before the failure, not after.',
    example: '"Motor 4B amperage trending +12% over 3 weeks → bearing inspection scheduled."',
  },
  {
    number: '03',
    icon: <Bell className="h-6 w-6" />,
    title: 'Accountability & Forecasting',
    color: '#059669',
    desc: 'If the monthly bill spikes, trace it to the exact shift, department, or machine where consumption increased. Alerts fire automatically when outliers are detected.',
    example: '"Bill 22% above forecast — traced to Compressor Room, 2nd shift, 3-day window."',
  },
]

const techSpecs = [
  { icon: <Plug className="h-5 w-5" />, label: 'Plug & Play Installation', desc: 'Power on, connect RS485 or Ethernet, link to LAN. No specialist commissioning required.' },
  { icon: <Shield className="h-5 w-5" />, label: 'Open Protocols', desc: 'Modbus, BACnet, MQTT — works with your existing infrastructure and metering.' },
  { icon: <BarChart2 className="h-5 w-5" />, label: 'Scalable Architecture', desc: 'Start with a single machine or line. Scale to multi-site, multi-building — same platform.' },
  { icon: <Zap className="h-5 w-5" />, label: 'Preconfigured Meter Support', desc: 'Factory-loaded profiles for Mitsubishi and all major energy meter brands. Zero configuration.' },
  { icon: <Activity className="h-5 w-5" />, label: 'AWS Cloud Backend', desc: 'Automated cloud backup of configuration and raw data. System resumes from any failure point.' },
  { icon: <FileText className="h-5 w-5" />, label: 'ERP Integration', desc: 'Data available as API endpoints — daily kWh, best-performing department, electricity saved this week.' },
]

export default function EnergyManagementPage() {
  return (
    <div style={{ fontFamily: 'Eurostile' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 px-4" style={{ backgroundColor: '#0f172a' }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 60% 50%, #2563eb 0%, transparent 65%)' }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(5,150,105,0.2)', color: '#34d399', border: '1px solid rgba(5,150,105,0.4)' }}
          >
            <Zap className="h-3 w-3" /> DataBridge by Prince Electric
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Smart Energy Management:<br />
            <span style={{ color: '#34d399' }}>From Monitoring to Cost Savings</span>
          </h1>
          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: '#94a3b8' }}>
            A data-driven approach to reduce energy costs in commercial and industrial facilities. Know exactly where your energy goes — then act on it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact-us"
              className="px-8 py-3.5 rounded-md font-semibold text-sm"
              style={{ backgroundColor: '#059669', color: '#ffffff' }}
            >
              Request a Free Energy Audit
            </Link>
            <Link
              href="/contact-us"
              className="px-8 py-3.5 rounded-md font-semibold text-sm border"
              style={{ backgroundColor: 'transparent', color: '#e2e8f0', borderColor: 'rgba(255,255,255,0.25)' }}
            >
              Start a Pilot Program
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE CHALLENGE ────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#0f172a' }}>The Challenge</h2>
            <p style={{ color: '#64748b' }}>Observability is the first step to reduction</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-xl p-7"
                style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}
                >
                  {c.icon}
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#0f172a' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">How DataBridge Works</h2>
            <p style={{ color: '#64748b' }}>Three components. One seamless system.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: <Activity className="h-8 w-8" />,
                title: 'Measure',
                color: '#2563eb',
                desc: 'Mitsubishi Electric energy meters (EMU4-FD2-MB, ME96SS) collect real-time kW, kWh, and amp readings at every circuit, machine, or department you define.',
                tag: 'Energy Monitoring Meters',
              },
              {
                step: '02',
                icon: <Plug className="h-8 w-8" />,
                title: 'Transmit',
                color: '#059669',
                desc: 'The DataBridge hardware device — plug & play over RS485 or Ethernet — aggregates meter data and transmits it securely to the cloud via your LAN network.',
                tag: 'DataBridge Hardware',
              },
              {
                step: '03',
                icon: <BarChart2 className="h-8 w-8" />,
                title: 'Act',
                color: '#7c3aed',
                desc: 'Real-time dashboards (gauge, graph, heatmap) display consumption by department or machine. Alerts, reports, and ERP-ready API endpoints turn data into decisions.',
                tag: 'Cloud Dashboards & API',
              },
            ].map((step) => (
              <div
                key={step.step}
                className="rounded-xl p-8"
                style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}20`, color: step.color }}
                  >
                    {step.icon}
                  </div>
                  <span className="text-3xl font-bold" style={{ color: '#334155' }}>{step.step}</span>
                </div>
                <span
                  className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full mb-4 inline-block"
                  style={{ backgroundColor: `${step.color}20`, color: step.color }}
                >
                  {step.tag}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#0f172a' }}>Use Cases</h2>
            <p style={{ color: '#64748b' }}>From data to decisions — three ways DataBridge cuts costs</p>
          </div>
          <div className="space-y-8">
            {useCases.map((uc) => (
              <div
                key={uc.number}
                className="rounded-xl p-8 flex flex-col md:flex-row gap-8"
                style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
              >
                <div className="flex-shrink-0 flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${uc.color}12`, color: uc.color }}
                  >
                    {uc.icon}
                  </div>
                  <span className="text-5xl font-bold" style={{ color: '#f1f5f9' }}>{uc.number}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0f172a' }}>{uc.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748b' }}>{uc.desc}</p>
                  <blockquote
                    className="text-sm italic px-4 py-3 rounded-lg border-l-4"
                    style={{ backgroundColor: `${uc.color}08`, borderColor: uc.color, color: '#475569' }}
                  >
                    {uc.example}
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNICAL SPECS ───────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#0f172a' }}>What Sets DataBridge Apart</h2>
            <p style={{ color: '#64748b' }}>Seamless integration. Actionable insights. No complexity.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techSpecs.map((spec) => (
              <div
                key={spec.label}
                className="bg-white rounded-xl p-6 flex gap-4"
                style={{ border: '1px solid #e2e8f0' }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}
                >
                  {spec.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{ color: '#0f172a' }}>{spec.label}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ─────────────────────────────────────────────────── */}
      <ArchitectureDiagram />

      {/* ── LIVE DEMO CTA ────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-10 text-center" style={{ backgroundColor:'#1e3a5f' }}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
              style={{ backgroundColor:'rgba(96,165,250,0.2)', color:'#93c5fd', border:'1px solid rgba(96,165,250,0.4)' }}>
              <Zap className="h-3 w-3" /> Interactive Demo
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">See It Live — Before You Commit</h2>
            <p className="mb-8 max-w-xl mx-auto" style={{ color:'#93c5fd' }}>
              Explore a fully interactive simulation of the EnergyOS dashboard — real-time charts, predictive maintenance, EWMA anomaly detection, and downloadable PDF reports. No sign-up required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/demo/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm"
                style={{ backgroundColor:'#2563eb', color:'#ffffff' }}>
                <BarChart2 className="h-4 w-4" /> Launch Live Dashboard
              </Link>
              <Link href="/demo/analytics"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm"
                style={{ backgroundColor:'rgba(255,255,255,0.1)', color:'#fff', border:'1px solid rgba(255,255,255,0.25)' }}>
                View Analytics &amp; Reports <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Take Control of Your Energy Costs?</h2>
          <p className="text-base mb-4" style={{ color: '#94a3b8' }}>
            Start with a pilot: monitor a single production line and see your savings in weeks — then scale facility-wide.
          </p>
          <p className="text-sm mb-10" style={{ color: '#64748b' }}>
            Free consultation available to assess your baseline and identify your biggest opportunities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-semibold text-sm"
              style={{ backgroundColor: '#059669', color: '#ffffff' }}
            >
              Request Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-6 text-xs" style={{ color: '#475569' }}>
            Contact: Ali Anza &nbsp;|&nbsp; +92-306-5555592 &nbsp;|&nbsp; info@princeelectric.com
          </p>
        </div>
      </section>

    </div>
  )
}
