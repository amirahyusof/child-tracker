"use client"

import { Home, User, Candy, Sticker } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../firebase/hook';
import { useRouter, useSearchParams } from 'next/navigation';

export default function NavBar() {
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  
  const { logout } = useAuth();
  const router = useRouter();


  const navItems = [
    { href: "/mainpage", icon: Home, label: 'Home' },
    { href: "/mainpage/listActivity", icon: Sticker, label: 'Activity' },
    { href: "/mainpage/child-data", icon: Candy, label: 'Kids' },
    { href: "/mainpage/profile", icon: User, label: 'Profile' },
    
  ];

  return (
    <>
      {/* Navigation bar bottom */}
        <div className="fixed bottom-0 left-0 right-0 flex flex-row justify-center mx-auto w-11/12 bg-[#FFB4B4] text-white">
          <div className="p-4">
            <nav>
              <ul className="grid grid-cols-4 gap-24">
            {navItems.map((item, index) => (
              <li key={index}>
            <Link 
              href={item.href}
              className="flex flex-col items-center hover:bg-[#FFDEB4] rounded-lg transition-colors"
            >
              <item.icon size={40} />
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




