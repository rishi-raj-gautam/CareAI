import React from "react";

function Pat_dashboard() {
    const meds = [
        {
            "id": 1,
            "name": "Aspirin",
            "quantity": 10,
            "dose": {
                "morning": "1 tablet",
                "evening": "1 tablet",
            },
        },
        {
            "id": 2,
            "name": "Ibuprofen",
            "quantity": 10,
            "dose": {
                "morning": "1 tablet",
                "evening": "1 tablet",
            },
        },
        {
            "id": 3,
            "name": "flagyl",
            "quantity": 10,
            "dose": {
                "morning": "1 tablet",
                "evening": "1 tablet",
            },
        },
        {
            "id": 4,
            "name": "paracetamol",
            "quantity": 10,
            "dose": {
                "morning": "1 tablet",
                "evening": "1 tablet",
            },
        },
        {
            "id": 5,
            "name": "pan40",
            "quantity": 10,
            "dose": {
                "morning": "1 tablet",
                "evening": "1 tablet",
            },
        }
    ];

    const patientReports = [
        {
            id: 1,
            name: "Blood Test Report",
        },
        {
            id: 2,
            name: "X-Ray Report",
        },
        {
            id: 3,
            name: "MRI Scan Report",
        },
        {
            id: 4,
            name: "CT Scan Report",
        },
        {
            id: 5,
            name: "Urine Test Report",
        },
        {
            id: 6,
            name: "ECG Report",
        },
        {
            id: 7,
            name: "Liver Function Test Report",
        },
        {
            id: 8,
            name: "Kidney Function Test Report",
        },
        {
            id: 9,
            name: "Diabetes Test Report",
        },
        {
            id: 10,
            name: "Thyroid Function Test Report",
        },
    ];

    return (
        <div className="h-full w-full p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Diagnosis & Treatment */}
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="border-2 rounded-xl p-4">
                            <h3 className="font-bold mb-3">Diagnosis</h3>
                            <div className="bg-slate-200 p-3 rounded-lg mb-4">
                                <p>xyz disease</p>
                            </div>
                            <h3 className="font-bold mb-3">Treatment</h3>
                            <div className="bg-slate-200 p-3 rounded-lg h-24"></div>
                        </div>
                    </div>

                    {/* Medications */}
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="border-2 rounded-xl p-4">
                            <h3 className="font-bold mb-3">Medication</h3>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {meds.map((med) => (
                                    <div key={med.id} className="bg-gray-50 p-3 rounded-lg border flex items-center space-x-3">
                                        <i className="fa-solid fa-pills"></i>
                                        <p>{med.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Column */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Profile */}
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="border-2 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-xl">John Doe</h3>
                                <button className="bg-black text-white font-bold rounded-lg px-4 py-2">Update</button>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-2/5">
                                    <img src="src\assets\images\pngwing.png" alt="Profile Pic" className="w-full rounded-lg" />
                                </div>
                                <div className="w-full md:w-3/5 space-y-2">
                                    <p><span className="font-bold">Patient ID:</span> #12345</p>
                                    <p><span className="font-bold">Age:</span> 35</p>
                                    <p><span className="font-bold">Sex:</span> Male</p>
                                    <p><span className="font-bold">Blood Group:</span> O+</p>
                                    <p><span className="font-bold">Last Appointment:</span> 01/15/2025</p>
                                    <p><span className="font-bold">Follow Up:</span> 02/15/2025</p>
                                    <button className="w-full md:w-auto bg-black text-white font-bold rounded-lg px-4 py-2 mt-4">
                                        Schedule Follow Up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Test Reports */}
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="border-2 rounded-xl p-4">
                            <h3 className="font-bold mb-3">Test Reports</h3>
                            <div className="max-h-48 overflow-y-auto space-y-2">
                                {patientReports.map((report) => (
                                    <div key={report.id} className="flex items-center justify-between p-3 border-b hover:bg-gray-50">
                                        <p>{report.name}</p>
                                        <i className="fa-solid fa-download cursor-pointer hover:text-slate-500"></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1">
                    <div className="bg-black rounded-xl p-4 h-full">
                        <h1 className="text-white font-bold text-xl mb-4">Vitals</h1>
                        <div className="space-y-3">
                            {['Blood Pressure', 'Weight', 'Heart Rate', 'Oxygen Level', 'Sugar Level', 'Temperature'].map((vital, index) => (
                                <div key={index} className="flex items-center space-x-3 border-b border-gray-700 pb-3">
                                    <div className="rounded-full h-10 w-10 bg-white flex-shrink-0"></div>
                                    <p className="text-white text-sm font-bold">{vital}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full bg-white rounded-lg px-4 py-2 font-bold mt-4">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pat_dashboard;