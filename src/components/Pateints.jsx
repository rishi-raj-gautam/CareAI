import React from 'react';
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
function Pateints() {
  return (
    <div className="patient h-screen bg-white w-full  p-4">
      <h1 className="text-center text-xl font-bold mb-4">Patients</h1>
      <div className="patient-section p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {patientData.map((patient, index) => (
          <div
            key={index}
            className="bg-green-300 hover:bg-slate-800 hover:text-white p-3 rounded-3xl shadow-md flex items-center gap-3 transition-all duration-500 ease-in-out">
            <div className="bg-white rounded-full h-20 w-20"></div>
            <div className='h-max'><h2 className="font-bold">{patient.name}</h2>
            <p>Age: {patient.age}</p></div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Pateints;
