import React from 'react';
import { useNavigate } from 'react-router-dom';

function Appointment({ patients }) {
  const navigate = useNavigate();
  const totalPatients = patients.length;

  return (
    <div className="h-full w-full p-6">
      <h1 className="font-bold text-2xl text-gray-800 mb-6 flex items-center">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
          <i className="fa-solid fa-calendar-check text-blue-600"></i>
        </div>
        Appointments
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Appointment Stats Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border border-gray-100 rounded-xl p-5">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                <i className="fa-solid fa-chart-simple text-green-600"></i>
              </div>
              Today's Summary
            </h3>
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                <div className="w-16 h-16 bg-white rounded-full shadow-md mx-auto mb-2 flex items-center justify-center">
                  <span className="text-blue-600 text-xl font-bold">{totalPatients}</span>
                </div>
                <p className="text-blue-800 font-medium">Total</p>
              </div>
              <div className="flex-1 bg-green-50 rounded-xl p-4 text-center border border-green-100">
                <div className="w-16 h-16 bg-white rounded-full shadow-md mx-auto mb-2 flex items-center justify-center">
                  <span className="text-green-600 text-xl font-bold">8</span>
                </div>
                <p className="text-green-800 font-medium">Attended</p>
              </div>
              <div className="flex-1 bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
                <div className="w-16 h-16 bg-white rounded-full shadow-md mx-auto mb-2 flex items-center justify-center">
                  <span className="text-amber-600 text-xl font-bold">4</span>
                </div>
                <p className="text-amber-800 font-medium">Remaining</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Patient Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
            <h3 className="font-bold text-lg flex items-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-2">
                <i className="fa-solid fa-user-check text-white"></i>
              </div>
              Current Patient
            </h3>
          </div>
          <div className="border-x border-b border-gray-100 rounded-b-xl p-5">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full mr-4 flex items-center justify-center">
                <i className="fa-solid fa-user text-gray-400 text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">John Doe</h4>
                <p className="text-gray-500 text-sm">Age: 45</p>
                <p className="text-amber-600 text-sm font-medium">Status: Monitoring Required</p>
              </div>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-4 py-2 transition-colors flex items-center justify-center">
              <i className="fa-solid fa-check-circle mr-2"></i>
              Mark as Checked
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="mt-8">
        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-2">
            <i className="fa-solid fa-users text-indigo-600"></i>
          </div>
          Next Appointments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient, id) => (
            <div
              key={id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-user text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{patient.patient.name}</h4>
                    <p className="text-gray-500 text-sm">Age: {patient.patient.age}</p>
                    <div className={`text-sm mt-1 font-medium ${
                      patient.patient.status === "Stable" ? "text-green-600" : 
                      patient.patient.status === "Monitoring Required" ? "text-amber-600" : "text-blue-600"
                    }`}>
                      {patient.patient.status}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                  type='button'
                  onClick={()=>{
                    console.log(patient.patient.id)
                    navigate(`/patients/${patient.patient.id}`);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-3 py-1 transition-colors">
                    View Details
                  </button>
                  <div className="text-gray-500 text-sm flex items-center">
                    <i className="fa-regular fa-clock mr-1"></i>
                    10:30 AM
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Appointment;