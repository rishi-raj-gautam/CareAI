const patientsData = [
    {
      patient: {
        id: "P001",
        name: "John Doe",
        sex: "Male",
        phone: "+1-202-555-0173",
        age: 40,
        bloodGroup: "O+",
        lastAppointment: "2025-04-01",
        followUp: "2025-04-20",
        status: "Monitoring Required"
      },
      vitals: [
        { name: "Blood Pressure", value: "120/80 mmHg", icon: "fa-heart-pulse", key: "bloodPressure" },
        { name: "Weight", value: "75 kg", icon: "fa-weight-scale", key: "weight" },
        { name: "Heart Rate", value: "72 bpm", icon: "fa-heartbeat", key: "heartRate" },
        { name: "Oxygen Level", value: "98%", icon: "fa-lungs", key: "oxygenLevel" },
        { name: "Sugar Level", value: "110 mg/dL", icon: "fa-droplet", key: "sugarLevel" },
        { name: "Temperature", value: "98.6°F", icon: "fa-temperature-half", key: "temperature" }
      ],
      medication: [
        {
          id: "M001",
          name: "Paracetamol",
          quantity: 10,
          dose: {
            morning: "1 tablet",
            afternoon: "",
            evening: "1 tablet"
          },
          days: 5
        }
      ],
      patientReports: [
        { id: "R001", name: "Blood Test Report" }
      ],
      prescription: {
        currentCondition: "Mild fever and body ache",
        diagnosis: "Viral infection",
        treatment: "Rest and hydration. Prescribed Paracetamol.",
        adviceGiven: "Avoid cold drinks. Follow up in one week."
      }
    },
    {
      patient: {
        id: "P002",
        name: "Alice Smith",
        sex: "Female",
        phone: "+1-202-555-0188",
        age: 30,
        bloodGroup: "A+",
        lastAppointment: "2025-03-25",
        followUp: "2025-04-10",
        status: "Needs Follow-Up"
      },
      vitals: [
        { name: "Blood Pressure", value: "110/70 mmHg", icon: "fa-heart-pulse", key: "bloodPressure" },
        { name: "Weight", value: "60 kg", icon: "fa-weight-scale", key: "weight" },
        { name: "Heart Rate", value: "75 bpm", icon: "fa-heartbeat", key: "heartRate" },
        { name: "Oxygen Level", value: "99%", icon: "fa-lungs", key: "oxygenLevel" },
        { name: "Sugar Level", value: "100 mg/dL", icon: "fa-droplet", key: "sugarLevel" },
        { name: "Temperature", value: "98.4°F", icon: "fa-temperature-half", key: "temperature" }
      ],
      medication: [
        {
          id: "M002",
          name: "Ibuprofen",
          quantity: 15,
          dose: {
            morning: "1 tablet",
            afternoon: "1 tablet",
            evening: ""
          },
          days: 3
        }
      ],
      patientReports: [
        { id: "R002", name: "Urine Test Report" }
      ],
      prescription: {
        currentCondition: "Headache and fatigue",
        diagnosis: "Migraine",
        treatment: "Ibuprofen and rest",
        adviceGiven: "Avoid bright lights and stress"
      }
    },
    {
      patient: {
        id: "P003",
        name: "Robert Lee",
        sex: "Male",
        phone: "+1-202-555-0114",
        age: 55,
        bloodGroup: "B+",
        lastAppointment: "2025-04-05",
        followUp: "2025-04-25",
        status: "Stable"
      },
      vitals: [
        { name: "Blood Pressure", value: "130/85 mmHg", icon: "fa-heart-pulse", key: "bloodPressure" },
        { name: "Weight", value: "82 kg", icon: "fa-weight-scale", key: "weight" },
        { name: "Heart Rate", value: "80 bpm", icon: "fa-heartbeat", key: "heartRate" },
        { name: "Oxygen Level", value: "96%", icon: "fa-lungs", key: "oxygenLevel" },
        { name: "Sugar Level", value: "140 mg/dL", icon: "fa-droplet", key: "sugarLevel" },
        { name: "Temperature", value: "99.1°F", icon: "fa-temperature-half", key: "temperature" }
      ],
      medication: [
        {
          id: "M003",
          name: "Metformin",
          quantity: 20,
          dose: {
            morning: "1 tablet",
            afternoon: "",
            evening: "1 tablet"
          },
          days: 10
        }
      ],
      patientReports: [
        { id: "R003", name: "Diabetes Panel Report" }
      ],
      prescription: {
        currentCondition: "High blood sugar",
        diagnosis: "Type 2 Diabetes",
        treatment: "Metformin",
        adviceGiven: "Avoid sugar, exercise regularly"
      }
    },
    {
      patient: {
        id: "P004",
        name: "Sara Khan",
        sex: "Female",
        phone: "+1-202-555-0190",
        age: 25,
        bloodGroup: "AB-",
        lastAppointment: "2025-04-08",
        followUp: "2025-04-15",
        status: "Stable"
      },
      vitals: [
        { name: "Blood Pressure", value: "115/75 mmHg", icon: "fa-heart-pulse", key: "bloodPressure" },
        { name: "Weight", value: "55 kg", icon: "fa-weight-scale", key: "weight" },
        { name: "Heart Rate", value: "70 bpm", icon: "fa-heartbeat", key: "heartRate" },
        { name: "Oxygen Level", value: "97%", icon: "fa-lungs", key: "oxygenLevel" },
        { name: "Sugar Level", value: "95 mg/dL", icon: "fa-droplet", key: "sugarLevel" },
        { name: "Temperature", value: "98.7°F", icon: "fa-temperature-half", key: "temperature" }
      ],
      medication: [
        {
          id: "M004",
          name: "Vitamin D",
          quantity: 30,
          dose: {
            morning: "1 tablet",
            afternoon: "",
            evening: ""
          },
          days: 30
        }
      ],
      patientReports: [
        { id: "R004", name: "Vitamin Deficiency Panel" }
      ],
      prescription: {
        currentCondition: "Weakness and fatigue",
        diagnosis: "Vitamin D deficiency",
        treatment: "Vitamin D supplements",
        adviceGiven: "Sun exposure and supplements"
      }
    },
    {
      patient: {
        id: "P005",
        name: "David Kim",
        sex: "Male",
        phone: "+1-202-555-0149",
        age: 60,
        bloodGroup: "A-",
        lastAppointment: "2025-03-30",
        followUp: "2025-04-15",
        status: "Monitoring Required"
      },
      vitals: [
        { name: "Blood Pressure", value: "135/88 mmHg", icon: "fa-heart-pulse", key: "bloodPressure" },
        { name: "Weight", value: "78 kg", icon: "fa-weight-scale", key: "weight" },
        { name: "Heart Rate", value: "74 bpm", icon: "fa-heartbeat", key: "heartRate" },
        { name: "Oxygen Level", value: "95%", icon: "fa-lungs", key: "oxygenLevel" },
        { name: "Sugar Level", value: "130 mg/dL", icon: "fa-droplet", key: "sugarLevel" },
        { name: "Temperature", value: "98.8°F", icon: "fa-temperature-half", key: "temperature" }
      ],
      medication: [
        {
          id: "M005",
          name: "Amlodipine",
          quantity: 20,
          dose: {
            morning: "1 tablet",
            afternoon: "",
            evening: "1 tablet"
          },
          days: 15
        }
      ],
      patientReports: [
        { id: "R005", name: "ECG Report" }
      ],
      prescription: {
        currentCondition: "Mild hypertension",
        diagnosis: "Stage 1 Hypertension",
        treatment: "Amlodipine 5mg",
        adviceGiven: "Low sodium diet, regular check-ups"
      }
    }
  ];

  export default patientsData;
  