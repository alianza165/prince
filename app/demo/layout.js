'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, DownloadCloud } from 'lucide-react'

const navLinks = [
  { label: 'Live Dashboard', href: '/demo/dashboard' },
  { label: 'Analytics',      href: '/demo/analytics'  },
  { label: 'Device Config',  href: '/demo/config'     },
  { label: 'Predictive AI',  href: '/demo/predictive' },
]

export default function DemoLayout({ children }) {
  const pathname = usePathname()
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb' }}>

      {/* DEMO MODE banner */}
      <div className="w-full text-center py-2 text-xs font-semibold" style={{ backgroundColor: '#fef08a', color: '#713f12' }}>
        DEMO MODE — All data is simulated. &nbsp;
        <Link href="/contact-us" className="underline">Contact us</Link> for a real deployment.
      </div>

      {/* Demo nav */}
      <nav style={{ backgroundColor: '#1e3a5f' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" style={{ color: '#60a5fa' }} />
            <div>
              <span className="text-white font-bold text-lg tracking-wide">EnergyOS</span>
              <p className="text-xs" style={{ color: '#93c5fd', lineHeight: 1 }}>Intelligent Energy Management for Industry</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium rounded transition-colors"
                style={{
                  color: pathname === link.href ? '#ffffff' : '#93c5fd',
                  backgroundColor: pathname === link.href ? '#2563eb' : 'transparent',
                  borderBottom: pathname === link.href ? '2px solid #60a5fa' : '2px solid transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/demo/analytics"
              className="ml-3 flex items-center gap-1.5 px-4 py-2 rounded text-sm font-semibold"
              style={{ backgroundColor: '#16a34a', color: '#ffffff' }}
            >
              <DownloadCloud className="h-4 w-4" /> Download Report
            </Link>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-grow">{children}</main>

      <footer className="text-center text-xs py-4" style={{ backgroundColor: '#1e3a5f', color: '#64748b' }}>
        EnergyOS © 2025 · Industrial Energy Intelligence · Commercial · Manufacturing · Infrastructure
      </footer>
    </div>
  )
}
