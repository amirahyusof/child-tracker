"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AllChildActivities() {
  const [childData, setChildData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      // Get all children and activities from local storage
      const childrenData = JSON.parse(localStorage.getItem('childrenData') || '[]');
      const activitiesData = JSON.parse(localStorage.getItem('activitiesData') || '[]');
      
      setChildData(childrenData);

      if(childrenData.length === 0 || activitiesData.length === 0) {
        setLoading(false);
        return;

      }
          
      //Map activities to respective child
        const mappedActivities = activitiesData.map((activity) => {
          const child = childrenData.find((child) => child.id === activity.childId) || {};
          return {
            ...activity,
            childName: child.name || "N/A",
            childAvatar: child.avatar?.src || "/placeholder",
            childImageAlt: child.avatar?.alt || "Child's Avatar",
          };
        });
      
      setActivities(mappedActivities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError("Failed to fetch activities");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <section className="p-6 min-h-screen bg-[#FFF9CA]">
      <h1 className="text-2xl font-bold mb-6">List of Activities</h1>

      {/* Activities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="card">
              <div className="card-body flex flex-row bg-white w-80 p-4 rounded-lg shadow">
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <Image
                    src={activity.childAvatar}
                    alt={activity.childImageAlt}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder'; // Fallback image
                    }}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-medium">
                    Activity: <span>{activity.name || 'N/A'}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Child: <span>{activity.childName}</span>
                  </p>
                  <p>Due Date: {" "}
                    <span>
                      {activity.dueDate 
                      ? new Date(activity.dueDate).toLocaleDateString() 
                      : "N/A"}</span>
                  </p>
                  <p>Status: {" "}
                    <span className={
                    activity.status === "undone" 
                      ? "text-red-500" 
                      : "text-green-500"
                    }>
                    {activity.status || "N/A"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No activities found</p>
        )}
      </div>
    </section>
  );
}