import { ClipboardDocumentCheckIcon, LockClosedIcon, ServerIcon, ArrowTrendingDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import ModelViewer from './ModelViewer';

const features = [
  {
    name: 'Cost Effective',
    description:
      'Offer our customers the most cost-efficient, solution to satisfy their Industrial Automation needs',
    icon: ArrowTrendingDownIcon,
  },
  {
    name: 'Authentic',
    description: 'Provide genuine products to help our partners achieve their goals',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: 'Reliable',
    description: 'Build and Maintain long term mutually beneficial relationships with our customers and principals.',
    icon: ServerIcon,
  },
];

export default function Feature(theme) {

  const themeClass = theme.theme === 'dark' ? 'bg-black' : 'bg-white';
  const themeFont1 = theme.theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const themeFont2 = theme.theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const imageClass = theme.theme === 'dark' ? 'brightness-90' : '';

  return (
    <div className={`pt-8 overflow-hidden py-24 md:py-12 ${themeClass}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-sky-500">Partner with us</h2>
              <p className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${themeFont1}`}>The Future is Here</p>
              <p className={`mt-6 text-lg leading-8 ${themeFont2}`}>
                Information technology (IT) stands as a cornerstone of our future, enabling humanity to navigate the complexities of resource scarcity. As we strive to maximize resource efficiency, IT, particularly artificial intelligence (AI), emerges as a key ally
              </p>
              <dl className={`mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none ${themeFont2}`}>
                {features.map((feature) => (
                  <div key={feature.name} className="">
                    <dt className={`inline font-semibold ${themeFont1}`}>
                      <feature.icon className="left-1 top-1 h-5 w-5 text-sky-500" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            src="https://ducaqjqbmh7lv.cloudfront.net/mysite/tech3.jpeg"
            className={`mt-10 w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0`}
            width={5000}
            height={5000}
          />
        </div>
      </div>
    </div>
  );
}

