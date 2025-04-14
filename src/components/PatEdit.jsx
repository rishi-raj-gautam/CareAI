import React, { useState, useEffect } from 'react';
import { FileInput, Label, Modal, TextInput, Button, Select } from "flowbite-react";
import patientsData from "../assets/dummyData";

function PatEdit(props) {
    // Find the patient data based on the ID from props
    const [patientDataState, setPatientDataState] = useState({
        patient: {},
        vitals: [],
        medication: [],
        patientReports: [],
        prescription: {}
    });
    
    const [prescriptionForm, setPrescriptionForm] = useState({
        currentCondition: '',
        diagnosis: '',
        treatment: '',
        adviceGiven: ''
    });

    // Load patient data on mount or when ID changes
    useEffect(() => {
        const currentPatientData = patientsData.find(data => data.patient.id === props.id) || {
            patient: {},
            vitals: [],
            medication: [],
            patientReports: [],
            prescription: {}
        };
        
        setPatientDataState(currentPatientData);
        
        // Initialize the prescription form with current data
        // setPrescriptionForm({
        //     currentCondition: currentPatientData.prescription.currentCondition || '',
        //     diagnosis: currentPatientData.prescription.diagnosis || '',
        //     treatment: currentPatientData.prescription.treatment || '',
        //     adviceGiven: currentPatientData.prescription.adviceGiven || ''
        // });
        
        // Initialize updated vitals with current values
        const initialVitals = {};
        currentPatientData.vitals.forEach(vital => {
            initialVitals[vital.key] = vital.value;
        });
        setUpdatedVitals(initialVitals);
    }, [props.id]);

    // Medication Modal State
    const [showMedicationModal, setShowMedicationModal] = useState(false);
    const [newMedication, setNewMedication] = useState({
        name: '',
        quantity: 0,
        dose: {
            morning: '',
            afternoon: '',
            evening: ''
        },
        days: 0
    });

    // Vitals Modal State
    const [showVitalsModal, setShowVitalsModal] = useState(false);
    const [updatedVitals, setUpdatedVitals] = useState({
        bloodPressure: '120/80 mmHg',
        weight: '75 kg',
        heartRate: '72 bpm',
        oxygenLevel: '98%',
        sugarLevel: '110 mg/dL',
        temperature: '98.6°F'
    });

    // Handle Prescription Form Change
    const handlePrescriptionChange = (e) => {
        const { name, value } = e.target;
        setPrescriptionForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle Medication Form Input
    const handleMedicationChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('dose.')) {
            const dosePart = name.split('.')[1];
            setNewMedication(prev => ({
                ...prev,
                dose: {
                    ...prev.dose,
                    [dosePart]: value
                }
            }));
        } else {
            setNewMedication(prev => ({
                ...prev,
                [name]: value
            }));
        }
        console.log(patientsData)
    };

    // Handle Vitals Form Input
    const handleVitalsChange = (e) => {
        const { name, value } = e.target;
        setUpdatedVitals(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Add New Medication
    const handleAddMedication = () => {
        const nextId = `M${String(patientDataState.medication.length + 1).padStart(3, '0')}`;
        const medicationToAdd = {
            id: nextId,
            ...newMedication
        };
        
        // Update the local state
        setPatientDataState(prev => ({
            ...prev,
            medication: [...prev.medication, medicationToAdd]
        }));
        
        setShowMedicationModal(false);
        
        // Reset form
        setNewMedication({
            name: '',
            quantity: 0,
            dose: {
                morning: '',
                afternoon: '',
                evening: ''
            },
            days: 0
        });
    };

    // Update Vitals
    const handleUpdateVitals = () => {
        const updatedVitalSigns = patientDataState.vitals.map(vital => ({
            ...vital,
            value: updatedVitals[vital.key]
        }));
        
        // Update the local state
        setPatientDataState(prev => ({
            ...prev,
            vitals: updatedVitalSigns
        }));
        
        setShowVitalsModal(false);
    };

    // Delete Medication
    const handleDeleteMedication = (id) => {
        setPatientDataState(prev => ({
            ...prev,
            medication: prev.medication.filter(med => med.id !== id)
        }));
    };

    // Save all changes
    const handleSaveChanges = () => {
        // Update the prescription in the local state
        const updatedPatientData = {
            ...patientDataState,
            prescription: prescriptionForm
        };
        
        setPatientDataState(updatedPatientData);
        
        // In a real application, we would update the data on the server
        // For this demo, we can show an alert
        alert(`Changes saved for patient ${patientDataState.patient.name}!`);
        
        // In a real app, we would update the global state or make an API call:
        // const updatedPatientsData = patientsData.map(data => 
        //     data.patient.id === props.id ? updatedPatientData : data
        // );
        // updateGlobalPatientsData(updatedPatientsData);
    };

    const { patient, vitals, medication, patientReports, prescription } = patientDataState;

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4">
            <div className="max-w-8xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Patient Management: {patient.name}</h1>
                    <div className="flex gap-2">
                        <button 
                            className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white"
                        >
                            <i className="fa-solid fa-user-pen mr-2"></i>
                            Edit Info
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column (Patient Information) */}
                    <div className="lg:col-span-7 bg-white rounded-xl shadow-sm">
                        <div className="border border-gray-100 rounded-xl p-6">
                            <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <i className="fa-solid fa-user-edit text-blue-600 text-lg"></i>
                                </div>
                                Update Patient Information
                            </h3>
                            
                            <form className="space-y-5">
                                <div className="relative">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Current Condition</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <i className="fa-solid fa-heart-pulse text-gray-400"></i>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="currentCondition"
                                            value={prescriptionForm.currentCondition}
                                            onChange={handlePrescriptionChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3" 
                                            placeholder="Enter current condition"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Diagnosis</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <i className="fa-solid fa-stethoscope text-gray-400"></i>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="diagnosis"
                                            value={prescriptionForm.diagnosis}
                                            onChange={handlePrescriptionChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3" 
                                            placeholder="Enter diagnosis"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Treatment</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <i className="fa-solid fa-notes-medical text-gray-400"></i>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="treatment"
                                            value={prescriptionForm.treatment}
                                            onChange={handlePrescriptionChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3" 
                                            placeholder="Enter treatment plan"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Advice Given</label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <i className="fa-solid fa-message text-gray-400"></i>
                                        </div>
                                        <textarea 
                                            name="adviceGiven"
                                            value={prescriptionForm.adviceGiven}
                                            onChange={handlePrescriptionChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 min-h-40" 
                                            placeholder="Enter advice for patient"
                                        ></textarea>
                                    </div>
                                </div>
                                
                                <button 
                                    type="button"
                                    onClick={handleSaveChanges}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg p-3 transition-colors flex items-center justify-center"
                                >
                                    <i className="fa-solid fa-save mr-2"></i>
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column (Reports, Medications, Vitals) */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Test Reports */}
                        <div className="bg-white rounded-xl shadow-sm">
                            <div className="border border-gray-100 rounded-xl p-5">
                                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-2">
                                        <i className="fa-solid fa-file-medical text-yellow-600"></i>
                                    </div>
                                    Test Reports
                                </h3>

                                <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200 mb-4">
                                    {patientReports.map((report, index) => (
                                        <div key={report.id} className={`flex items-center justify-between p-3 hover:bg-gray-50 ${
                                            index !== patientReports.length - 1 ? "border-b border-gray-200" : ""
                                        }`}>
                                            <div className="flex items-center">
                                                <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center mr-2">
                                                    <i className="fa-solid fa-file-lines text-gray-600"></i>
                                                </div>
                                                <p className="text-sm font-medium text-gray-700">{report.name}</p>
                                            </div>
                                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                                <i className="fa-solid fa-download"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-2">
                                    <div className="mb-2 block">
                                        <Label htmlFor="file-upload" value="Upload new report" />
                                    </div>
                                    <div className="flex gap-2">
                                        <FileInput id="file-upload" className="flex-grow" />
                                        <button className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700">
                                            <i className="fa-solid fa-upload"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Medications */}
                        <div className="bg-white rounded-xl shadow-sm">
                            <div className="border border-gray-100 rounded-xl p-5">
                                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                                        <i className="fa-solid fa-pills text-green-600"></i>
                                    </div>
                                    Medications
                                </h3>

                                <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-200 mb-4">
                                    {medication.map((med, index) => (
                                        <div key={med.id} className={`flex items-center justify-between p-3 hover:bg-gray-50 ${
                                            index !== medication.length - 1 ? "border-b border-gray-200" : ""
                                        }`}>
                                            <div className="flex items-center">
                                                <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center mr-2">
                                                    <i className="fa-solid fa-capsules text-gray-600"></i>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">{med.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {med.dose.morning && `Morning: ${med.dose.morning}`}
                                                        {med.dose.afternoon && `, Afternoon: ${med.dose.afternoon}`}
                                                        {med.dose.evening && `, Evening: ${med.dose.evening}`}
                                                        {med.days && ` for ${med.days} days`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button 
                                                    className="text-red-600 hover:text-red-800 transition-colors"
                                                    onClick={() => handleDeleteMedication(med.id)}
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg p-2 transition-colors"
                                        onClick={() => setShowMedicationModal(true)}
                                    >
                                        <i className="fa-solid fa-plus mr-1"></i> Add New
                                    </button>
                                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg p-2 transition-colors">
                                        <i className="fa-solid fa-pen-to-square mr-1"></i> Update All
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Vitals */}
                        <div className="bg-white rounded-xl shadow-sm">
                            <div className="border border-gray-100 rounded-xl p-5">
                                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-2">
                                        <i className="fa-solid fa-heart-pulse text-red-600"></i>
                                    </div>
                                    Vital Signs
                                </h3>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {vitals.map((vital, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                                <i className={`fa-solid ${vital.icon} text-blue-600`}></i>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">{vital.name}</p>
                                                <p className="text-sm font-semibold">{vital.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg p-2 transition-colors"
                                    onClick={() => setShowVitalsModal(true)}
                                >
                                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                                    Update Vitals
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Medication Modal */}
            <Modal show={showMedicationModal} onClose={() => setShowMedicationModal(false)}>
                <Modal.Header>Add New Medication</Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="medication-name" value="Medication Name" />
                            <TextInput
                                id="medication-name"
                                name="name"
                                placeholder="Enter medication name"
                                required
                                value={newMedication.name}
                                onChange={handleMedicationChange}
                            />
                        </div>
                        
                        <div>
                            <Label value="Dosage" />
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <Label htmlFor="morning-dose" value="Morning" size="sm" />
                                    <TextInput
                                        id="morning-dose"
                                        name="dose.morning"
                                        placeholder="e.g., 1 tablet"
                                        value={newMedication.dose.morning}
                                        onChange={handleMedicationChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="afternoon-dose" value="Afternoon" size="sm" />
                                    <TextInput
                                        id="afternoon-dose"
                                        name="dose.afternoon"
                                        placeholder="e.g., 1 tablet"
                                        value={newMedication.dose.afternoon}
                                        onChange={handleMedicationChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="evening-dose" value="Evening" size="sm" />
                                    <TextInput
                                        id="evening-dose"
                                        name="dose.evening"
                                        placeholder="e.g., 1 tablet"
                                        value={newMedication.dose.evening}
                                        onChange={handleMedicationChange}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <Label htmlFor="days" value="Days of Treatment" />
                            <TextInput
                                id="days"
                                name="days"
                                type="number"
                                placeholder="Number of days"
                                required
                                value={newMedication.days}
                                onChange={handleMedicationChange}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="quantity" value="Quantity" />
                            <TextInput
                                id="quantity"
                                name="quantity"
                                type="number"
                                placeholder="Total quantity"
                                required
                                value={newMedication.quantity}
                                onChange={handleMedicationChange}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full flex justify-end gap-2">
                        <Button color="gray" onClick={() => setShowMedicationModal(false)}>
                            Cancel
                        </Button>
                        <Button color="blue" onClick={handleAddMedication}>
                            Add Medication
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            {/* Update Vitals Modal */}
            <Modal show={showVitalsModal} onClose={() => setShowVitalsModal(false)}>
                <Modal.Header>Update Vital Signs</Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="bloodPressure" value="Blood Pressure" />
                            <TextInput
                                id="bloodPressure"
                                name="bloodPressure"
                                placeholder="e.g., 120/80 mmHg"
                                required
                                value={updatedVitals.bloodPressure}
                                onChange={handleVitalsChange}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="heartRate" value="Heart Rate" />
                            <TextInput
                                id="heartRate"
                                name="heartRate"
                                placeholder="e.g., 72 bpm"
                                required
                                value={updatedVitals.heartRate}
                                onChange={handleVitalsChange}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="temperature" value="Temperature" />
                            <TextInput
                                id="temperature"
                                name="temperature"
                                placeholder="e.g., 98.6°F"
                                required
                                value={updatedVitals.temperature}
                                onChange={handleVitalsChange}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="oxygenLevel" value="Oxygen Level" />
                            <TextInput
                                id="oxygenLevel"
                                name="oxygenLevel"
                                placeholder="e.g., 98%"
                                required
                                value={updatedVitals.oxygenLevel}
                                onChange={handleVitalsChange}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="weight" value="Weight" />
                            <TextInput
                                id="weight"
                                name="weight"
                                placeholder="e.g., 75 kg"
                                required
                                value={updatedVitals.weight}
                                onChange={handleVitalsChange}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="sugarLevel" value="Sugar Level" />
                            <TextInput
                                id="sugarLevel"
                                name="sugarLevel"
                                placeholder="e.g., 110 mg/dL"
                                required
                                value={updatedVitals.sugarLevel}
                                onChange={handleVitalsChange}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full flex justify-end gap-2">
                        <Button color="gray" onClick={() => setShowVitalsModal(false)}>
                            Cancel
                        </Button>
                        <Button color="blue" onClick={handleUpdateVitals}>
                            Update Vitals
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PatEdit;