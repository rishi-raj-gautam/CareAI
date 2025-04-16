// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Check if user is a doctor
        const docRef = doc(db, "doctors", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setDoctorData(docSnap.data());
          // Ensure doctorId cookie is set
          if (!Cookies.get('doctorId')) {
            Cookies.set('doctorId', user.uid, { expires: 7 });
          }
        } else {
          // Not a doctor, clear any existing cookie
          Cookies.remove('doctorId');
        }
      } else {
        // No user logged in, clear data and cookie
        setDoctorData(null);
        Cookies.remove('doctorId');
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    doctorData,
    isDoctor: !!doctorData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}