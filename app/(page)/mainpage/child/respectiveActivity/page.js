"use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ListActivity from '@/app/interface/ListActivity';
import Image from 'next/image';

export default function ActivityRespectiveChild() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const childId = searchParams.get('childId');
  const [child, setChild] = useState(null);
  const [childActivities, setChildActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!childId) return;

    try {
      //parse child Id as number
      const parsedChildId = parseInt(childId);

      //Load child profiles from local storage
      const storageChildDetail = JSON.parse(localStorage.getItem('childrenData') || '[]');
      const selectedChild = storageChildDetail.find((child)=> child.id === parsedChildId);
      setChild(selectedChild);
      console.log('Child Data in Activity:', storageChildDetail);

      //Load child's activities from local storage
      const storageActivity = JSON.parse(localStorage.getItem('activityData') || '[]');
      const filteredActivity = storageActivity.filter((activity) => activity.childId === parsedChildId);
      setChildActivities(filteredActivity);
      console.log('Activity Data of this child:', storageActivity);
      
      console.log("childId from URL:", childId);
      console.log("Parsed childId:", parsedChildId);


      setLoading(false);
    } catch(err) {
      setError("Failed to load data");
      setLoading(false);
    }
    
  }, [childId]);

  if (error) {
    return <div className="text-red-500 text-center p-6" >Error: {error}</div>;
  }

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <section className='p-6 min-h-screen bg-[#FFF9CA]'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          {child ? (
            <>
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={child.avatar?.src || '/placeholder.png'} 
                  width={200}
                  height={200}
                  alt={child.avatar?.alt || "Child's avatar"} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className='text-xl'>
                List Activities of <span className='font-semibold'>{child.name}</span>
              </h1>
            </>
          ) : (
            <p className="text-gray-500">
              Child not found
            </p>
          )}
        </div>


        {/* Buttons for profile & adding task */}
        <div className='flex flex-row gap-2'>
          {/* Need to fix */}
          <button 
            onClick={() => router.push(`/mainpage/profile/parent/child?childId=${childId}`)}
            className='place-items-center mt-4 max-w-xs bg-[#FF9494] text-white px-4 py-2 rounded hover:bg-[#FFD1D1] transition'
          >
            View Profile
          </button>

          <button 
            onClick={() => router.push(`/mainpage/activities/create?childId=${childId}`)}
            className='place-items-center mt-4 max-w-xs bg-[#FF9494] text-white px-4 py-2 rounded hover:bg-[#FFD1D1] transition'
          >
            + Task
          </button>
        </div>
      </div>
      
      {/* Activity List */}
      <div className='flex flex-col'>
        {/* Conditional rendering for tasks */}
        {(!childActivities || childActivities.length === 0) ? (
          <div className="mt-8 text-left ml-10">
            <p className="text-gray-500">No tasks yet</p>
            <p className="text-sm text-gray-400">
              Click "+ Task" to create your child's first task
            </p>
          </div>
          ) : (
            //need to fixed
          <ListActivity 
            activityData={childActivities}
            setActivityData = {setChildActivities}
          />
        )}
      </div>
    </section>
  );
}



