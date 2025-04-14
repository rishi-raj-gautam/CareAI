import React, { useState } from 'react';

function Sidebar_doc({ setActiveSection, activeSection }) {
  const [openModal, setOpenModal] = useState(false);
  
  const menuItems = [
    { name: "Dashboard", icon: "fa-solid fa-chart-line", section: "dashboard" },
    { name: "Patients", icon: "fa-solid fa-hospital-user", section: "patients" },
    { name: "Appointments", icon: "fa-solid fa-calendar-check", section: "appointments" },
    { name: "Messages", icon: "fa-solid fa-comment-medical", section: "messages" },
    { name: "Reports", icon: "fa-solid fa-file-medical", section: "reports" },
    { name: "Settings", icon: "fa-solid fa-gear", section: "settings" },
  ];

  return (
    <div className='bg-white border-r border-gray-200 lg:h-screen w-full lg:w-64 flex flex-col'>
      {/* Top Section */}
      <div className='p-5 border-b border-gray-200'>
        <button 
          onClick={() => setOpenModal(true)}
          className='w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-xl px-4 py-3 transition-colors flex items-center justify-center shadow-sm'
        >
          <i className="fa-solid fa-user-plus mr-2"></i>
          Add New Patient
        </button>

        {/* Search Bar */}
        <div className='mt-4 relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
          </div>
          <input 
            type="text" 
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Search patient..."
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className='flex-grow py-4 overflow-y-auto'>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.section);
                }}
                className={`flex items-center py-3 px-5 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-r-full mx-2 transition-colors ${
                  activeSection === item.section ? 'bg-blue-50 text-blue-700' : ''
                }`}
              >
                <div className={`w-8 h-8 ${
                  activeSection === item.section ? 'bg-blue-100' : 'bg-gray-100'
                } rounded-lg flex items-center justify-center mr-3`}>
                  <i className={`${item.icon} ${
                    activeSection === item.section ? 'text-blue-600' : 'text-gray-600'
                  }`}></i>
                </div>
                <span className='font-medium'>{item.name}</span>
                {item.section === 'messages' && (
                  <span className="ml-auto bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">2</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className='p-4 border-t border-gray-200'>
        <div className='bg-blue-50 rounded-xl p-4'>
          <div className='flex items-center mb-3'>
            <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2'>
              <i className="fa-solid fa-circle-info text-blue-600"></i>
            </div>
            <h3 className='font-bold text-blue-800'>Need Help?</h3>
          </div>
          <p className='text-blue-600 text-sm mb-3'>Contact our support team for assistance with any issues.</p>
          <button className='w-full bg-white text-blue-700 border border-blue-200 font-medium rounded-lg px-4 py-2 hover:bg-blue-700 hover:text-white transition-colors shadow-sm'>
            Contact Support
          </button>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                  <i className="fa-solid fa-user-plus text-blue-600"></i>
                </div>
                Add New Patient
              </h3>
              <button 
                onClick={() => setOpenModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            
            <div className="p-6">
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input type="number" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                    <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
                  <textarea className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" rows="3"></textarea>
                </div>
                
                <div className="flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => setOpenModal(false)}
                    className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
                  >
                    Add Patient
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar_doc;