import Image from 'next/image'
import { Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        <div className="relative bg-gray-900 text-white h-[400px] sm:h-[700px] py-16">
          <Image
            src="https://ducaqjqbmh7lv.cloudfront.net/mysite/testimonials.png"
            alt="Testimonials hero image"
            width={1920}
            height={400}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute flex max-w-7xl px-4 sm:px-6 lg:px-8 items-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Testimonials
            </h1>
          </div>
        </div>

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