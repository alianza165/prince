import Image from 'next/image'
import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'

const projects = [
  {
    title: '2500 KVA LT Panel for Commercial Building',
    category: 'LT Panel',
    description: 'Supply and commissioning of a 2500 KVA Low Tension panel for a large commercial building. Included incoming, outgoing, and power factor correction sections, built and tested to IEC standards.',
    image: '/project1.jpg',
  },
  {
    title: '400 KVA ATS LT Panel',
    category: 'ATS Panel',
    description: 'Design and fabrication of a 400 KVA Automatic Transfer Switch panel for seamless changeover between mains supply and standby generator — ensuring zero interruption to critical loads.',
    image: '/project2.jpg',
  },
  {
    title: '2500 KVA LT Panel and MCC for Commercial Building',
    category: 'LT Panel & MCC',
    description: 'Combined Low Tension panel and Motor Control Centre (MCC) for a commercial development. Designed to handle HVAC, lift, and general power distribution loads from a single integrated panel.',
    image: '/project3.jpg',
  },
  {
    title: '25000 KVA LT & MCC Panels — Ethanol Plant',
    category: 'Industrial',
    description: 'Large-scale 25000 KVA LT and Motor Control Centre panel installation for an ethanol manufacturing plant. Engineered to handle heavy continuous industrial loads with full protection and metering.',
    image: '/project4.png',
  },
  {
    title: '2 × 2000 KVA Panels — Manufacturing Industry',
    category: 'Industrial',
    description: 'Dual 2000 KVA LT panels for a manufacturing facility, providing redundant power distribution across production lines. Genuine Mitsubishi MCCBs and busbars throughout.',
    image: '/project5.png',
  },
  {
    title: 'LT Panel — Pharmaceutical Manufacturing Factory',
    category: 'Pharma',
    description: 'Provision of a fully compliant LT panel for a pharmaceutical manufacturing facility. Built to stringent safety and reliability standards required in GMP-regulated environments.',
    image: '/project6.png',
  },
]

export default function ProjectsPage() {
  return (
    <div style={{ fontFamily: 'Eurostile' }}>

      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ducaqjqbmh7lv.cloudfront.net/mysite/projects-banner.jpeg')",
            filter: 'brightness(0.3)',
          }}
        />
        <div className="relative z-10 px-6 lg:px-24 w-full">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#60a5fa' }}>Our Work</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Projects</h1>
          <p className="mt-3 text-base" style={{ color: '#cbd5e1' }}>
            Delivering high-capacity electrical solutions across Pakistan
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-white rounded-xl overflow-hidden flex flex-col"
                style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <div className="relative h-52 bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span
                    className="text-xs font-semibold uppercase tracking-wide mb-3 inline-flex items-center gap-1"
                    style={{ color: '#dc2626' }}
                  >
                    <Zap className="h-3 w-3" />
                    {project.category}
                  </span>
                  <h2 className="text-base font-bold mb-3 leading-snug" style={{ color: '#0f172a' }}>
                    {project.title}
                  </h2>
                  <p className="text-sm leading-relaxed flex-grow" style={{ color: '#64748b' }}>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a Project in Mind?</h2>
          <p className="mb-8" style={{ color: '#94a3b8' }}>
            From initial load calculations through to a fully fabricated and commissioned panel — we handle it end to end.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-semibold text-sm"
            style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
          >
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  )
}
