import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { Plus } from 'lucide-react';
  
export default function AvatarChild({childData}) {
  //save child data to local storage
  const [childData, setChildData] = useState([]);

  useEffect(() => {
    //Load child profiles from local storage
    const storageData = JSON.parse(localStorage.getItem('childrenData')) || [];
    setChildData(storageData);
    console.log('Child Data in AvatarChild:', childData);
  }, [])

  return (
    <section className='p-6 w-full'>
      <h1 className='text-xl font-bold'>Your Children</h1>
      <div className='flex mt-4 gap-2 overflow-x-auto'>
        {/* Add Profile Button */}
        <div className='avatar placeholder'>
          <Link href={"/mainpage/child-data"}>
            <div className='w-20 h-20 bg-[#FFB4B4] rounded-full flex items-center justify-center'>
              <span className='text-white'>
                <Plus className='h-10 w-10' />
              </span>
            </div>
            <p className='mt-2 text-sm text-center'>
              Add Profile
            </p>
          </Link>
        </div>

        {/* Render Child Avatars */}
        {childData.map((child) => (
          <div key={child.id} className='avatar flex flex-col cursor-pointer '>
            <div className='avatar w-20 h-20 space-x-2 rounded-full border-2 overflow-hidden'>
              <Link href={`/mainpage/listActivity?childId=${child.id}`}>
                <Image
                  src={child.imageUrl}
                  width={100}
                  height={100}
                  alt={child.avatarAlt || "Child's avatar"}
                  className='w-full h-full object-cover'
                />
              </Link>
            </div>
            <p className='text-sm text-center mt-2 text-gray-400'>{child.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

