"use client"

import React, {useState, useEffect} from "react";
import ActivityCard from "@/app/interface/activityCard-Undone";
import AvatarChild from "@/app/interface/avatarChild";

export default function Dashboard(){
  const [childData, setChildData] = useState([]);
  const [activityUndoneData, setActivityUndoneData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //get child profile from local storage
    const data = JSON.parse(localStorage.getItem('childrenData') || '[]');
    setChildData(data);
  }, []);

  // if(loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <section className="bg-[#FFF9CA]">
      <AvatarChild childData={childData} />
      <ActivityCard data={activityUndoneData} />
    </section>
  );
};
