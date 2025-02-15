import React from 'react'
"use client";
import { FileInput, Label } from "flowbite-react";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"


import { TextInput } from "flowbite-react";

function PatEdit() {

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
        <div className=' w-full h-screen'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 h-full'>
                <div className=' lg:col-span-3 space-y-4 h-full py-2 pl-2'>
                    <div className="bg-white rounded-xl shadow-sm h-full">
                        <div className="border-2 rounded-xl p-4 h-full">
                        
                            <form className="">
                                <div className="mb-5">
                                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                                    <input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>

                                <div className="mb-5">
                                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                                    <input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>

                                <div className="mb-5">
                                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Base input</label>
                                    <input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>


                                <div className="mb-5 min-h-[50%]">
                                    <label for="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Large input</label>
                                    <input type="text" id="large-input" className="block h-40  w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <button className="w-full bg-black rounded-lg px-4 py-2 font-bold mt-4 text-white">
                                    Submit
                                </button>

                            </form>
                            
                        </div>
                    </div></div>
                <div className=" lg:col-span-2 space-y-4 h-screen py-2">

                    {/* Test Reports */}
                    <div className="bg-white rounded-xl shadow-sm h-1/2">
                        <div className="border-2 rounded-xl p-4 h-full ">
                            <h3 className="font-bold mb-3">Test Reports</h3>
                            {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="picture">Picture</Label>
                                <Input id="picture" type="file" />
                            </div> */}

                            <div className="max-h-[60%] overflow-y-auto space-y-2">
                                {patientReports.map((report) => (
                                    <div key={report.id} className="flex items-center justify-between p-3 border-b hover:bg-gray-50">
                                        <p>{report.name}</p>
                                        <i className="fa-solid fa-download cursor-pointer hover:text-slate-500"></i>
                                    </div>
                                ))}
                            </div>
                            <div className='mb-2'>
                                <div className="mb-2 block">
                                    <Label htmlFor="file-upload" value="Upload file" />
                                </div>
                                <FileInput id="file-upload" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm h-[47%]">
                        <div className="border-2 rounded-xl p-4 h-full">
                            <h3 className="font-bold mb-3">Medication</h3>
                            <div className="max-h-[60%] overflow-y-auto space-y-2">
                                {meds.map((med) => (
                                    <div key={med.id} className="bg-gray-50 p-3 rounded-lg border flex items-center space-x-3">
                                        <i className="fa-solid fa-pills"></i>
                                        <p>{med.name}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='mb-2 flex gap-2'>
                                <button className="w-full bg-black rounded-lg px-4 py-2 font-bold mt-4 text-white">
                                    Update
                                </button>
                                <button className="w-full bg-black rounded-lg px-4 py-2 font-bold mt-4 text-white">
                                    Add
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="lg:col-span-1 py-2 pr-2">
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
    )
}

export default PatEdit