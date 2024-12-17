
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/app/firebase/config';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp, 
  addDoc,
  deleteDoc,
  orderBy
} from 'firebase/firestore';


export const routeDB = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [childData, setChildData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          // Fetch user document
          const userDoc = await getUserDocument(user.uid);
          setUserData(userDoc);

          try {
            const childDoc = await getChildData(user.uid);
            setChildData(childDoc);
          } catch (childError){
            console.log("No child document found:", childError)
            setChildData([])
          }
        } catch (error) {
          console.error("Error fetching user", error);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createUserDocument = async (userId, userData) => {
    try {
      await setDoc(doc(db, 'users', userId), userData);
    } catch(error){
      console.error("Error creating user document:", error)
      throw error;
    }
  };

  const getUserDocument = async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnapshot = await getDoc(docRef);
      return docSnapshot.exists() ? docSnapshot.data() : null;
    } catch(error){
      console.error("Error getting user document:", error);
      throw error;
    }
  };

  const createChild = async (userId, childData) => {
    try {
      // Ensure we have a valid user ID
      const id = userId?.uid || userId;
    
      if(!id) {
        throw new Error('Invalid user ID')
      }
      
      // Use a unique ID for each child document
      const childRef = await addDoc(collection(db, 'users', id, 'children'), {
        ...childData,
        createdAt: serverTimestamp()
      });

      return childRef.id;
    } catch (error){
      console.error("Error adding child document:", error);
      throw error;
    }
  };

  const getChildData = async (userId) => {
    try {
      const childrenRef = collection(db, 'users', userId, 'children');
      const querySnapshot = await getDocs(childrenRef);

      // Return an array of child documents
      const children =  querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('Fetched Children:', children);
      return children
    } catch(error) {
      console.error("Error getting child document:", error);
      return [];
    }
  };

  const createActivity = async ( userId, activity, childId) => {
    try {
      const activityRef= await addDoc(
        collection(db,'users',userId,'children', childId, 'activities'), 
        {
        ...activity,  
        status: "undone",
        createdAt: serverTimestamp()
      });
      return activityRef.id;
    } catch (error){
      console.error('Error adding task:', error)
    }
  };

  const getActivity = async (userId, childId) => {
    try {
      const q = query(
        collection(db,'users',userId, 'children', childId ,'activities'),
        where('childId', '==', childId),
        orderBy('createedAt', 'desc'),
      );
  
      const querySnapshot = await getDocs(q);
  
      const activities = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return activities;
    } catch (error) {
      console.error('Detailed error fetching activity:', error);
      throw error;
    }
  };

  const updateActivity = async (userId, childId, activityId, updatedData) => {
    try {
      const activityRef = doc(db,'users', userId, 'children', childId, 'activities', activityId);
      await updateDoc(activityRef, {
        ...updatedData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const getActivityById = async (userId, childId, activityId) => {
    try {
      const activityRef = doc(db,'users', userId, 'children', childId, 'activities', activityId);
      const activitySnapshot = await getDoc(activityRef);
  
      if (!activitySnapshot.exists()) {
        throw new Error('Activity not found');
      }
  
      return {
        id: activitySnapshot.id,
        ...activitySnapshot.data()
      };
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      throw error;
    }
  };

  const getAllUndoneActivities = async (userId) => {
    try{
      const userChildren = await getChildData(userId);

      if(!userChildren || userChildren.length === 0) {
        return []
      }

      const undoneActivities = [];

      //fetch tasks for each child
      for (const child of userChildren){
        const q = query(
          collection(db, 'users', userId, 'children', child.id, 'activities'), 
          where ('status', '==','undone'),
        );

        const querySnapshot = await getDocs(q)
        querySnapshot.docs.forEach((doc) => {
          undoneActivities.push({
            id: doc.id, 
            ...doc.data(),
            childName: child.childName, 
            childAvatar: child.imageUrl
          });
        });
      }

      return undoneActivities;
    } catch(error) {
      console.error("Error fetching undone activities:", error)
      throw error;
    }
  }

  const deleteActivity = async (userId, childId, activityId) => {
    try {
      const activityRef = doc( db,'users', userId, 'children', childId, 'activities', activityId);
      await deleteDoc(activityRef);
      return true;
    } catch (error){
      console.error("Error deleting activity:", error);
      throw error;
    }
  }

  return{
    createUserDocument, 
    getUserDocument, 
    createChild,
    getChildData, 
    createActivity,
    getActivity,
    getAllUndoneActivities,
    updateActivity, 
    getActivityById,
    deleteActivity
  };
};
