import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Send } from 'lucide-react'

export default function Component() {
  return (
    <footer className="bg-black text-white">
      <div className="bg-red-500 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Send className="mr-2 h-6 w-6 text-white" />
            <span className="text-lg font-semibold">Subscribe To Newsletter</span>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Send a Message..."
              className="w-full md:w-64 px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300">
              Send →
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <Image
              src="/placeholder.svg"
              alt="Prince Group Logo"
              width={200}
              height={50}
              className="h-12 w-auto"
            />
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-400 transition duration-300">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-blue-400 transition duration-300">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-blue-400 transition duration-300">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Products', 'Services', 'Testimonials', 'Projects'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-gray-300 transition duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">More Links</h3>
            <ul className="space-y-2">
              {['Brands', 'Latest News', 'Blog', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-gray-300 transition duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Address Info</h3>
            <p>2-P Gulberg II, Lahore, Pakistan.</p>
            <p>T: +92-42-575232, 5753373</p>
            <p>E: info@princeelectric.com</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          © 2024 Prince Group. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}