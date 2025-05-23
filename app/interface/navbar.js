"use client"

import { ScrollText, Settings, Candy, Sticker, Scroll } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const [error, setError] = useState('');

  const router = useRouter();


  const navItems = [
    { href: "/mainpage", icon: ScrollText, label: 'Main' },
    { href: "/mainpage/listActivity", icon: Sticker, label: 'Activity' },
    { href: "/mainpage/listChildren", icon: Candy, label: 'Children' },
    { href: "/mainpage/more", icon: Settings, label: 'More' },
    
  ];

  return (
    <>
      {/* Navigation bar bottom */}
        <div className="fixed bottom-0 left-0 right-0 flex flex-row justify-center mx-auto w-11/12 rounded-2xl bg-[#FFB4B4] text-white">
          <div className="p-4 mx-6 sm:mx-0">
            <nav>
              <ul className="grid grid-cols-4 gap-20 md:gap-24">
            {navItems.map((item, index) => (
              <li key={index}>
            <Link 
              href={item.href}
              className="flex flex-col items-center rounded-lg transition-colors"
            >
              <item.icon size={30} className='hover:bg-[#FFDEB4]/70 rounded-lg' />
              <span className="items-center">{item.label}</span>
            </Link>
              </li>
            ))}
          </ul>
            </nav>
          </div>
        </div>

        {/* Spacer for mobile layout */}
      <div className="h-16 md:h-0"></div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded shadow-lg">
          {error}
        </div>
      )}
    </>
  );
}




