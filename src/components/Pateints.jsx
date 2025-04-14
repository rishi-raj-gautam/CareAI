import React from 'react';
import { useNavigate } from 'react-router-dom';
import patientsData from '../assets/dummyData';

function Patients() {
  const navigate = useNavigate();
  // const patientData = [
  //   {
  //     name: "John Smith",
  //     age: 45,
  //     status: "Stable",
  //     lastVisit: "Jan 10, 2025",
  //     bloodGroup: "O+",
  //     condition: "Hypertension"
  //   },
  //   {
  //     name: "John Doe",
  //     age: 45,
  //     status: "Monitoring Required",
  //     lastVisit: "Feb 15, 2025",
  //     bloodGroup: "A+",
  //     condition: "Diabetes"
  //   },
  //   {
  //     name: "Jane Smith",
  //     age: 45,
  //     status: "Needs Follow-Up",
  //     lastVisit: "Mar 20, 2025",
  //     bloodGroup: "B-",
  //     condition: "Arthritis"
  //   },
  // ];

  

  return (
    <div className="h-full w-full p-6">
      <h1 className="font-bold text-2xl text-gray-800 mb-6 flex items-center">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-2">
          <i className="fa-solid fa-hospital-user text-indigo-600"></i>
        </div>
        Patients
      </h1>

      {/* Search & Filter Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="border border-gray-100 rounded-xl p-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Search patients..."
              />
            </div>
            <div className="flex gap-2">
              <select className="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Statuses</option>
                <option>Stable</option>
                <option>Needs Follow-Up</option>
                <option>Monitoring Required</option>
              </select>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2 transition-colors">
                <i className="fa-solid fa-filter mr-2"></i>
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patientsData.map((patient, id) => (
          <div
            key={id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="border border-gray-100 rounded-xl">
              <div className="h-12 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="p-5 relative">
                <div className="absolute -top-8 left-5 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-sm bg-blue-100 flex items-center justify-center">
                  <i className="fa-solid fa-user text-blue-600 text-xl"></i>
                </div>
                <div className="ml-20">
                  <h3 className="font-bold text-lg text-gray-800">{patient.patient.name}</h3>
                  <div className={`text-sm font-medium ${
                    patient.status === "Stable" ? "text-green-600" : 
                    patient.status === "Monitoring Required" ? "text-amber-600" : "text-blue-600"
                  }`}>
                    {patient.patient.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                      <i className="fa-solid fa-calendar-days text-blue-600 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Age</p>
                      <p className="font-medium text-gray-800">{patient.patient.age}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-2">
                      <i className="fa-solid fa-droplet text-red-600 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Blood</p>
                      <p className="font-medium text-gray-800">{patient.patient.bloodGroup}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
                      <i className="fa-solid fa-stethoscope text-purple-600 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Condition</p>
                      <p className="font-medium text-gray-800">{patient.prescription.diagnosis}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                      <i className="fa-solid fa-clock-rotate-left text-green-600 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Visit</p>
                      <p className="font-medium text-gray-800">{patient.patient.lastAppointment}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                  type='button'
                  onClick={()=>{
                    console.log(patient.patient.id)
                    navigate(`/patients/${patient.patient.id}`);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors flex items-center">
                  
                    <i className="fa-solid fa-eye mr-2"></i>
                    View
                  </button>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2 transition-colors flex items-center">
                    <i className="fa-solid fa-calendar-plus mr-2"></i>
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Patients;