import React, { useState, useEffect } from 'react';
import Navbar_doc from './Navbar_doc';
import Sidebar_doc from './Sidebar_doc';
import Pateints from './Pateints';
import Appointment from './Appointment';
import patientsData from '../assets/dummyData';
import DoctorDashboard from './DoctorDashboard';

function DocUI(patId) {
  const [activeSection, setActiveSection] = useState('patients');
  const [patients, setPatients] = useState(patientsData);

  // Function to add a new patient
  const addNewPatient = (newPatient) => {
    // Create a unique ID for the new patient
    const lastId = patients.length > 0 ?
      parseInt(patients[patients.length - 1].patient.id.substring(1)) : 0;
    const newId = `P${String(lastId + 1).padStart(3, '0')}`;

    // Create patient object structure matching the dummy data format
    const patientObject = {
      patient: {
        id: newId,
        name: newPatient.name,
        sex: newPatient.sex,
        phone: newPatient.phone,
        age: parseInt(newPatient.age),
        bloodGroup: newPatient.bloodGroup,
        lastAppointment: new Date().toISOString().split('T')[0], // Today's date
        followUp: "", // Can be set later
        status: "Stable" // Default status
      },
      vitals: [
        { name: "Blood Pressure", value: "N/A", icon: "fa-heart-pulse", key: "bloodPressure" },
        { name: "Weight", value: "N/A", icon: "fa-weight-scale", key: "weight" },
        { name: "Heart Rate", value: "N/A", icon: "fa-heartbeat", key: "heartRate" },
        { name: "Oxygen Level", value: "N/A", icon: "fa-lungs", key: "oxygenLevel" },
        { name: "Sugar Level", value: "N/A", icon: "fa-droplet", key: "sugarLevel" },
        { name: "Temperature", value: "N/A", icon: "fa-temperature-half", key: "temperature" }
      ],
      medication: [],
      patientReports: [],
      prescription: {
        currentCondition: newPatient.medicalHistory || "Initial consultation",
        diagnosis: "",
        treatment: "",
        adviceGiven: ""
      }
    };

    // Update state with the new patient
    setPatients(prevPatients => [...prevPatients, patientObject]);
  };

  return (
    <>
      <Navbar_doc setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar: Stays at the top on smaller screens */}
        {activeSection!='dashboard'?<Sidebar_doc
          setActiveSection={setActiveSection}
          activeSection={activeSection}
          addNewPatient={addNewPatient}
        />:null}
        {activeSection === 'dashboard' ? (
          <DoctorDashboard/>
        ) : activeSection === 'patients' ? (
          <Pateints patients={patients} />
        ) : (
          <Appointment patients={patients} />
        )}
      </div>
    </>
  );
}

export default DocUI;