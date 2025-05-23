"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import Link from 'next/link';
import FullScreenError from '@/app/components/error';
import SuccessBanner from '@/app/components/successBanner';

const colorOptions = [
  '#FFB4B4', '#FFD1B4', '#FFE0B4', '#D4FFB4', '#B4FFF9', 
  '#D4B4FF', '#E4FBFF', '#A6B37D','#B99470' , '#8E1616'
];

function getInitialsName(name){
  return name
  .split(' ')
  .map((word => word[0]))
  .join("")
  .toUpperCase();
}


export default function CreateChildProfile() {
  const router = useRouter();
  const [childData, setChildData] = useState({
    name: "", 
    age: "", 
    bgcolor: colorOptions[0],
    
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMaxReached, setIsMaxReached] = useState(false);
  const [success, setSuccess] = useState(false);
  

  useEffect(() => {
    //check existing children count from local storage
    const existingChildren = JSON.parse(localStorage.getItem('childrenData') || '[]');
     setIsMaxReached(existingChildren.length >= 3);
  }, []);

  const handleAddChildProfile = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate inputs
    if (!childData.name || !childData.age || !childData.bgcolor) {
      setError('Please fill out all required fields and select a background color');
      setIsSubmitting(false);
      return;
    }

    //get existing children from local storage
    const existingChildren = JSON.parse(localStorage.getItem('childrenData') || '[]');

    if(existingChildren.length >= 3) {
      setError('Maximum to create child profile is 3');
      setIsSubmitting(false);
      return;
    }

    //create new child profile
    const newChild = {
      id: Date.now(),
      name: childData.name,
      age: childData.age,
      avatar: {
        type: "initials",
        initials: getInitialsName(childData.name),
        bgcolor: childData.bgcolor,
      }
    };

    const  updatedChildren = [...existingChildren, newChild];

    //save new child profile to local storage
    localStorage.setItem('childrenData', JSON.stringify(updatedChildren));
    setSuccess(true);
    setTimeout(() => {
      router.push("/mainpage");
    }, 5000);
  };

  if (error) return <FullScreenError message={error} />;

  
  return (
    <section className="w-full p-8 mb-20 dark:bg-gray-900 transition-colors duration-300">
      {success && (
        <SuccessBanner
          message="Child profile created successfully!"
          onClose={() => setSuccess(false)}
        />
      )}
      <div className="flex flex-col">
        <div className="mt-2">
          <h1 className="text-xl md:text-2xl font-bold lg:mx-auto lg:text-center">Add Child Profile</h1>
        </div>

        {isMaxReached ? (
          <div className='flex flex-col items-center justify-center' >
            <div className="text-red-500 mt-4 text-center">
              Maximum number of child profiles reached. Please delete an existing profile to add a new one.
            </div>
            <button type="button" className='btn mt-4 border-white bg-[#FFB4B4] hover:border-[#FFDEB4] hover:bg-[#FFB4B4]/80 text-white'>
              <Link href={"/mainpage"}>
                Back to Main Page
              </Link>
            </button>
          </div>
          ) : (
          <div className="mt-4 max-w-screen-lg bg-white shrink-0 rounded-2xl shadow-2xl p-6 lg:mx-auto">
            <form onSubmit={handleAddChildProfile}>
              {error && <div className="text-red-500 mb-4">{error}</div>}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input 
                  type="text"
                  placeholder="Name"
                  value={childData.name}
                  onChange={(e) => setChildData({...childData, name:e.target.value})}
                  className="input input-bordered input-md bg-white w-full"
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
                  className="input input-bordered input-md bg-white w-full"
                  required
                  min="0"
                  max="18"
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Select Avatar Background Color</span>
                </label>
                <div className='flex gap-2 flex-wrap'>
                  {colorOptions.map((color) => (
                    <div  
                      key={color}
                      className={`cursor-pointer w-12 h-12 rounded-full border-4 ${
                        childData.bgcolor === color
                          ? 'border-pink-400 scale-110' 
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setChildData({...childData, bgcolor: color})}
                    >
                    </div>
                  ))}
                </div>
              </div>

              {childData.name && (
                <div className='mt-4'>
                  <label>Avatar Preview</label>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow"
                    style={{ backgroundColor: childData.bgcolor }}        
                  >
                    {getInitialsName(childData.name)}
                  </div>
                </div>
              )}

              <div className="form-control flex flex-row mt-6 space-x-4 justify-end">
                <button 
                  type="submit" 
                  className={`
                    btn btn-md border-pink-400 border-2 bg-[#FFB4B4] hover:border-[#FFDEB4] hover:bg-[#FFB4B4]/80 text-white
                    ${isSubmitting ? 'bg-pink-400': ''}
                    disabled:bg-[#FFE0E0] 
                    disabled:border-[#FFB4B4] 
                    disabled:text-gray-400 
                    disabled:cursor-not-allowed
                    `}
                  disabled = {isSubmitting || isMaxReached}
                >
                  { isSubmitting ? 'Adding...' : 'Add Child'}
                </button>

                <button type="button" className='btn btn-md bg-gray-500 text-white'>
                  <Link href={"/mainpage"}>
                    Cancel
                  </Link>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}