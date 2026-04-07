'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Zap, PlayCircle } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Energy Management', href: '/energy-management', highlight: true },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact Us', href: '/contact-us' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 shadow-xl" style={{ fontFamily: 'Eurostile' }}>
      {/* Top contact strip — desktop only */}
      <div className="hidden lg:block py-2 px-8" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs" style={{ color: '#94a3b8' }}>
          <span className="font-semibold tracking-wide" style={{ color: '#60a5fa' }}>
            Pakistan's Sole Distributors of Mitsubishi Electric Switchgear
          </span>
          <div className="flex gap-6">
            <span>+92-42-575232 &nbsp;|&nbsp; 5753373</span>
            <span>info@princeelectric.com</span>
            <span>2-P Gulberg II, Lahore</span>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <Image
                src="/logo-icon.png"
                alt="Prince Electric"
                width={44}
                height={44}
                className="h-11 w-auto"
              />
              <span className="hidden sm:block font-bold text-lg tracking-wide text-white" style={{ fontFamily: 'Eurostile' }}>
                PRINCE ELECTRIC
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.highlight ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-md transition-all"
                    style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
                  >
                    <Zap className="h-3.5 w-3.5" />
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
                    style={{ color: '#cbd5e1' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.backgroundColor = '#334155' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.backgroundColor = 'transparent' }}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>

            {/* Live Demo CTA — desktop */}
            <Link
              href="/demo/dashboard"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all"
              style={{ backgroundColor: '#059669', color: '#ffffff', border: '2px solid #059669' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#047857'; e.currentTarget.style.borderColor = '#047857' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#059669'; e.currentTarget.style.borderColor = '#059669' }}
            >
              <PlayCircle className="h-4 w-4" />
              Live Demo
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md transition-colors"
              style={{ color: '#cbd5e1' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ backgroundColor: '#0f172a', borderTop: '1px solid #334155' }}>
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-md"
                  style={{
                    color: link.highlight ? '#93c5fd' : '#cbd5e1',
                    fontWeight: link.highlight ? '600' : '500',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.highlight && <Zap className="h-4 w-4" />}
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="px-4 pb-3">
              <Link
                href="/demo/dashboard"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-md text-sm font-bold"
                style={{ backgroundColor: '#059669', color: '#ffffff' }}
                onClick={() => setMobileOpen(false)}
              >
                <PlayCircle className="h-4 w-4" />
                Try Live Demo
              </Link>
            </div>
            <div className="px-8 py-4 space-y-1 text-xs" style={{ color: '#64748b', borderTop: '1px solid #1e293b' }}>
              <p>+92-42-575232 | 5753373</p>
              <p>info@princeelectric.com</p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
