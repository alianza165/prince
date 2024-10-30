import Image from 'next/image'
import Link from 'next/link'
import { Menu, Facebook, Twitter, Linkedin, Send } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="relative h-[400px] sm:h-[700px] bg-gray-800">
          <Image
            src="https://ducaqjqbmh7lv.cloudfront.net/mysite/latest-news.png"
            alt="Electrician working"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <h1 className="text-3xl md:text-7xl font-bold text-white ml-10 md:ml-96">Latest News</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Image src="https://ducaqjqbmh7lv.cloudfront.net/mysite/news1.png" alt="Workshop" width={500} height={300} className="rounded-lg w-full" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Offering workshops and trainings</h2>
                <p className="text-gray-600">Aenean id eleifend sapien, vel mattis nulla. Nunc eu dui mauris. Fusce sed purus ligula. Integer auctor ipsum id ipsum tincidunt, in euismod odio auctor. Integer in velit vitae nunc porttitor pellentesque.</p>
                <p className="text-gray-600">Praesent vulputate magna vitae diam fringilla scelerisque. Aenean posuere turpis risus, eu egestas felis ultrices a. Sed sit amet massa dolor. Cras ultrices a elit a hendrerit. Aenean nec lectus ultrices ligula porttitor maximus eu et neque. Morbi bibendum dui neque, a finibus nunc iaculis ultrices.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">3 pole vs 4 pole" pros and cons?</h2>
                <p className="text-gray-600">Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut porttitor efficitur ex nec tincidunt. Mauris mattis sed sapien non porttitor. Morbi tempor augue et elit gravida venenatis non id diam.</p>
                <p className="text-gray-600">Aenean id eleifend sapien, vel mattis nulla. Nunc eu dui mauris. Fusce sed purus ligula. Integer auctor ipsum id ipsum tincidunt, in euismod odio auctor. Integer in velit vitae nunc porttitor pellentesque. Aenean sed feugiat dui, in dignissim leo. Ut ut rutrum nibh. Morbi tincidunt, nibh id feugiat venenatis, felis mauris dictum sem, et mollis purus sem eu sapien.</p>
              </div>
              <div>
                <Image src="https://ducaqjqbmh7lv.cloudfront.net/mysite/news2.png" alt="Training session" width={500} height={300} className="rounded-lg w-full" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}