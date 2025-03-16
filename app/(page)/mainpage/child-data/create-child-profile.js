"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import GirlKid from '@/public/asset/avatar/kidgirl.png';
import BoyKid from '@/public/asset/avatar/kidboy.png';
import GirlTeenager from '@/public/asset/avatar/teenagergirl.png'
import BoyTeenager from '@/public/asset/avatar/teenagerboy.png'
import BabyGirl from '@/public/asset/avatar/babygirl.png'
import BabyBoy from '@/public/asset/avatar/babyboy.png'
import { routeDB } from '@/app/firebase/api/route';

export default function ChildProfile() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const [childData, setChildData] = useState({
    name: "", 
    age: "", 
    avatar: null
  });
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [childCount, setChildCount] = useState(0);

  const router = useRouter();
  // Avatar options
  const avatarOptions = [
    { id: 'girl-kid', src: GirlKid, alt: 'Girl Kid' },
    { id: 'boy-kid', src: BoyKid, alt: 'Boy Kid' },
    { id: 'girl-teen', src: GirlTeenager, alt: 'Girl Teenager' },
    { id: 'boy-teen', src: BoyTeenager, alt: 'Boy Teenager' },
    { id: 'baby-girl', src: BabyGirl, alt: 'Baby Girl' },
    { id: 'baby-boy', src: BabyBoy, alt: 'Baby Boy' }
  ];

  useEffect(() => {
    setIsClient(true);

    //check existing children count from local storage
    const exixtingChildren = JSON.parse(localStorage.getItem('childrenData') || '[]');
    setChildCount(exixtingChildren.length);
  }, []);

  const handleAddChildProfile = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate inputs
    if (!childData.name || !childData.age || !childData.avatar) {
      setError('Please fill out all required fields and select an avatar');
      setIsSubmitting(false);
      return;
    }

    try {
      //get existing children from local storage
      const existingChildren = JSON.parse(localStorage.getItem('childrenData') || '[]');

      if(existingChildren.length >= 2) {
        setError('Maximum child profile is 2');
        setIsSubmitting(false);
        return;
      }

      //create new child profile
      const newChild = {
        id: childCount + 1,
        name: childData.name,
        age: childData.age,
        avatar: childData.avatar
      };

      const  updatedChildren = [...existingChildren, newChild];

      //SAVE T
      localStorage.setItem('childrenData', JSON.stringify(updatedChildren));
      console.log(childData);
      alert('Successfully Create Child Profile!');
      router.push(`/mainpage?userId=${userId}`);
    } catch (err) {
      console.error('Full error:', err);
      setError('Failed to create child profile: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent rendering on server
  if (!isClient) {
    return null;
  }

  return (
    <section className="w-full bg-[] p-8">
      <div className="flex flex-col">
        <div className="mt-2">
          <h1 className="text-2xl md:text-3xl font-bold">Add Child Profile</h1>
        </div>

        <div className="mt-4 w-full bg-white shrink-0 rounded-2xl shadow-2xl p-6">
          <form onSubmit={handleAddChildProfile}>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Child Name</span>
              </label>
              <input 
                type="text"
                placeholder="Name"
                value={childData.name}
                onChange={(e) => setChildData({...childData, name:e.target.value})}
                className="input input-bordered input-md bg-white w-full max-w-md"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input 
                type="number"
                placeholder="Age"
                value={childData.age}
                onChange={(e) => setChildData({...childData, age:e.target.value})}
                className="input input-bordered input-md bg-white w-full max-w-md"
                required
                min="0"
                max="18"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Child Avatar</span>
              </label>
              <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2'>
                {avatarOptions.map((avatar) => (
                  <div  
                    key={avatar.id}
                    className={`cursor-pointer p-2 border-4 rounded-3xl transition-all duration-300 ${
                      childData.avatar?.id === avatar.id 
                        ? 'border-blue-300 scale-105 ' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    onClick={() => setChildData({...childData, avatar: avatar})}
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      width={150}
                      height={150}
                      className='mx-auto'
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-control flex flex-row mt-6 space-x-4 justify-end">
              <button 
                type="submit" 
                className={`
                  btn btn-md border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black
                  ${isSubmitting ? 'Adding': 'Adding'}
                  `}
                disabled = {isSubmitting}
              >
                { isSubmitting ? 'Adding...' : 'Add Child'}
              </button>

              <Link href={`/mainpage?userId=${userId}`}>
                <button type="button" className='btn btn-md btn-neutral text-white'>
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}