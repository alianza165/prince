import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Zap } from 'lucide-react'

const quickLinks = ['Home', 'Products', 'Services', 'Energy Management', 'Projects', 'Contact Us']
const quickHrefs = ['/', '/products', '/services', '/energy-management', '/projects', '/contact-us']

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', fontFamily: 'Eurostile' }}>
      {/* CTA strip */}
      <div style={{ backgroundColor: '#1d4ed8' }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Ready to Optimize Your Electrical Infrastructure?</h3>
            <p style={{ color: '#bfdbfe' }}>From switchgear supply to smart energy monitoring — we cover it all.</p>
          </div>
          <Link
            href="/contact-us"
            className="flex-shrink-0 px-8 py-3 rounded-md font-semibold text-sm transition-colors"
            style={{ backgroundColor: '#ffffff', color: '#1d4ed8' }}
          >
            Get a Free Consultation
          </Link>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-icon.png"
                alt="Prince Electric"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-bold text-base tracking-wide text-white" style={{ fontFamily: 'Eurostile' }}>
                PRINCE ELECTRIC
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748b' }}>
              Pakistan's sole distributors of Mitsubishi Electric switchgear. Supply, engineering services, and smart energy management.
            </p>
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: '#1e3a5f', color: '#60a5fa' }}
            >
              Mitsubishi Electric — Authorized Distributor
            </span>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: '#e2e8f0' }}>Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((item, i) => (
                <li key={item}>
                  <Link
                    href={quickHrefs[i]}
                    className="text-sm transition-colors hover:text-white flex items-center gap-1"
                    style={{ color: '#64748b' }}
                  >
                    {item === 'Energy Management' && <Zap className="h-3 w-3 inline" style={{ color: '#60a5fa' }} />}
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: '#e2e8f0' }}>Our Offices</h4>
            <ul className="space-y-4 text-sm" style={{ color: '#64748b' }}>
              <li>
                <p className="font-medium mb-0.5" style={{ color: '#94a3b8' }}>Head Office — Lahore</p>
                <p>2-P Gulberg II, Lahore</p>
              </li>
              <li>
                <p className="font-medium mb-0.5" style={{ color: '#94a3b8' }}>Showrooms — Lahore</p>
                <p>1 & 16-Brandreth Road, Lahore</p>
              </li>
              <li>
                <p className="font-medium mb-0.5" style={{ color: '#94a3b8' }}>Branch — Karachi</p>
                <p>202-Hussain Trade Centre, New Chali</p>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: '#e2e8f0' }}>Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#dc2626' }} />
                <span style={{ color: '#64748b' }}>+92-42-575232 &nbsp;|&nbsp; 5753373</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#dc2626' }} />
                <span style={{ color: '#64748b' }}>info@princeelectric.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#dc2626' }} />
                <span style={{ color: '#64748b' }}>2-P Gulberg II, Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 text-center text-xs"
          style={{ borderTop: '1px solid #1e293b', color: '#475569' }}
        >
          © {new Date().getFullYear()} Prince Electric. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
