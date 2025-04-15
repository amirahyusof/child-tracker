
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react';
  
export default function AvatarChild({childData}) {
  //save child data to local storage
  // const [childData, setChildData] = useState([]);

  // useEffect(() => {
  //   //Load child profiles from local storage
  //   const storageData = JSON.parse(localStorage.getItem('childrenData') || '[]');
  //   setChildData(storageData);
  //   console.log('Child Data in AvatarChild:', storageData);
  // }, [])

  return (
    <section className='p-4 w-full'>
      <h1 className='text-xl font-bold'>Your Children</h1>
      <div className='flex mt-4 gap-2 overflow-x-auto'>
        {/* Add Profile Button */}
        <div className='avatar placeholder'>
          <Link href={"/mainpage/child"}>
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
        {childData.length <= 3 ? (
          childData.map((child) => (
            <div key={child.id} className='avatar flex flex-col cursor-pointer '>
              {/* Avatar with Link to respective activity */}
              <Link href={`/mainpage/child/respectiveActivity?childId=${child.id}`}>
                <div className='w-20 h-20 rounded-full flex items-center justify-center'
                   style={{ backgroundColor: child.avatar.bgcolor }}
                >
                  <span className='text-white text-4xl font-bold'>
                    {child.avatar.initials}
                  </span>
                </div>
              </Link>
              <p className='text-sm text-center mt-2 text-gray-400'>{child.name || "Unknown"}</p>
            </div>
          ))
        ) : (
          <p className='text-gray-500 mt-4'>No child profiles found.</p>
        )}
      </div>
    </section>
  )
}

