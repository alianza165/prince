import Image from 'next/image'
import { Menu } from 'lucide-react'


export default function TestimonialsPage() {
  const testimonials = [
    { name: "Patrick Smith", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Donec rutrum congue leo eget malesuada." },
    { name: "Kevin Key", text: "Phasellus ex felis, sagittis vitae scelerisque ac, tempor a arcu. Aliquam eget enim sodales, volutpat tortor in, blandit ex." },
    { name: "Chris Bulaw", text: "Fusce et imperdiet velit. Sed malesuada justo in posuere tristique. Vivamus at leo vestibulum, tempus libero quis, suscipit erat." },
    { name: "Tracy Cobb", text: "Maecenas volutpat egestas justo vitae bibendum. Donec lectus egestas blandit. Praesent in cursus lectus, vitae." },
    { name: "Brad Sheffield", text: "Vivamus diam pretium velit. Nulla quis lorem commodo, aliquam nunc sit amet, maximus tellus. Aenean convallis ex nec augue sagittis." },
    { name: "Johnny Pence", text: "Vivamus diam pretium velit. Nulla quis lorem commodo, aliquam nunc sit amet, maximus tellus. Aenean convallis ex nec augue sagittis, et congue nulla hendrerit." },
  ]

  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: 'Eurostile' }}>

      <main className="flex-grow">

        <section className="relative bg-gray-900 text-white h-[400px] sm:h-[700px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 -ml-64"
            style={{
              backgroundImage: "url('https://ducaqjqbmh7lv.cloudfront.net/mysite/testimonial-banner.jpeg')",
              filter: "brightness(0.5)",
            }}
          />
          <div className="container mx-auto relative z-10 px-4 flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
            <div className="w-full sm:w-1/2">
              <h1 className="text-4xl md:text-8xl font-bold mb-4" style={{ fontFamily: 'Eurostile' }}>Testimonials</h1>
              <p className="text-md sm:text-lg lg:text-xl">Discover our range of high-quality electrical solutions</p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <blockquote className="text-gray-600 mb-4">"{testimonial.text}"</blockquote>
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <cite className="font-semibold">{testimonial.name}</cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}