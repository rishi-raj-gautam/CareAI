import React from 'react';
import { Link } from 'react-router-dom'
function Navbar_doc({ setActiveSection, activeSection }) {
  return (
    <div className='bg-gradient-to-r from-indigo-900 to-blue-900 shadow-md'>
      <div className='flex justify-between items-center py-3 px-6'>
        <div className='flex items-center'>
          <div className='bg-white bg-opacity-20 rounded-lg p-2 mr-2'>
            <i className="fa-solid fa-stethoscope text-white text-xl"></i>
          </div>
          <span className='text-white font-bold text-xl'><Link to="/">SmartDoc</Link></span>
        </div>
        
        <div className='hidden md:flex items-center space-x-6'>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('patients');
            }}
            className={`text-white hover:text-blue-200 flex items-center transition-colors ${
              activeSection === 'patients' ? 'text-blue-200' : ''
            }`}
          >
            <div className={`bg-white ${
              activeSection === 'patients' ? 'bg-opacity-30' : 'bg-opacity-20'
            } rounded-lg p-2 mr-2`}>
              <i className="fa-solid fa-hospital-user text-white"></i>
            </div>
            <span className='font-medium'>Patient</span>
          </a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('appointments');
            }}
            className={`text-white hover:text-blue-200 flex items-center transition-colors ${
              activeSection === 'appointments' ? 'text-blue-200' : ''
            }`}
          >
            <div className={`bg-white ${
              activeSection === 'appointments' ? 'bg-opacity-30' : 'bg-opacity-20'
            } rounded-lg p-2 mr-2`}>
              <i className="fa-solid fa-calendar-check text-white"></i>
            </div>
            <span className='font-medium'>Appointments</span>
          </a>
          <a href="#" className='text-white hover:text-blue-200 flex items-center transition-colors'>
            <div className='bg-white bg-opacity-20 rounded-lg p-2 mr-2'>
              <i className="fa-solid fa-chart-line text-white"></i>
            </div>
            <span className='font-medium'>Dashboard</span>
          </a>
        </div>
        
        <div className='flex items-center'>
          <div className="relative mr-3">
            <button className="text-white focus:outline-none">
              <div className='bg-white bg-opacity-20 rounded-lg p-2'>
                <i className="fa-solid fa-bell text-white"></i>
              </div>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span>
            </button>
          </div>
          
          <div className='flex items-center bg-white bg-opacity-10 rounded-full px-2 py-1'>
            <div className='bg-blue-200 rounded-full h-8 w-8 mr-2 flex items-center justify-center'>
              <i className="fa-solid fa-user-md text-blue-800"></i>
            </div>
            <div className='mr-2'>
              <p className='text-white font-medium'>Dr. Ravi</p>
              <p className='text-blue-200 text-xs'>Cardiologist</p>
            </div>
            <div className='bg-white bg-opacity-20 rounded-lg p-1 ml-2'>
              <i className="fa-solid fa-chevron-down text-white text-xs"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar_doc;