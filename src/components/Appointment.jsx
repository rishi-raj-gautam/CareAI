import React from 'react';

function Appointment() {
  const patientData = [
    {
      name: "John Smith",
      age: 45,
      status: "Stable",
    },
    {
      name: "John Doe",
      age: 45,
      status: "Monitoring Required",
    },
    {
      name: "Jane Smith",
      age: 45,
      status: "Needs Follow-Up",
    },
  ];

  return (
    <div className="patient h-screen bg-white w-full p-4">
      <h1 className="text-center text-xl font-bold mb-4">Patients</h1>
      <div className="patient-section h-auto sm:h-5/6 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Appointment Count Section */}
          <div className="apointment-count col-span-1 sm:col-span-2 flex bg-green-300 justify-evenly items-center rounded-lg p-4">
            <div className="text-center">
              <div className="bg-white rounded-full h-20 w-20 sm:h-24 sm:w-24 shadow-md p-4"></div>
              <span>Total</span>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full h-20 w-20 sm:h-24 sm:w-24 shadow-md p-4"></div>
              <span>Attended</span>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full h-20 w-20 sm:h-24 sm:w-24 shadow-md p-4"></div>
              <span>Remaining</span>
            </div>
          </div>

          {/* Current Patient Section */}
          <div className="current-patient p-4 bg-slate-800 rounded-lg flex flex-col justify-evenly text-white mt-4 sm:mt-0">
            <h3 className="font-bold text-center">Current Patient</h3>
            <div className="flex flex-col items-center sm:items-start">
              <span>Name: </span>
              <span>Age: </span>
              <span>Status: </span>
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-green-300 px-4 py-2 rounded-md text-white">Checked</button>
            </div>
          </div>
        </div>

        {/* Next Appointments Section */}
        <h1 className="text-center text-xl font-bold mt-8 mb-4">Next Appointments</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patientData.map((patient, index) => (
            <div
              key={index}
              className="bg-green-300 hover:bg-slate-800 hover:text-white p-4 rounded-xl shadow-md flex items-center gap-4 transition-all duration-500 ease-in-out">
              <div className="bg-white rounded-full h-16 w-16 sm:h-20 sm:w-20"></div>
              <div>
                <h2 className="font-bold">{patient.name}</h2>
                <p>Age: {patient.age}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
