import Image from 'next/image'
import { BoltIcon } from 'lucide-react'

const ProjectCard = ({ title, description, imageSrc }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
    <div className="relative h-64">
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-6 flex-grow">
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <BoltIcon className="h-4 w-4 mr-1" />
        <span>Electrical Project</span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
    <div className="px-6 pb-4">
      <div className="flex items-center">
        <Image
          src="/placeholder.svg?height=40&width=40"
          alt="Company Logo"
          width={40}
          height={40}
          className="rounded-full mr-3"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">Your Company Name</p>
          <p className="text-sm text-gray-600">Completed Project</p>
        </div>
      </div>
    </div>
  </div>
)

export default function Component() {
  const projects = [
    {
      title: "Electrification of Lahore's Largest Padel Court Facility",
      description: "Full-scale electrification of Lahore's biggest padel court facility, including design, supply, and installation of distribution boards and main panel. Ensured reliable power from transformer to individual court switchboards.",
      imageSrc: "https://ducaqjqbmh7lv.cloudfront.net/mysite/padel.jpeg"
    },
    {
      title: 'Complete Electrification for "WePlay Peshawar" Amusement Park',
      description: 'Provided comprehensive electrification solution for "WePlay Peshawar" amusement park. Delivered main panels and distribution boards designed to handle high loads safely and efficiently.',
      imageSrc: "https://ducaqjqbmh7lv.cloudfront.net/mysite/weplay.png"
    },
    {
      title: "Trusted Partner for Leading Industrial Clients",
      description: "Expertise extends to major industrial clients including Century Paper, Diamond Tyres, and Shehzad Textile Mills. Providing tailored panels, distribution boards, and ongoing support services.",
      imageSrc: "https://ducaqjqbmh7lv.cloudfront.net/mysite/industrial1.png"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: 'Eurostile' }}>

      <main className="flex-grow">
        <section className="relative bg-gray-900 text-white h-[400px] sm:h-[700px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 -ml-64"
            style={{
              backgroundImage: "url('https://ducaqjqbmh7lv.cloudfront.net/mysite/projects-banner.jpeg')",
              filter: "brightness(0.5)",
            }}
          />
          <div className="container mx-auto relative z-10 px-4 flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
            <div className="w-full sm:w-1/2">
              <h1 className="text-4xl md:text-8xl font-bold mb-4" style={{ fontFamily: 'Eurostile' }}>Our Projects</h1>
              <p className="text-md sm:text-lg lg:text-xl">Discover our range of high-quality electrical solutions</p>
            </div>
          </div>
        </section>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}