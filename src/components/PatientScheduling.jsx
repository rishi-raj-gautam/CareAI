// src/components/PatientScheduling.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, FileText, Users, CheckCircle, Search, Info, X } from 'lucide-react';

function PatientScheduling() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [age, setAge] = useState('');
  const [problem, setProblem] = useState('');

  // Function to handle smooth scroll to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };
  
  // Function to handle external page navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, duration: 0.5 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };

  // Fetch doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const doctorsRef = collection(db, "doctors");
        const q = query(doctorsRef, orderBy("name"));
        const querySnapshot = await getDocs(q);
        
        const doctorsList = [];
        querySnapshot.forEach((doc) => {
          doctorsList.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setDoctors(doctorsList);
        setFilteredDoctors(doctorsList);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doctor.degree && doctor.degree.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, doctors]);

  // Generate mock available time slots when a date is selected
  useEffect(() => {
    if (selectedDate) {
      // In a real app, you would fetch actual availability from Firestore
      const times = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate]);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate('');
    setSelectedTime('');
  };

  const validateForm = () => {
    if (!name.trim()) return "Patient name is required";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
    if (!contact.trim()) return "Contact number is required";
    if (!/^\d{10}$/.test(contact.replace(/[()-\s]/g, ''))) return "Contact number should be 10 digits";
    if (!age.trim()) return "Age is required";
    if (isNaN(age) || parseInt(age) <= 0 || parseInt(age) > 120) return "Please enter a valid age";
    if (!problem.trim()) return "Problem description is required";
    if (!selectedDoctor) return "Please select a doctor";
    if (!selectedDate) return "Please select an appointment date";
    if (!selectedTime) return "Please select an appointment time";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Add appointment to Firestore
      await addDoc(collection(db, "appointments"), {
        patientName: name,
        patientEmail: email,
        patientContact: contact,
        patientAge: parseInt(age),
        problem: problem,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        status: "pending", // pending, confirmed, completed, cancelled
        createdAt: serverTimestamp()
      });
      
      // Show success message and reset form
      setSuccess(true);
      setName('');
      setEmail('');
      setContact('');
      setAge('');
      setProblem('');
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Error scheduling appointment:", err);
      setError("Failed to schedule appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date in YYYY-MM-DD format for min date input
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get date 30 days from now for max date input
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div 
              className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xl mr-3 cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              SD
            </div>
            <span className="text-xl font-bold text-gray-800">Smart Doc</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:flex items-center space-x-10"
          >
            <button onClick={() => handleNavigation('/')} className="text-gray-600 hover:text-blue-600 transition-colors">Home</button>
            <button onClick={() => scrollToSection('doctors')} className="text-gray-600 hover:text-blue-600 transition-colors">Doctors</button>
            <button onClick={() => scrollToSection('appointment-form')} className="text-gray-600 hover:text-blue-600 transition-colors">Book Appointment</button>
            <button onClick={() => handleNavigation('/contact')} className="text-gray-600 hover:text-blue-600 transition-colors">Contact</button>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                onClick={() => handleNavigation('/login')}
              >
                Log In
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => handleNavigation('/signup')}
              >
                Sign Up
              </motion.button>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            <button onClick={() => handleNavigation('/')} className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-gray-100">Home</button>
            <button onClick={() => scrollToSection('doctors')} className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-gray-100">Doctors</button>
            <button onClick={() => scrollToSection('appointment-form')} className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-gray-100">Book Appointment</button>
            <button onClick={() => handleNavigation('/contact')} className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-gray-100">Contact</button>
            <div className="mt-3 flex flex-col space-y-2 px-4">
              <button 
                className="py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                onClick={() => handleNavigation('/login')}
              >
                Log In
              </button>
              <button 
                className="py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => handleNavigation('/signup')}
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-6 md:py-16 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight"
          >
            Schedule Your Appointment
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg md:text-xl text-gray-600 leading-relaxed"
          >
            Find the right doctor and book your appointment in minutes. Our streamlined process 
            makes healthcare scheduling simple and efficient.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex justify-center mt-6"
          >
            <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-8 px-6 md:px-12 lg:px-16"
        >
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg shadow-sm" role="alert">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              <span className="font-medium">Success!</span>
            </div>
            <p className="mt-1">Your appointment has been scheduled. We'll contact you shortly to confirm.</p>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Selection Panel */}
          <motion.div
            id="doctors"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={cardVariants}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          >
            <div className="bg-blue-600 text-white py-4 px-5">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <h2 className="font-bold text-lg">Find a Doctor</h2>
              </div>
            </div>
            <div className="p-5">
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search by name or specialization"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {loading && filteredDoctors.length === 0 ? (
                <div className="p-5 text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-2 text-gray-500">Loading doctors...</p>
                </div>
              ) : filteredDoctors.length === 0 ? (
                <div className="p-5 text-center">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No doctors found matching your search</p>
                </div>
              ) : (
                filteredDoctors.map((doctor) => (
                  <motion.div 
                    key={doctor.id}
                    whileHover={{ backgroundColor: "rgba(239, 246, 255, 0.6)" }}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      selectedDoctor && selectedDoctor.id === doctor.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <User className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{doctor.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{doctor.degree || 'General Physician'}</p>
                      </div>
                      {selectedDoctor && selectedDoctor.id === doctor.id && (
                        <div className="ml-2">
                          <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Appointment Booking Form */}
          <motion.div
            id="appointment-form"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={cardVariants}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          >
            <div className="bg-blue-600 text-white py-4 px-5">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <h2 className="font-bold text-lg">Patient Information</h2>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number*
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="contact"
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age*
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">
                  Health Problem/Symptoms*
                </label>
                <div className="relative">
                  <textarea
                    id="problem"
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Briefly describe your health problem or symptoms"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    required
                  ></textarea>
                  <div className="absolute top-2 left-0 flex items-start pl-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  Select Appointment Date & Time
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date*
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={getTomorrowDate()}
                      max={getMaxDate()}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      disabled={!selectedDoctor}
                      required
                    />
                    {!selectedDoctor && (
                      <p className="mt-1 text-sm text-blue-600">Please select a doctor first</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time*
                    </label>
                    <div className="relative">
                      <select
                        id="time"
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        disabled={!selectedDate}
                        required
                      >
                        <option value="">Select a time slot</option>
                        {availableTimes.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    {selectedDoctor && !selectedDate && (
                      <p className="mt-1 text-sm text-blue-600">Please select a date first</p>
                    )}
                  </div>
                </div>
              </div>
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg" 
                  role="alert"
                >
                  <div className="flex">
                    <div className="py-1">
                      <svg className="h-6 w-6 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="mt-8"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 transition-colors flex items-center justify-center disabled:bg-blue-400"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule Appointment
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Selected Doctor Info Card - Shows when a doctor is selected */}
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          >
            <div className="bg-indigo-600 text-white py-4 px-5">
              <div className="flex items-center">
                <Info className="h-5 w-5 mr-2" />
                <h2 className="font-bold text-lg">Doctor Information</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-6 flex-shrink-0">
                  <User className="h-8 w-8 text-indigo-600" />
                </div>
                
                <div className="mt-4 md:mt-0">
                  <h3 className="text-xl font-semibold text-gray-900">{selectedDoctor.name}</h3>
                  <p className="text-gray-600">{selectedDoctor.degree || 'General Physician'}</p>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-gray-700">Working Hours: 9:00 AM - 5:00 PM</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-gray-700">Available: Mon - Fri</span>
                    </div>
                    
                    {selectedDoctor.specialization && (
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-gray-700">Specialization: {selectedDoctor.specialization}</span>
                      </div>
                    )}
                    
                    {selectedDoctor.experience && (
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-gray-700">Experience: {selectedDoctor.experience} years</span>
                      </div>
                    )}
                  </div>
                  
                  {selectedDoctor.bio && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800">About</h4>
                      <p className="mt-1 text-gray-600">{selectedDoctor.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg mr-2">
                  SD
                </div>
                <span className="text-lg font-bold text-gray-800">Smart Doc</span>
              </div>
              <p className="mt-4 text-gray-600">
                Making healthcare accessible and convenient through our innovative scheduling platform.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation('/')} className="text-gray-600 hover:text-blue-600">Home</button></li>
                <li><button onClick={() => scrollToSection('doctors')} className="text-gray-600 hover:text-blue-600">Find Doctors</button></li>
                <li><button onClick={() => scrollToSection('appointment-form')} className="text-gray-600 hover:text-blue-600">Schedule Appointment</button></li>
                <li><button onClick={() => handleNavigation('/about')} className="text-gray-600 hover:text-blue-600">About Us</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  support@smartdoc.com
                </li>
                <li className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Smart Doc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PatientScheduling;