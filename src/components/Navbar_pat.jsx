import React from 'react';
import {Link } from 'react-router-dom'
function Navbar_pat() {
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
            R
          </div>
          <span className="font-medium text-gray-800">Dr. Ravi</span>
          <i className="fa-solid fa-chevron-down text-sm text-gray-500"></i>
        </div>
      </div>
    </div>
  );
}

export default Navbar_pat;