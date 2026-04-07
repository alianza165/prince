'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Zap, Settings, BarChart3, ChevronRight, ArrowRight, Shield, Clock, Award, PlayCircle } from 'lucide-react'

const clients = [
  'Coca-Cola', 'Toyota', 'Nestlé', 'Engro', 'Suzuki', 'Millat Tractors',
  'Fatima Fertilizer', 'Sapphire Textile', 'Diamond Tyres', 'Kohinoor',
  'Atlas Honda', 'Servis', 'Haleeb Foods', 'Gul Ahmed Textile',
  'DG Khan Cement', 'National Foods', 'Treet Corporation', 'ISL',
]

const brands = [
  { name: 'Mitsubishi Electric', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/mitsubishi.png' },
  { name: 'MaxGe', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/maxge.png' },
  { name: 'Shimaden', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/shimaden.png' },
  { name: 'Iskra', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/iskra.png' },
  { name: 'IME Italy', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/ime.png' },
  { name: 'LEFOO', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/lefoo.png' },
  { name: 'Samwha', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/samwha.png' },
  { name: 'Beijer Electronics', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/beijer.png' },
]

const projects = [
  {
    title: '2500 KVA LT Panel — Commercial Building',
    description: 'Supply and commissioning of a 2500 KVA LT panel including incoming, outgoing, and power factor correction sections, built to IEC standards.',
    image: '/project1.jpg',
  },
  {
    title: '25000 KVA LT & MCC Panels — Ethanol Plant',
    description: 'Large-scale LT and Motor Control Centre panel installation for an ethanol manufacturing plant, engineered for heavy continuous industrial loads.',
    image: '/project4.png',
  },
  {
    title: '2 × 2000 KVA Panels — Manufacturing Industry',
    description: 'Dual 2000 KVA LT panels providing redundant power distribution across production lines, with genuine Mitsubishi MCCBs and busbars throughout.',
    image: '/project5.png',
  },
]

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'Eurostile' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '88vh' }}>
        <Image
          src="/hero-banner.png"
          alt="Prince Electric"
          fill
          objectFit="cover"
          quality={100}
          className="z-0"
          priority
        />
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.55) 100%)' }} />
        <div className="relative z-20 h-full flex flex-col justify-center px-6 lg:px-24 py-24">
          <div className="max-w-3xl">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(37,99,235,0.3)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.5)' }}
            >
              Mitsubishi Electric — Sole Authorized Distributor in Pakistan
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Pakistan's Premier<br />
              <span style={{ color: '#60a5fa' }}>Electrical Solutions</span><br />
              Partner
            </h1>
            <p className="text-lg mb-10 max-w-xl" style={{ color: '#cbd5e1' }}>
              Switchgear supply, engineering services, and smart energy management — all under one roof.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-7 py-3.5 rounded-md font-semibold text-sm transition-colors"
                style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
              >
                Explore Products
              </Link>
              <Link
                href="/contact-us"
                className="px-7 py-3.5 rounded-md font-semibold text-sm transition-colors border"
                style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
              >
                Get Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#0f172a' }}>What We Do</h2>
            <p style={{ color: '#64748b' }}>Three integrated capabilities. One trusted partner.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" style={{ color: '#dc2626' }} />,
                title: 'Switchgear & Components',
                desc: "Pakistan's sole distributor of Mitsubishi Electric switchgear. We supply MCCBs, MCBs, contactors, air circuit breakers and the full range of LV components for commercial, industrial and residential projects.",
                link: '/products',
                linkText: 'View Products',
                accentColor: '#dc2626',
              },
              {
                icon: <Settings className="h-8 w-8" style={{ color: '#2563eb' }} />,
                title: 'Engineering Services',
                desc: 'End-to-end LT panel consultation and fabrication. We draft Single Line Diagrams, perform load calculations, size breakers, and deliver fully commissioned panels — from transformer to appliances.',
                link: '/services',
                linkText: 'View Services',
                accentColor: '#2563eb',
              },
              {
                icon: <BarChart3 className="h-8 w-8" style={{ color: '#059669' }} />,
                title: 'Smart Energy Management',
                desc: 'DataBridge — our plug-and-play energy monitoring system. Real-time dashboards, predictive maintenance alerts, and per-machine consumption tracking to cut your electricity costs measurably.',
                link: '/energy-management',
                linkText: 'Learn About DataBridge',
                accentColor: '#059669',
                highlight: true,
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-xl p-8 shadow-sm flex flex-col"
                style={{ border: pillar.highlight ? '2px solid #059669' : '1px solid #e2e8f0' }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: pillar.highlight ? '#f0fdf4' : '#f8fafc' }}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0f172a' }}>{pillar.title}</h3>
                <p className="text-sm leading-relaxed flex-grow mb-6" style={{ color: '#64748b' }}>{pillar.desc}</p>
                <Link
                  href={pillar.link}
                  className="inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: pillar.accentColor }}
                >
                  {pillar.linkText} <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STATS ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '25+', label: 'Years of Experience', icon: <Clock className="h-5 w-5" /> },
            { value: '50+', label: 'Major Industrial Clients', icon: <Award className="h-5 w-5" /> },
            { value: '3', label: 'Offices Nationwide', icon: <Shield className="h-5 w-5" /> },
            { value: '100%', label: 'Original Mitsubishi Products', icon: <Zap className="h-5 w-5" /> },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="flex justify-center mb-2" style={{ color: '#2563eb' }}>{stat.icon}</div>
              <div className="text-4xl font-bold mb-1" style={{ color: '#ffffff' }}>{stat.value}</div>
              <div className="text-xs uppercase tracking-wide" style={{ color: '#64748b' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#0f172a' }}>Our Products</h2>
            <p style={{ color: '#64748b' }}>Tailored electrical solutions across all sectors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Commercial',
                image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/commercial.png',
                description: 'MCCBs, MCBs, contactors, surge protection and panel accessories for commercial buildings, plazas and offices.',
                href: '/products',
              },
              {
                name: 'Industrial',
                image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/industrial2.png',
                description: 'Heavy-duty air circuit breakers, vacuum circuit breakers, motor protection devices and full LT panel solutions for industrial facilities.',
                href: '/products',
              },
              {
                name: 'Residential',
                image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/residential.png',
                description: 'Safe, standards-compliant MCBs, RCCBs, surge protection and over-voltage protectors for homes and housing societies.',
                href: '/products',
              },
            ].map((cat) => (
              <div key={cat.name} className="rounded-xl overflow-hidden shadow-md border" style={{ borderColor: '#e2e8f0' }}>
                <div className="relative h-52">
                  <Image src={cat.image} alt={cat.name} fill objectFit="cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#0f172a' }}>{cat.name}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b' }}>{cat.description}</p>
                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: '#2563eb' }}
                  >
                    Explore Range <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT WALL ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#0f172a' }}>Trusted by Pakistan's Leading Industries</h2>
            <p style={{ color: '#64748b' }}>From FMCG giants to heavy industry — they rely on Prince Electric</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {clients.map((client) => (
              <span
                key={client}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: '#ffffff', color: '#475569', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATABRIDGE SPOTLIGHT ─────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #2563eb 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(5,150,105,0.2)', color: '#34d399', border: '1px solid rgba(5,150,105,0.4)' }}
              >
                <Zap className="h-3 w-3" /> New — Smart Energy Management
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Is Your Electricity Bill<br />
                <span style={{ color: '#34d399' }}>Still a Mystery?</span>
              </h2>
              <p className="text-base mb-8" style={{ color: '#94a3b8' }}>
                Energy is your second-largest expense — growing 10–20% yearly. Monthly bills show you <em>what</em> you spent, never <em>where</em> or <em>why</em>. DataBridge changes that.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { label: 'Real-Time Monitoring', desc: 'Track kW, kWh and amps by department or machine — live.' },
                  { label: 'Predictive Maintenance', desc: 'Detect motor wear from amperage trends before failures occur.' },
                  { label: 'Accountability', desc: 'Trace overconsumption to specific shifts, lines, or equipment.' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full" style={{ backgroundColor: '#34d399', marginTop: '6px' }} />
                    <div>
                      <span className="text-sm font-semibold text-white">{item.label}</span>
                      <span className="text-sm" style={{ color: '#94a3b8' }}> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/demo/dashboard"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-bold text-sm transition-colors"
                  style={{ backgroundColor: '#059669', color: '#ffffff' }}
                >
                  <PlayCircle className="h-4 w-4" /> Try Live Demo
                </Link>
                <Link
                  href="/energy-management"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-sm"
                  style={{ backgroundColor: 'transparent', color: '#34d399', border: '1px solid rgba(52,211,153,0.4)' }}
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { metric: '30%', label: 'of industrial energy lost to unseen inefficiencies daily' },
                { metric: '10–20%', label: 'average annual growth in energy costs' },
                { metric: 'Plug & Play', label: 'RS485 / Ethernet setup — no complex installation' },
                { metric: 'Multi-site', label: 'Scale from a single machine to your entire facility' },
              ].map((card) => (
                <div
                  key={card.metric}
                  className="rounded-xl p-6 flex items-center gap-5"
                  style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                >
                  <div className="text-2xl font-bold flex-shrink-0 w-28" style={{ color: '#34d399' }}>{card.metric}</div>
                  <div className="text-sm" style={{ color: '#94a3b8' }}>{card.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>Featured Projects</h2>
              <p style={{ color: '#64748b' }}>Delivering at scale — across Pakistan</p>
            </div>
            <Link href="/projects" className="text-sm font-semibold inline-flex items-center gap-1" style={{ color: '#2563eb' }}>
              All Projects <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((p) => (
              <div key={p.title} className="rounded-xl overflow-hidden shadow-md border" style={{ borderColor: '#e2e8f0' }}>
                <div className="relative h-48">
                  <Image src={p.image} alt={p.title} fill objectFit="cover" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: '#dc2626' }}>
                    Electrical Project
                  </span>
                  <h3 className="text-base font-bold mb-2" style={{ color: '#0f172a' }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#0f172a' }}>Our Principals</h2>
            <p style={{ color: '#64748b' }}>Original products — directly sourced from world-class manufacturers</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="bg-white rounded-xl p-6 flex items-center justify-center h-28 shadow-sm"
                style={{ border: '1px solid #e2e8f0' }}
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={140}
                  height={50}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
