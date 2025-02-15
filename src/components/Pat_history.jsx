import React from 'react';

function Pat_history() {
    const patient = [
        { "id": "P001", "diagnosis": "Hypertension", "date": "2024-01-15" },
        { "id": "P002", "diagnosis": "Diabetes Type 2", "date": "2023-12-20" },
        { "id": "P003", "diagnosis": "Migraine", "date": "2024-02-05" },
        { "id": "P004", "diagnosis": "Asthma", "date": "2023-11-10" },
        { "id": "P005", "diagnosis": "COVID-19", "date": "2023-09-25" },
        { "id": "P006", "diagnosis": "Fractured Arm", "date": "2024-01-30" },
        { "id": "P007", "diagnosis": "Pneumonia", "date": "2023-10-12" },
        { "id": "P008", "diagnosis": "Arthritis", "date": "2023-08-18" },
        { "id": "P009", "diagnosis": "Flu", "date": "2024-02-01" },
        { "id": "P010", "diagnosis": "Food Poisoning", "date": "2023-12-05" }
    ];

    return (
        <div className="h-screen flex flex-col p-5">
            <h1 className="font-bold text-3xl mb-4">Diagnosis History</h1>
            
            {/* Scrollable List Container */}
            <div className="h-[500px] overflow-y-auto border rounded-lg p-3 bg-gray-200">
                {patient.map((pat) => (
                    <div key={pat.id} className="flex justify-between bg-slate-400 m-2 p-4 rounded-md">
                        <h2 className="font-bold">{pat.diagnosis}</h2>
                        <div className="flex gap-2">
                            <p className="text-sm pt-0.5">{pat.date}</p>
                            <i className="fa-solid fa-trash mt-1"></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Pat_history;
