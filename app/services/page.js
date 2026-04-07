import Image from 'next/image'
import Link from 'next/link'
import { FileText, Cpu, Zap, Sun, Users, BarChart3, ChevronRight, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: <FileText className="h-7 w-7" />,
    title: 'Electrical Engineering & Design',
    color: '#2563eb',
    bg: '#eff6ff',
    points: [
      'Single Line Diagrams (SLDs)',
      'Electrical distribution drawings',
      'Load calculations & demand estimation',
      'Breaker sizing and rating selection',
      'Power factor analysis',
    ],
    desc: 'We translate your project requirements into precise, standards-compliant electrical designs. Whether you need a SLD for a new building or a full set of distribution drawings, our engineers deliver accurate documentation that contractors can build from.',
  },
  {
    icon: <Cpu className="h-7 w-7" />,
    title: 'LT Panel Consultation & Fabrication',
    color: '#dc2626',
    bg: '#fef2f2',
    points: [
      'End-to-end panel design and build',
      'MCC, distribution boards, main panels',
      'ATS panels (mains/generator switchover)',
      'Motor control centers',
      'Factory tested before dispatch',
    ],
    desc: 'From initial consultation to final commissioning, we handle the complete lifecycle of your LT panel. Our fabrication team builds to your specifications using genuine Mitsubishi components, ensuring reliability and compliance.',
  },
  {
    icon: <Zap className="h-7 w-7" />,
    title: 'Power Quality & Protection',
    color: '#7c3aed',
    bg: '#f5f3ff',
    points: [
      'Power factor improvement panels',
      'Ground-fault protection systems',
      'Motor protection solutions',
      'Surge and over-voltage protection',
      'Phase failure relay installations',
    ],
    desc: 'Poor power quality costs money and damages equipment. We design and supply systems that protect your assets, improve your power factor, and reduce your utility bills — backed by Mitsubishi-grade components.',
  },
  {
    icon: <BarChart3 className="h-7 w-7" />,
    title: 'Smart Energy Management',
    color: '#059669',
    bg: '#f0fdf4',
    highlight: true,
    points: [
      'DataBridge energy monitoring hardware',
      'Real-time dashboards (kW, kWh, amps)',
      'Predictive maintenance alerts',
      'Per-shift / per-machine accountability',
      'Cloud backup & ERP API integration',
    ],
    desc: 'Our DataBridge system gives you complete visibility into your energy consumption. Know exactly where electricity is going, catch machine degradation before it becomes a failure, and build a data-driven case for every efficiency investment.',
    cta: { text: 'Learn More About DataBridge', href: '/energy-management' },
  },
  {
    icon: <Sun className="h-7 w-7" />,
    title: 'Solar Electrical Integration',
    color: '#d97706',
    bg: '#fffbeb',
    points: [
      'Solar PV electrical accessories',
      'Grid-tie and hybrid system components',
      'DC protection and disconnect equipment',
      'Metering and monitoring solutions',
    ],
    desc: 'We supply and integrate the electrical components needed for solar photovoltaic systems — including protection devices, switchgear, and monitoring equipment compatible with all major inverter brands.',
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: 'Seminars & Technical Training',
    color: '#0891b2',
    bg: '#ecfeff',
    points: [
      'Industrial automation practices',
      'Latest switchgear technologies',
      'Energy efficiency best practices',
      'On-site and workshop formats',
    ],
    desc: 'We run workshops for electrical teams on the latest industrial practices — from switchgear selection to energy monitoring. Keep your engineering staff current and reduce dependency on external consultants.',
  },
]

export default function ServicesPage() {
  return (
    <div style={{ fontFamily: 'Eurostile' }}>

      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ducaqjqbmh7lv.cloudfront.net/mysite/services.jpeg')",
            filter: 'brightness(0.35)',
          }}
        />
        <div className="relative z-10 px-6 lg:px-24 w-full">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#60a5fa' }}>What We Offer</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Our Services</h1>
          <p className="mt-3 text-base" style={{ color: '#cbd5e1' }}>
            Engineering expertise backed by Mitsubishi Electric components
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0f172a' }}>
            More than a supplier — a complete electrical solutions partner
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#64748b' }}>
            Prince Electric has evolved beyond component distribution. Today we offer end-to-end engineering services — from design drawings through to fabricated panels, smart energy monitoring, and technical training. Every service is backed by our exclusive access to genuine Mitsubishi Electric products.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 px-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl p-8 flex flex-col"
              style={{
                border: service.highlight ? `2px solid ${service.color}` : '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                boxShadow: service.highlight ? `0 4px 20px rgba(5,150,105,0.12)` : '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              {service.highlight && (
                <span
                  className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full self-start mb-4"
                  style={{ backgroundColor: '#f0fdf4', color: '#059669' }}
                >
                  Featured
                </span>
              )}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: service.bg, color: service.color }}
              >
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: '#0f172a' }}>{service.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b' }}>{service.desc}</p>
              <ul className="space-y-2 flex-grow">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm" style={{ color: '#475569' }}>
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
                    {point}
                  </li>
                ))}
              </ul>
              {service.cta && (
                <Link
                  href={service.cta.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: service.color }}
                >
                  {service.cta.text} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="mb-8" style={{ color: '#94a3b8' }}>
            Our engineers are available for an initial consultation — whether you need a single SLD or a fully fabricated switchroom.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-semibold text-sm transition-colors"
            style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
          >
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  )
}
