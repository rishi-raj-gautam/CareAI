import React, { useState } from 'react';

function Pat_history() {
    const [filterPeriod, setFilterPeriod] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    
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

    // Filter records based on time period
    const filterRecords = () => {
        if (filterPeriod === 'all') {
            return patient;
        }
        
        const currentDate = new Date();
        let monthsToSubtract = filterPeriod === '3months' ? 3 : 6;
        const cutoffDate = new Date();
        cutoffDate.setMonth(currentDate.getMonth() - monthsToSubtract);
        
        return patient.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate >= cutoffDate;
        });
    };

    // Search filter
    const searchRecords = (records) => {
        if (!searchTerm) return records;
        
        return records.filter(record => 
            record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const displayedRecords = searchRecords(filterRecords());

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="border border-gray-100 rounded-xl p-6">
                        <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <i className="fa-solid fa-clock-rotate-left text-purple-600 text-lg"></i>
                            </div>
                            Diagnosis History
                        </h3>

                        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                            <div className="flex flex-wrap gap-2">
                                <button 
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filterPeriod === 'all' 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    onClick={() => setFilterPeriod('all')}
                                >
                                    All Time
                                </button>
                                <button 
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filterPeriod === '3months' 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    onClick={() => setFilterPeriod('3months')}
                                >
                                    Last 3 Months
                                </button>
                                <button 
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filterPeriod === '6months' 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    onClick={() => setFilterPeriod('6months')}
                                >
                                    Last 6 Months
                                </button>
                            </div>
                            <div className="relative w-full md:w-64">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <i className="fa-solid fa-search text-gray-400"></i>
                                </div>
                                <input 
                                    type="text" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
                                    placeholder="Search diagnosis..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Desktop View (Table) */}
                        <div className="hidden md:block overflow-hidden border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {displayedRecords.length > 0 ? (
                                        displayedRecords.map((record) => (
                                            <tr key={record.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.diagnosis}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex space-x-2">
                                                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                                            <i className="fa-solid fa-eye"></i>
                                                        </button>
                                                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-800 transition-colors">
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No records found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View (Cards) */}
                        <div className="md:hidden space-y-3">
                            {displayedRecords.length > 0 ? (
                                displayedRecords.map((record) => (
                                    <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {record.id}
                                            </span>
                                            <span className="text-sm text-gray-500">{record.date}</span>
                                        </div>
                                        <h4 className="font-medium text-gray-800 mb-2">{record.diagnosis}</h4>
                                        <div className="flex justify-end space-x-2">
                                            <button className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                                                <i className="fa-solid fa-eye"></i>
                                            </button>
                                            <button className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center text-gray-500">
                                    No records found
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-500">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">{displayedRecords.length}</span> of <span className="font-medium">{displayedRecords.length}</span> results
                            </div>
                            <div className="flex space-x-1">
                                <button disabled className="px-3 py-1.5 bg-gray-100 text-gray-400 rounded-md cursor-not-allowed">
                                    <i className="fa-solid fa-chevron-left text-xs"></i>
                                </button>
                                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md">1</button>
                                <button disabled className="px-3 py-1.5 bg-gray-100 text-gray-400 rounded-md cursor-not-allowed">
                                    <i className="fa-solid fa-chevron-right text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pat_history;