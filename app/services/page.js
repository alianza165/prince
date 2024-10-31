import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'

const products = [
  { name: 'Switch Gear', image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/switchgear.png' },
  { name: 'Controllers', image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/controllers.png' },
  { name: 'Electrical Panels', image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/panel.jpeg' },
  { name: 'Conduit Pipe', image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/corrugated-conduit-pipe.jpeg' },
  { name: 'Panel Accessories', image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/panel-accessories.jpeg' },
  { name: 'Motors', image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/motors.png' },
  { name: 'Automation Solutions', image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/automation.jpeg' },
  { name: 'Capacitors', image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/capacitors.png' },
]

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: 'Eurostile' }}>

      <main className="flex-grow">
        <section className="relative bg-gray-900 text-white h-[400px] sm:h-[700px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 -ml-64"
            style={{
              backgroundImage: "url('https://ducaqjqbmh7lv.cloudfront.net/mysite/services.jpeg')",
              filter: "brightness(0.5)",
            }}
          />
          <div className="container mx-auto relative z-10 px-4 flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
            <div className="w-full sm:w-1/2">
              <h1 className="text-4xl md:text-8xl font-bold mb-4" style={{ fontFamily: 'Eurostile' }}>Services</h1>
              <p className="text-md sm:text-lg lg:text-xl">Discover our range of high-quality electrical solutions</p>
            </div>
          </div>
        </section>


        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-center">{product.name}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}