
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'



export default function HomePage() {

  const brands = [
    { name: 'Mitsubishi Electric', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/mitsubishi.png' },
    { name: 'MaxGe', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/maxge.png' },
    { name: 'Shimaden', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/shimaden.png' },
    { name: 'iskra', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/iskra.png' },
    { name: 'IME Italy', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/ime.png' },
    { name: 'LEFOO', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/lefoo.png' },
    { name: 'Samwha', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/samwha.png' },
    { name: 'Beijer Electronics', logo: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/beijer.png' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isMobile])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + brands.length) % brands.length)
  }

  const productCategories = [
    {
      name: 'Commercial',
      image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/commercial.png',
      description: 'High-quality electrical solutions for commercial applications.',
      link: '/products/commercial'
    },
    {
      name: 'Industrial',
      image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/industrial.png',
      description: 'Durable and efficient solutions for industrial use.',
      link: '/products/industrial'
    },
    {
      name: 'Residential',
      image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/residential.png',
      description: 'Safe and reliable solutions for residential applications.',
      link: '/products/residential'
    }
  ];

  const [currentProduct, setCurrentProduct] = useState(0)

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % productCategories.length)
  }

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + productCategories.length) % productCategories.length)
  }

  const solutionsData = [
    {
      id: '01',
      title: 'Complete provision',
      description: 'Complete provision of fool proof, safety standards compliant electrical distribution system from the transformer to your light switches / appliances.'
    },
    {
      id: '02',
      title: 'Provision of electrical',
      description: 'Provision of electrical drawings / Single Line Diagrams / load calculations, based on your requirements.'
    },
    {
      id: '03',
      title: 'Custom solutions',
      description: 'Custom solutions, energy monitoring, ground-fault protection, motor protection, Power factor improvement panels.'
    },
    {
      id: '04',
      title: 'Automatic Transfer Switch',
      description: 'Automatic Transfer Switch (ATS) Panel (Between Mains supply and generator).'
    },
    {
      id: '05',
      title: 'Solar Panels',
      description: 'Solar Panels\' Electrical accessories.'
    }
  ]

  const [solutionsCurrentIndex, setSolutionsCurrentIndex] = useState(0)

  const nextSolutionSlide = () => {
    setSolutionsCurrentIndex((prevIndex) => (prevIndex + 1) % solutionsData.length)
  }

  const prevSolutionSlide = () => {
    setSolutionsCurrentIndex((prevIndex) => (prevIndex - 1 + solutionsData.length) % solutionsData.length)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="hidden sm:block relative h-[800px] overflow-hidden">
          <Image
            src="https://ducaqjqbmh7lv.cloudfront.net/mysite/Header-Banner.png"
            alt="Prince Group Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          <div className="relative z-20 h-full flex flex-col justify-center text-white px-4 pl-20">
            <div className="pl-32 pb-32">
              <h1 className="text-8xl font-bold mb-4" style={{ fontFamily: 'Eurostile' }}>
                <p className="text-6xl mb-4">Welcome To</p>
                <span>Prince Group</span>
              </h1>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
            </div>
          </div>
        </section>
        <section className="block sm:hidden relative overflow-hidden">
          <Image
            src="https://ducaqjqbmh7lv.cloudfront.net/mysite/mobile_banner.png"
            alt="Prince Group Background"
            width={500}
            height={500}
            objectFit="cover"
            quality={100}
            className="object-cover z-0 brightness-50"
          />
          
          {/* Overlayed Text Section */}
          <div className="absolute inset-0 flex items-center justify-start text-white px-6 pl-10 z-10">
            <div className="text-left">
              <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Eurostile' }}>
                <p className="text-3xl mb-2">Welcome To</p>
                <span>Prince Group</span>
              </h1>
              <button className="mt-4 px-6 py-2 border border-white text-white bg-transparent hover:bg-white hover:text-gray-900 transition-colors">
                Read More
              </button>
            </div>
          </div>
        </section>

        <section className="pb-8 px-4 flex flex-col md:flex-row">
          {/* Text Section */}
          <div className="md:ml-48 container mx-auto mt-8 md:mt-16 md:order-2">
            <div className="border-l-4 border-l-red-500 pl-4">
              <h2 className="text-xl">Who we are</h2>
              <h2 className="text-3xl font-bold mb-8">Why Prince Group?</h2>
            </div>
            <p className="text-gray-600 mb-8 w-full md:w-4/6">
              Prince Group offers innovative electrical solutions with a commitment to quality and customer satisfaction. Our expertise spans across various industries, providing tailored products and services to meet your specific needs.
            </p>
            <div>
              <button className="bg-transparent border border-gray-500 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:pl-32 mb-8 md:mb-0 md:order-1">
            <Image
              src="https://ducaqjqbmh7lv.cloudfront.net/mysite/About.png"
              alt="Prince Group Background"
              width={500}
              height={500}
            />
          </div>
        </section>

        <section className="bg-gray-100 py-16 px-4 bg-[#e6f7ff]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
            
            {/* Carousel for Mobile */}
            <div className="block md:hidden relative">
              <div className="relative">
                <Image
                  src={productCategories[currentProduct].image}
                  alt={`${productCategories[currentProduct].name} product`}
                  width={400}
                  height={300}
                  className="w-full h-[300px] object-cover rounded-md"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-md">
                  <h3 className="text-xl font-semibold">{productCategories[currentProduct].name}</h3>
                  <p className="text-sm">{productCategories[currentProduct].description}</p>
                  <Link href={productCategories[currentProduct].link}>
                    <button className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-200 hover:text-gray-900 px-4 py-2 mt-2 rounded transition-colors">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
              <button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
                onClick={prevProduct}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
                onClick={nextProduct}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Grid Layout for Desktop */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCategories.map((category) => (
                <div key={category.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={category.image}
                    alt={`${category.name} product`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Link href={category.link}>
                      <button className="bg-transparent border border-gray-500 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded transition-colors">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-4xl font-bold text-center mb-8">Our Brands</h2>
          {isMobile ? (
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {brands.map((brand, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="border p-4 flex items-center justify-center h-32">
                        <Image src={brand.logo} alt={brand.name} width={200} height={60} className="max-w-full max-h-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                aria-label="Previous brand"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                aria-label="Next brand"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brands.map((brand, index) => (
                <div key={index} className="border p-4 flex items-center justify-center h-32">
                  <Image src={brand.logo} alt={brand.name} width={200} height={60} className="max-w-full max-h-full" />
                </div>
              ))}
            </div>
          )}
        </div>

    <div className="w-full mx-auto px-8 md:px-32 py-12 bg-[#e6f7ff]">
      <h1 className="text-4xl font-bold text-center mb-12">Solutions</h1>
      
      {/* Desktop view */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutionsData.map((solution) => (
          <div key={solution.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 flex items-start space-x-4">
              <div className="flex-shrink-0 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {solution.id}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{solution.title}</h2>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex-shrink-0 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 mx-auto">
              {solutionsData[solutionsCurrentIndex].id}
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center">{solutionsData[solutionsCurrentIndex].title}</h2>
            <p className="text-gray-600 text-center">{solutionsData[solutionsCurrentIndex].description}</p>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button variant="outline" size="icon" onClick={prevSolutionSlide}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button variant="outline" size="icon" onClick={nextSolutionSlide}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Sarah M.', content: 'Prince Group provided excellent service and high-quality products for our commercial project.' },
                { name: 'James L.', content: 'The team at Prince Group was professional and knowledgeable. Highly recommended!' },
                { name: 'Emily R.', content: 'We were impressed by the innovative solutions offered by Prince Group for our industrial needs.' },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16 px-4 bg-[#e6f7ff]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Maximizing efficiency with smart electrical systems', image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/latest1.png' },
                { title: 'The future of renewable energy in industrial applications', image: 'https://ducaqjqbmh7lv.cloudfront.net/mysite/latest2.png' },
              ].map((post, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image src={post.image} alt={post.title} width={600} height={400} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <button variant="outline">Read More</button>
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
