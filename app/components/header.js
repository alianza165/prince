import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon, XMarkIcon, SunIcon, MoonIcon, HomeIcon, UserGroupIcon, FolderIcon, CalendarIcon, ClipboardDocumentIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '../context/AppContext';

const navigation = [


  { name: 'Home', href: '/', current: true },
  { name: 'Products', href: '/projects', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Header() {

  const { theme, isOpen, toggleSidebar,toggleTheme } = useAppContext();

  const logoClass = theme === 'dark' ? 'https://ducaqjqbmh7lv.cloudfront.net/mysite/logo_dark1.png' : 'https://ducaqjqbmh7lv.cloudfront.net/mysite/prince_logo7.png';
  const bgImage = theme === 'dark' ? 'https://ducaqjqbmh7lv.cloudfront.net/mysite/dark_blur.jpg' : 'https://ducaqjqbmh7lv.cloudfront.net/mysite/prince_icn.svg';
  const strokeClass = theme === 'dark' ? "#ffffff" : "#2f2f2f";
  const bgColor = theme === 'dark' ? "bg-white text-slate-900" : "bg-black text-white";
  const sideBar = theme === 'dark' ? "bg-neutral-800 text-slate-200" : "bg-teal-400 text-slate-900";
  const bgClass = `url(${bgImage})`;

  return (
    <div
            className="bg-fixed bg-cover bg-center divide-neutral-300"
            style={{ backgroundImage: bgClass }}
          >

    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 z-20">
            <div className="relative flex h-20 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Transition
                  show={!isOpen}
                  enter="transition ease-out duration-300"
                  enterFrom="transform opacity-0 -translate-x-full"
                  enterTo="transform opacity-100 translate-x-0"
                  leave="transition ease-in duration-300"
                  leaveFrom="transform opacity-100 translate-x-0"
                  leaveTo="transform opacity-0 -translate-x-full"
                >
                  <Link href={{ pathname: '/' }} passHref>
                    <div className="flex w-full justify-center lg:justify-start items-center"> {/* Center-align on mobile, left-align on large screens */}
                      <div className="flex-shrink-0 relative z-10"> {/* Prevents logo from expanding and ensures layering */}
                        <Image
                          className="block w-auto lg:hidden mt-2"  // Center-align image on mobile
                          src={logoClass}
                          width={120}
                          height={50}
                        />
                        <Image
                          className="hidden lg:block ml-10 mt-2 ml-10"  // Original styling for larger screens
                          src={logoClass}
                          width={150}
                          height={50}
                        />
                      </div>
                    </div>
                  </Link>

                </Transition>
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <button onClick={toggleSidebar} className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-4 w-4" stroke={strokeClass} aria-hidden="true" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={strokeClass} className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center hidden sm:block mr-20">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center">
                    <div className="bg-red-500 rounded-full p-2 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Call Us:</p>
                      <p className="text-sm">+92-42-575292, 5753373</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-600 rounded-full p-2 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Address:</p>
                      <p className="text-sm">2-P Gulberg II, Lahore, Pakistan.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav className="bg-red-500 hidden lg:block">
            <div className="container mx-auto px-4">
              <div className="flex justify-center items-center">

                <ul className="flex space-x-16 py-4">
                  {['Home', 'Products', 'Services', 'Testimonials', 'Projects', 'Latest News', 'Contact Us'].map((item) => (
                    <li key={item}>
                      <Link
                        href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                        className="text-white hover:text-gray-200 transition duration-150 ease-in-out"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </nav>

            <div className={`block lg:hidden z-10 fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform ${sideBar} duration-300 ease-in-out md:w-60 w-full px-4`}>
              <div className="flex my-2 md:my-0">
                <button 
                  className={`relative ${isOpen ? 'md:ml-0 mt-2 md:mt-4' : 'md:ml-44'} ml-full p-2 ${bgColor} hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`} 
                  onClick={toggleSidebar}>
                    {isOpen ? (
                      <XMarkIcon className="block md:h-6 md:w-6 w-4 h-4 mt-0" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block md:h-8 md:w-8 w-4 h-4" aria-hidden="true" />
                    )}
                </button>
                <Link href={{pathname: '/'}} passHref className="ml-6 md:mt-4 mt-2">
                    <Image
                      className="block w-auto lg:hidden"
                      src={logoClass}
                      width={150}
                      height={80}
                    />
                </Link>
              </div>
              <Link href="/dashboard" className='flex mt-10 hover:bg-teal-600 p-2 rounded-md cursor-pointer'>
                <HomeIcon className="w-6 h-6 text-gray-800" stroke={strokeClass} />
                <p className='pl-4 pt-1'> Dashboard </p>
              </Link>
              <Link href="/teams" className='flex hover:bg-teal-600 p-2 rounded-md cursor-pointer'>
                <UserGroupIcon className="w-6 h-6 text-gray-800" stroke={strokeClass} />
                <p className='pl-4 pt-1'> Teams </p>
              </Link>
              <div className='flex hover:bg-teal-600 p-2 rounded-md cursor-pointer'>
                <FolderIcon className="w-6 h-6 text-gray-800" stroke={strokeClass} />
                <p className='pl-4 pt-1'> Projects </p>
              </div>
              <div className='flex hover:bg-teal-600 p-2 rounded-md cursor-pointer'>
                <CalendarIcon className="w-6 h-6 text-gray-800" stroke={strokeClass} />
                <p className='pl-4 pt-1'> Calendar </p>
              </div>
              <div className='flex hover:bg-teal-600 p-2 rounded-md cursor-pointer'>
                <ClipboardDocumentIcon className="w-6 h-6 text-gray-800" stroke={strokeClass} />
                <p className='pl-4 pt-1'> Documents </p>
              </div>
              <div className='flex hover:bg-teal-600 p-2 rounded-md cursor-pointer'>
                <ChartPieIcon className="w-6 h-6 text-gray-800" stroke={strokeClass} />
                <p className='pl-4 pt-1'> Reports </p>
              </div>
              <h1 className="text-2xl font-bold my-4">Sidebar</h1>
              <ul>
                <li className="mt-4">Item 1</li>
                <li className="mt-4">Item 2</li>
                <li className="mt-4">Item 3</li>
              </ul>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  )
}
