"use client"

import { useRef } from "react";
import Image from 'next/image';
import Feature from './feature';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';


export default function Body() {
  const videoRefs = [
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  const { theme, isOpen } = useAppContext();


  const handleMouseEnter = (index) => {
    if (videoRefs[index].current) {
      videoRefs[index].current.play();
    }
  };

  const handleMouseLeave = (index) => {
    if (videoRefs[index].current) {
      videoRefs[index].current.pause();
      videoRefs[index].current.currentTime = 0; // Reset video to start
    }
  };

  const themeClass = theme === 'dark' ? 'text-white bg-black' : 'text-black bg-white';
  const themeClass2 = theme === 'dark' ? 'text-black bg-white' : 'text-white bg-black';
  const bgImage = theme === 'dark' ? 'https://ducaqjqbmh7lv.cloudfront.net/mysite/dark_blur2.jpg' : 'https://ducaqjqbmh7lv.cloudfront.net/mysite/tech1.png';
  const bgClass = `url(${bgImage})`;
  const marginLeft = isOpen ? 'md:ml-60' : 'md:ml-10';


  return (
    <div className={`${marginLeft} transition-all duration-300`}>
    <Feature theme={theme}/>
    <div
      className="bg-fixed bg-cover bg-center pt-8 pt-8"
      style={{ backgroundImage: bgClass }}
    >

    <div className="relative grid grid-cols-1 gap-x-6 gap-y-16 px-4 mt-16 md:px-12 md:grid-cols-2 md:gap-x-8">
        
        <div
          className="md:p-2  bg-gradient-to-tr from-sky-100 rounded-md shadow-xl"
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)}
        >
          <div className='border -mt-6 p-2 mx-auto text-center text-white w-40 skew-x-6 bg-black block md:hidden'>
              Dashboards
          </div>
          <p className='px-4 pt-2 hidden sm:block'>Dashboards</p>
          <div className="hover:scale-110 md:hover:scale-125 p-4 transition-all">
            <video ref={videoRefs[0]} className="opacity-90 object-cover border" loop muted playsInline>
              <source src="https://ducaqjqbmh7lv.cloudfront.net/mysite/dashboard.mp4" />
            </video>
          </div>
          <div className='block md:hidden'>
            <div className={`p-8 md:p-12 border grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3 md:gap-x-4 ${themeClass}`}>
              <p className='text-sm md:text-sm col-span-2 mr-2 pr-2 border-double border-r-4 border-b-4'>
                Streamline your asset and inventory management with our dynamic dashboards. Seamlessly integrate teams, empower managers, and assess inventory at a glance. Plan for the future with data-backed insights, optimizing orders and operations for increased efficiency.
              </p>
              <div className='ml-4 text-xs md:text-sm'>
                <p className='font-mono bg-slate-100 -mb-3 w-24 mx-auto text-center border'> Tech Stack </p>
                <ul class="list-inside border p-2 divide-y list-image-[url(7.svg)]">
                  <li className='mt-4'>Django Rest Framework</li>
                  <li>React</li>
                  <li>NextJs</li>
                  <li>Tailwind</li>
                  <li>AWS EC2</li>
                  <li>Vercel</li>
                </ul>
                <Link href={{ pathname: '/projects/detail', query: { name: 'dashboard'} }} passHref>
                  <p className='p-1 bg-indigo-600 hover:bg-indigo-300 italic transition-all rounded-md mt-2 mx-auto text-center'>Learn More</p>
                </Link>
              </div>
            </div>
        </div>
        </div>
        <div className='hidden sm:block'>
          <div className={`border -mb-6 p-2 mx-auto text-center w-40 relative skew-x-6 ${themeClass2}`}>
            Dashboards
          </div>
          <div className={`p-8 md:p-12 border grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3 md:gap-x-4 ${themeClass}`}>
            <p className='md:text-lg col-span-2 mr-2 pr-2 border-double border-r-4 border-b-4'>
              Streamline your asset and inventory management with our dynamic dashboards. Seamlessly integrate teams, empower managers, and assess inventory at a glance. Plan for the future with data-backed insights, optimizing orders and operations for increased efficiency.
            </p>
            <div className='ml-4 text-xs md:text-sm'>
              <p className={`font-mono -mb-3 w-24 mx-auto text-center border z-10 ${themeClass2}`}> Tech Stack </p>
              <ul class="list-inside border p-2 divide-y list-image-[url(7.svg)]">
                <li className='mt-4'>Django Rest Framework</li>
                <li>React</li>
                <li>NextJs</li>
                <li>Tailwind</li>
                <li>AWS EC2</li>
                <li>Vercel</li>
              </ul>
              <Link href={{ pathname: '/projects/detail', query: { name: 'dashboard'} }} passHref>
                <p className='p-1 bg-indigo-600 hover:bg-indigo-300 italic transition-all rounded-md mt-2 mx-auto text-center'>Learn More</p>
              </Link>
            </div>
          </div>
        </div>

        <div
          className="md:p-2 bg-gradient-to-tr from-sky-100 rounded-md shadow-xl"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
        >

          <div className='block md:hidden border -mt-6 p-2 mx-auto text-center text-white w-40 relative skew-x-6 bg-black '>
            E-Commerce
          </div>
          <p className='px-4 pt-2 hidden sm:block'> E-commerce website</p>
          <div className="hover:scale-110 md:hover:scale-125 p-4 transition-all">
            <video ref={videoRefs[1]} className="opacity-90 object-cover border" loop muted playsInline>
              <source src="https://ducaqjqbmh7lv.cloudfront.net/mysite/ecom.mp4" />
            </video>
          </div>
          <div className='block md:hidden'>
            <div className={`p-8 md:p-12 border grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3 md:gap-x-4 ${themeClass}`}>
              <p className='text-sm md:text-sm col-span-2 mr-2 pr-2 border-double border-r-4 border-b-4'>
                Experience the epitome of ecommerce brilliance with our Next.js, Tailwind, and Django API powered template. Seamlessly integrate your business, relishing stunning design and effortless functionality. Elevate your online presence today with easy integration and captivating aesthetics.
              </p>
              <div className='ml-4 text-xs md:text-sm'>
                <p className='font-mono bg-slate-100 -mb-3 w-24 mx-auto text-center border'> Tech Stack </p>
                <ul class="list-inside border p-2 divide-y list-image-[url(7.svg)]">
                  <li className='mt-4'>Django Rest Framework</li>
                  <li>PostgreSQL</li>
                  <li>React</li>
                  <li>NextJs</li>
                  <li>Tailwind</li>
                  <li>AWS EC2</li>
                </ul>
                <Link href={{ pathname: '/projects/detail', query: { name: 'ecommerce'} }} passHref>
                  <p className='p-1 bg-indigo-600 hover:bg-indigo-300 italic transition-all rounded-md mt-2 mx-auto text-center'>Learn More</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
         <div className='hidden sm:block'>
          <div className='border -mb-6 p-2 mx-auto text-center text-white w-40 relative skew-x-6 bg-black '>
            E-Commerce
          </div>
        <div className={`p-8 md:p-12 border grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3 md:gap-x-4 ${themeClass}`}>
          <p className='text-xs md:text-lg col-span-2 mr-2 pr-2 border-double border-r-4 border-b-4'>
            Experience the epitome of ecommerce brilliance with our Next.js, Tailwind, and Django API powered template. Seamlessly integrate your business, relishing stunning design and effortless functionality. Elevate your online presence today with easy integration and captivating aesthetics.
          </p>
          <div className='ml-4 text-xs md:text-sm'>
            <p className='font-mono bg-slate-100 -mb-3 w-24 mx-auto text-center border'> Tech Stack </p>
            <ul class="list-inside border p-2 divide-y list-image-[url(7.svg)]">
              <li className='mt-4'>Django Rest Framework</li>
              <li>PostgreSQL</li>
              <li>React</li>
              <li>NextJs</li>
              <li>Tailwind</li>
              <li>AWS EC2</li>
            </ul>
            <Link href={{ pathname: '/projects/detail', query: { name: 'ecommerce'} }} passHref>
              <p className='p-1 bg-indigo-600 hover:bg-indigo-300 italic transition-all rounded-md mt-2 mx-auto text-center'>Learn More</p>
            </Link>
          </div>
        </div>
        </div>

        <div
          className="md:p-2 bg-gradient-to-tr from-sky-100 rounded-md shadow-xl"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
        >
          <div className=' block md:hidden border -mt-6 p-2 mx-auto text-center text-white w-40 relative skew-x-6 bg-black '>
            Data Visualisation
          </div>
          <p className='px-4 pt-2 hidden sm:block'> Data Visualisation</p>
          <div className="hover:scale-110 md:hover:scale-125 p-4 transition-all">
            <video ref={videoRefs[2]} className="opacity-90 object-cover border" loop muted playsInline>
              <source src="https://ducaqjqbmh7lv.cloudfront.net/mysite/visualization.mp4" />
            </video>
          </div>
          <div className='block md:hidden'>
            <div className={`p-8 md:p-12 border grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3 md:gap-x-4 ${themeClass}`}>
              <p className='text-sm col-span-2 mr-2 pr-2 border-double border-r-4 border-b-4'>
                Unlock operational excellence through data visualization. Leverage AWS QuickSight to gain comprehensive insights instantly. Dive into data points, detect anomalies, and steer performance with precision. Elevate decision-making and efficiency, all from a single, intuitive interface.
              </p>
              <div className='ml-4 text-xs md:text-sm'>
                <p className='font-mono bg-slate-100 -mb-3 w-24 mx-auto text-center border'> Tech Stack </p>
                <ul class="list-inside border p-2 divide-y list-image-[url(7.svg)]">
                  <li className='mt-4'>AWS Quicksight</li>
                  <li>Bootstrap 5</li>
                  <li>PostgreSQL</li>
                  <li>AWS S3</li>
                  <li>AWS IOT Core</li>
                </ul>
                <Link href={{ pathname: '/projects/detail', query: { name: 'visualization'} }} passHref>
                  <p className='p-1 bg-indigo-600 hover:bg-indigo-300 italic transition-all rounded-md mt-2 mx-auto text-center'>Learn More</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden sm:block'>
          <div className='border -mb-6 p-2 mx-auto text-center text-white w-40 skew-x-6 bg-black '>
            Data Visualisation
          </div>
        <div className={`p-8 md:p-12 border grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3 md:gap-x-4 ${themeClass}`}>
          <p className='md:text-lg col-span-2 mr-2 pr-2 border-double border-r-4 border-b-4'>
            Unlock operational excellence through data visualization. Leverage AWS QuickSight to gain comprehensive insights instantly. Dive into data points, detect anomalies, and steer performance with precision. Elevate decision-making and efficiency, all from a single, intuitive interface.
          </p>
          <div className='ml-4 text-xs md:text-sm'>
            <p className='font-mono bg-slate-100 -mb-3 w-24 mx-auto text-center border'> Tech Stack </p>
            <ul class="list-inside border p-2 divide-y list-image-[url(7.svg)]">
              <li className='mt-4'>AWS Quicksight</li>
              <li>Bootstrap 5</li>
              <li>PostgreSQL</li>
              <li>AWS S3</li>
              <li>AWS IOT Core</li>
            </ul>
            <Link href={{ pathname: '/projects/detail', query: { name: 'visualization'} }} passHref>
              <p className='p-1 bg-indigo-600 hover:bg-indigo-300 italic transition-all rounded-md mt-2 mx-auto text-center'>Learn More</p>
            </Link>
          </div>
        </div>
        </div>
      </div>
      <div className='p-20'>
        <Link href="/projects">
          <p className='border p-2 mx-auto text-center text-white w-32 relative skew-x-6 bg-black '>
                View All
          </p>
        </Link>
      </div>
      </div>
    </div>
  );
}
