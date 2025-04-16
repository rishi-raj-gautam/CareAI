import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';

function Navbar_pat() {
  const { doctorData: contextDoctorData } = useAuth();
  const [doctorData, setDoctorData] = useState(null);
  
  useEffect(() => {
    const fetchDoctorData = async () => {
      const doctorId = Cookies.get('doctorId');
      
      // If we already have doctor data from context, use it
      if (contextDoctorData) {
        setDoctorData(contextDoctorData);
        return;
      }
      
      // Otherwise fetch it directly (for patient view)
      if (doctorId) {
        try {
          const db = getFirestore();
          const docRef = doc(db, "doctors", doctorId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setDoctorData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching doctor data:", error);
        }
      }
    };
    
    fetchDoctorData();
  }, [contextDoctorData]);
  
  // Default values if doctor data isn't loaded yet
  const doctorName = doctorData?.name || 'Doctor';
  
  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'D';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className='flex justify-between items-center px-6 py-4 bg-white shadow-md'>
      <div className='logo flex items-center'>
        <div className="bg-blue-600 text-white p-2 rounded-lg shadow-md">
          <i className="fa-solid fa-hospital fa-lg"></i>
        </div>
        <span className="ml-3 font-bold text-xl text-blue-900"><Link to="/">SmartDoc</Link></span>
      </div>
      
      <div className='flex items-center gap-4'>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        
        <div className="hidden md:flex items-center">
          <i className="fa-regular fa-bell text-gray-600 text-xl mr-6 cursor-pointer hover:text-blue-600 transition-colors"></i>
          <i className="fa-regular fa-envelope text-gray-600 text-xl mr-6 cursor-pointer hover:text-blue-600 transition-colors"></i>
        </div>
        
        <div className='profile flex items-center gap-3 cursor-pointer'>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-md">
            {doctorData?.photoURL ? (
              <img 
                src={doctorData.photoURL} 
                alt={doctorName} 
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              getInitials(doctorName)
            )}
          </div>
          <span className="font-medium text-gray-800">Dr. {doctorName}</span>
          <i className="fa-solid fa-chevron-down text-sm text-gray-500"></i>
        </div>
      </div>
    </div>
  );
}

export default Navbar_pat;