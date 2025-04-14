import React from "react";
import patientsData from "../assets/dummyData";
import user from '../assets/images/pngwing.png';

function Pat_dashboard(props) {
    // Find the patient data based on the ID from props
    const patientData = patientsData.find(data => data.patient.id === props.id) || {
        patient: {},
        vitals: [],
        medication: [],
        patientReports: [],
        prescription: {}
    };

    const { patient, vitals, medication, patientReports, prescription } = patientData;

    return (
        <div className="h-full w-full p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Diagnosis & Treatment */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="border border-gray-100 rounded-xl p-5">
                            <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                                    <i className="fa-solid fa-stethoscope text-blue-600"></i>
                                </div>
                                Diagnosis
                            </h3>
                            <div className="bg-blue-50 p-4 rounded-lg mb-5 border border-blue-100">
                                <p className="text-blue-800">{prescription.diagnosis}</p>
                            </div>
                            
                            <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-2">
                                    <i className="fa-solid fa-notes-medical text-indigo-600"></i>
                                </div>
                                Treatment
                            </h3>
                            <div className="bg-indigo-50 p-4 rounded-lg h-28 border border-indigo-100">
                                <p className="text-indigo-800">{prescription.treatment}</p>
                            </div>
                        </div>
                    </div>

                    {/* Medications */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="border border-gray-100 rounded-xl p-5">
                            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                                    <i className="fa-solid fa-pills text-green-600"></i>
                                </div>
                                Medication
                            </h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                                {medication.map((med) => (
                                    <div key={med.id} className="bg-white p-3 rounded-lg border border-gray-200 flex items-center space-x-3 hover:shadow-md transition-shadow">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <i className="fa-solid fa-capsules text-green-600"></i>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{med.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {med.dose.morning && `Morning: ${med.dose.morning}`}
                                                {med.dose.afternoon && `, Afternoon: ${med.dose.afternoon}`}
                                                {med.dose.evening && `, Evening: ${med.dose.evening}`}
                                            </p>
                                        </div>
                                        <div className="text-sm font-medium text-blue-600">
                                            {med.quantity} left
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Column */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Profile */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="border border-gray-100 rounded-xl">
                            <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                            <div className="p-5 relative">
                                <div className="absolute -top-16 left-6 w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                                
                                    <img src={user} alt="Profile Pic" className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-28 flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-2xl text-gray-800">{patient.name}</h3>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors flex items-center">
                                        <i className="fa-solid fa-pen-to-square mr-2"></i>
                                        Update
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6 mt-2">
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                <i className="fa-solid fa-id-card text-blue-600"></i>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Patient ID</p>
                                                <p className="font-medium text-gray-800">{patient.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                <i className="fa-solid fa-calendar-days text-blue-600"></i>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Age</p>
                                                <p className="font-medium text-gray-800">{patient.age}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                <i className="fa-solid fa-venus-mars text-blue-600"></i>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Sex</p>
                                                <p className="font-medium text-gray-800">{patient.sex}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                                <i className="fa-solid fa-droplet text-red-600"></i>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Blood Group</p>
                                                <p className="font-medium text-gray-800">{patient.bloodGroup}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                                                <i className="fa-regular fa-calendar-check text-indigo-600"></i>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Last Appointment</p>
                                                <p className="font-medium text-gray-800">{patient.lastAppointment}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                <i className="fa-solid fa-calendar-plus text-purple-600"></i>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Follow Up</p>
                                                <p className="font-medium text-gray-800">{patient.followUp}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2 mt-6 transition-colors flex items-center justify-center">
                                    <i className="fa-solid fa-calendar-plus mr-2"></i>
                                    Schedule Follow Up
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Test Reports */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="border border-gray-100 rounded-xl p-5">
                            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-2">
                                    <i className="fa-solid fa-file-medical text-yellow-600"></i>
                                </div>
                                Test Reports
                            </h3>
                            <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200">
                                {patientReports.map((report, index) => (
                                    <div key={report.id} className={`flex items-center justify-between p-3 hover:bg-gray-50 ${
                                        index !== patientReports.length - 1 ? "border-b border-gray-200" : ""
                                    }`}>
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                                <i className="fa-solid fa-file-lines text-gray-600"></i>
                                            </div>
                                            <p className="font-medium text-gray-700">{report.name}</p>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                            <i className="fa-solid fa-download"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-b from-indigo-900 to-blue-900 rounded-xl p-5 h-full shadow-lg">
                        <h1 className="text-white font-bold text-xl mb-6 flex items-center">
                            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-2">
                                <i className="fa-solid fa-heart-pulse text-white"></i>
                            </div>
                            Vitals
                        </h1>
                        <div className="space-y-4">
                            {vitals.map((vital, index) => (
                                <div key={index} className="flex items-center space-x-3 border-b border-white border-opacity-20 pb-4">
                                    <div className="rounded-lg h-10 w-10 bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
                                        <i className={`fa-solid ${vital.icon} text-white`}></i>
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-bold">{vital.name}</p>
                                        <p className="text-blue-200 text-xs">{vital.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pat_dashboard;