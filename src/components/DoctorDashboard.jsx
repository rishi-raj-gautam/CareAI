import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import Navbar_doc from './Navbar_doc';

function DoctorDashboard() {
  const navigate = useNavigate();
  const { currentUser, doctorData } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalPatients: 0
  });

  // Doctor profile state
  const [profile, setProfile] = useState({
    name: '',
    specialty: '',
    degree: '',
    experience: '',
    bio: '',
    email: '',
    phone: '',
    workingHours: '9:00 AM - 5:00 PM',
    workingDays: 'Monday - Friday',
    consultationFee: '',
    address: ''
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchDoctorData = async () => {
      setLoading(true);
      try {
        if (doctorData) {
          setProfile({
            name: doctorData.name || '',
            specialty: doctorData.specialty || '',
            degree: doctorData.degree || '',
            experience: doctorData.experience || '',
            bio: doctorData.bio || '',
            email: doctorData.email || currentUser.email || '',
            phone: doctorData.phone || '',
            workingHours: doctorData.workingHours || '9:00 AM - 5:00 PM',
            workingDays: doctorData.workingDays || 'Monday - Friday',
            consultationFee: doctorData.consultationFee || '',
            address: doctorData.address || ''
          });
        }

        // Fetch appointments
        await fetchAppointments();
        
        // Fetch patients
        await fetchPatients();
        
      } catch (err) {
        console.error("Error fetching doctor data:", err);
        setError("Failed to load doctor data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [currentUser, doctorData, navigate]);

  const fetchAppointments = async () => {
    try {
      if (!currentUser?.uid) return;
      
      const appointmentsRef = collection(db, "appointments");
      const q = query(
        appointmentsRef, 
        where("doctorId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const appointmentList = [];
      
      querySnapshot.forEach((doc) => {
        appointmentList.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        });
      });
      
      setAppointments(appointmentList);
      
      // Update statistics
      setStats(prev => ({
        ...prev,
        totalAppointments: appointmentList.length,
        pendingAppointments: appointmentList.filter(apt => apt.status === 'pending').length,
        completedAppointments: appointmentList.filter(apt => apt.status === 'completed').length
      }));
      
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const fetchPatients = async () => {
    try {
      if (!currentUser?.uid) return;
      
      // Get unique patients from appointments
      const uniquePatientEmails = [...new Set(appointments.map(apt => apt.patientEmail))];
      const patientsList = [];
      
      // For each unique patient, we could fetch more details from a patients collection if needed
      uniquePatientEmails.forEach(email => {
        const patientAppointments = appointments.filter(apt => apt.patientEmail === email);
        if (patientAppointments.length > 0) {
          const latestAppointment = patientAppointments[0];
          patientsList.push({
            name: latestAppointment.patientName,
            email: email,
            age: latestAppointment.patientAge,
            appointmentCount: patientAppointments.length,
            lastVisit: latestAppointment.createdAt
          });
        }
      });
      
      setPatients(patientsList);
      
      // Update statistics
      setStats(prev => ({
        ...prev,
        totalPatients: patientsList.length
      }));
      
    } catch (err) {
      console.error("Error processing patients:", err);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (!currentUser?.uid) throw new Error("User not authenticated");
      
      const doctorRef = doc(db, "doctors", currentUser.uid);
      await updateDoc(doctorRef, {
        ...profile,
        updatedAt: new Date()
      });
      
      setSuccess("Profile updated successfully!");
      
      // If we were in edit mode, exit it after successful update
      if (editMode) {
        setEditMode(false);
      }
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      // Refresh appointments
      await fetchAppointments();
      
      setSuccess(`Appointment ${newStatus} successfully!`);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      
    } catch (err) {
      console.error("Error updating appointment:", err);
      setError("Failed to update appointment status. Please try again.");
      
      // Hide error message after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 min-w-full">
      {/* <Navbar_doc /> */}
      
      <div className="container mx-auto px-4 py-8">
        {/* Success and Error Messages */}
        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-r-md" role="alert">
            <p className="font-bold">Success</p>
            <p>{success}</p>
          </div>
        )}
        
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-md" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
            <p className="text-gray-600">Welcome back, Dr. {profile.name}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors"
              onClick={() => navigate('/schedule')}
            >
              <i className="fa-solid fa-calendar-plus mr-2"></i>
              Manage Schedule
            </button>
          </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3 mr-4">
                <i className="fa-solid fa-calendar-check text-blue-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Appointments</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.totalAppointments}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-lg p-3 mr-4">
                <i className="fa-solid fa-clock text-yellow-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Appointments</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.pendingAppointments}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3 mr-4">
                <i className="fa-solid fa-check-circle text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Appointments</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.completedAppointments}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3 mr-4">
                <i className="fa-solid fa-users text-purple-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.totalPatients}</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              <button
                className={`px-6 py-3 text-gray-600 font-medium ${
                  activeSection === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : ''
                }`}
                onClick={() => setActiveSection('profile')}
              >
                <i className="fa-solid fa-user-md mr-2"></i>
                Profile
              </button>
              <button
                className={`px-6 py-3 text-gray-600 font-medium ${
                  activeSection === 'appointments' ? 'border-b-2 border-blue-600 text-blue-600' : ''
                }`}
                onClick={() => setActiveSection('appointments')}
              >
                <i className="fa-solid fa-calendar-check mr-2"></i>
                Appointments
              </button>
              <button
                className={`px-6 py-3 text-gray-600 font-medium ${
                  activeSection === 'patients' ? 'border-b-2 border-blue-600 text-blue-600' : ''
                }`}
                onClick={() => setActiveSection('patients')}
              >
                <i className="fa-solid fa-hospital-user mr-2"></i>
                Patients
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                {/* Profile Section */}
                {activeSection === 'profile' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium text-gray-800">Doctor Profile</h3>
                      {!editMode && (
                        <button
                          onClick={toggleEditMode}
                          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                          <i className="fa-solid fa-pencil mr-2"></i>
                          Edit Profile
                        </button>
                      )}
                    </div>

                    {!editMode ? (
                      <div className="bg-white rounded-lg border border-gray-200">
                        {/* Profile View Mode */}
                        <div className="p-6 border-b border-gray-200">
                          <div className="flex items-start">
                            <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl">
                              <i className="fa-solid fa-user-doctor"></i>
                            </div>
                            <div className="ml-6">
                              <h2 className="text-2xl font-bold text-gray-800">Dr. {profile.name}</h2>
                              <p className="text-gray-600 flex items-center mt-1">
                                <i className="fa-solid fa-stethoscope mr-2"></i>
                                {profile.specialty || 'No specialty specified'}
                                {profile.degree && <span className="mx-2">|</span>}
                                {profile.degree && <span>{profile.degree}</span>}
                              </p>
                              <p className="text-gray-600 flex items-center mt-1">
                                <i className="fa-solid fa-briefcase mr-2"></i>
                                {profile.experience ? `${profile.experience} years of experience` : 'Experience not specified'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Contact Information</h4>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <div className="w-8 text-center text-gray-500">
                                  <i className="fa-solid fa-envelope"></i>
                                </div>
                                <span className="ml-2 text-gray-700">{profile.email || 'No email specified'}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-8 text-center text-gray-500">
                                  <i className="fa-solid fa-phone"></i>
                                </div>
                                <span className="ml-2 text-gray-700">{profile.phone || 'No phone specified'}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-8 text-center text-gray-500">
                                  <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <span className="ml-2 text-gray-700">{profile.address || 'No address specified'}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Practice Details</h4>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <div className="w-8 text-center text-gray-500">
                                  <i className="fa-solid fa-clock"></i>
                                </div>
                                <span className="ml-2 text-gray-700">{profile.workingHours || 'No working hours specified'}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-8 text-center text-gray-500">
                                  <i className="fa-solid fa-calendar-days"></i>
                                </div>
                                <span className="ml-2 text-gray-700">{profile.workingDays || 'No working days specified'}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-8 text-center text-gray-500">
                                  <i className="fa-solid fa-dollar-sign"></i>
                                </div>
                                <span className="ml-2 text-gray-700">{profile.consultationFee || 'Consultation fee not specified'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {profile.bio && (
                          <div className="p-6 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Professional Biography</h4>
                            <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <form onSubmit={handleProfileUpdate}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={profile.name}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Dr. John Doe"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={profile.email}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="doctor@example.com"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Specialty
                            </label>
                            <input
                              type="text"
                              name="specialty"
                              value={profile.specialty}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Cardiology"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Degree
                            </label>
                            <input
                              type="text"
                              name="degree"
                              value={profile.degree}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="MD, PhD"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Experience (years)
                            </label>
                            <input
                              type="number"
                              name="experience"
                              value={profile.experience}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="10"
                              min="0"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={profile.phone}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="+1 (123) 456-7890"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Working Hours
                            </label>
                            <input
                              type="text"
                              name="workingHours"
                              value={profile.workingHours}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="9:00 AM - 5:00 PM"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Working Days
                            </label>
                            <input
                              type="text"
                              name="workingDays"
                              value={profile.workingDays}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Monday - Friday"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Consultation Fee
                            </label>
                            <input
                              type="text"
                              name="consultationFee"
                              value={profile.consultationFee}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="$100"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Office Address
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={profile.address}
                              onChange={handleInputChange}
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="123 Medical Center St, Suite 100, City, State, Zip"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Professional Bio
                            </label>
                            <textarea
                              name="bio"
                              value={profile.bio}
                              onChange={handleInputChange}
                              rows="4"
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Write a brief professional bio..."
                            ></textarea>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex space-x-3">
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md shadow-sm transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <>
                                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                Saving...
                              </>
                            ) : (
                              <>
                                <i className="fa-solid fa-save mr-2"></i>
                                Save Changes
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={toggleEditMode}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2 rounded-md shadow-sm transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
                
                {/* Appointments Section */}
                {activeSection === 'appointments' && (
                  <div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-2 md:mb-0">Upcoming Appointments</h3>
                      <div className="flex space-x-2">
                        <button className="bg-blue-100 text-blue-800 px-4 py-1 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors">
                          <i className="fa-solid fa-filter mr-1"></i>
                          All
                        </button>
                        <button className="bg-gray-100 text-gray-800 px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                          <i className="fa-solid fa-clock mr-1"></i>
                          Pending
                        </button>
                        <button className="bg-gray-100 text-gray-800 px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                          <i className="fa-solid fa-check mr-1"></i>
                          Completed
                        </button>
                      </div>
                    </div>
                    
                    {appointments.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fa-solid fa-calendar-xmark text-gray-500 text-3xl"></i>
                        </div>
                        <h3 className="text-lg font-medium text-gray-700">No appointments found</h3>
                        <p className="text-gray-500 mt-2">You don't have any appointments scheduled yet.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Patient
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date & Time
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Problem
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map((appointment) => (
                              <tr key={appointment.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                      <i className="fa-solid fa-user text-blue-600"></i>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                                      <div className="text-sm text-gray-500">{appointment.patientEmail}</div>
                                      <div className="text-sm text-gray-500">Age: {appointment.patientAge}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{appointment.appointmentDate}</div>
                                  <div className="text-sm text-gray-500">{appointment.appointmentTime}</div>
                                  <div className="text-xs text-gray-500">
                                    Booked on: {formatDate(appointment.createdAt)}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-900 max-w-xs truncate">
                                    {appointment.problem}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(appointment.status)}`}>
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-2">
                                    {appointment.status === 'pending' && (
                                      <>
                                        <button 
                                          className="text-green-600 hover:text-green-900 transition-colors"
                                          onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                        >
                                          Confirm
                                        </button>
                                        <button 
                                          className="text-red-600 hover:text-red-900 transition-colors"
                                          onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                        >
                                          Cancel
                                        </button>
                                      </>
                                    )}
                                    
                                    {appointment.status === 'confirmed' && (
                                      <button 
                                        className="text-blue-600 hover:text-blue-900 transition-colors"
                                        onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                      >
                                        Mark Complete
                                      </button>
                                    )}
                                    
                                    <button 
                                      className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                      onClick={() => navigate(`/appointment/${appointment.id}`)}
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Patients Section */}
                {activeSection === 'patients' && (
                  <div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-2 md:mb-0">Patient List</h3>
                      <div className="relative">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Search patients..."
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <i className="fa-solid fa-search text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                    
                    {patients.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fa-solid fa-user-xmark text-gray-500 text-3xl"></i>
                        </div>
                        <h3 className="text-lg font-medium text-gray-700">No patients found</h3>
                        <p className="text-gray-500 mt-2">You don't have any patients registered yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {patients.map((patient, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-5">
                              <div className="flex items-center mb-4">
                                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                  <i className="fa-solid fa-user text-blue-600"></i>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{patient.name}</h4>
                                  <p className="text-sm text-gray-500">{patient.email}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="text-xs text-gray-500">Age</p>
                                  <p className="font-medium text-gray-800">{patient.age || 'N/A'}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                  <p className="text-xs text-gray-500">Visits</p>
                                  <p className="font-medium text-gray-800">{patient.appointmentCount}</p>
                                </div>
                              </div>
                              
                              <div className="border-t border-gray-100 pt-3">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-xs text-gray-500">Last Visit</p>
                                    <p className="text-sm text-gray-800">
                                      {formatDate(patient.lastVisit)}
                                    </p>
                                  </div>
                                  <button 
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    onClick={() => navigate(`/patient/${patient.email}`)}
                                  >
                                    View History <i className="fa-solid fa-arrow-right ml-1"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {patients.length > 0 && (
                      <div className="mt-6 flex justify-center">
                        <nav className="flex items-center space-x-2">
                          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            <i className="fa-solid fa-chevron-left"></i>
                          </button>
                          <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded-md text-sm">
                            1
                          </button>
                          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                            2
                          </button>
                          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                            3
                          </button>
                          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                            <i className="fa-solid fa-chevron-right"></i>
                          </button>
                        </nav>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-800">Recent Activity</h3>
          </div>
          
          <div className="p-6">
            {appointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No recent activity to show.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.slice(0, 5).map((appointment) => (
                  <div key={appointment.id} className="flex items-start space-x-4">
                    <div className={`mt-1 flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      appointment.status === 'pending' ? 'bg-yellow-100' :
                      appointment.status === 'confirmed' ? 'bg-green-100' :
                      appointment.status === 'completed' ? 'bg-blue-100' :
                      'bg-red-100'
                    }`}>
                      <i className={`fa-solid ${
                        appointment.status === 'pending' ? 'fa-clock text-yellow-600' :
                        appointment.status === 'confirmed' ? 'fa-check text-green-600' :
                        appointment.status === 'completed' ? 'fa-check-double text-blue-600' :
                        'fa-times text-red-600'
                      }`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {appointment.status === 'pending' ? 'New appointment requested' :
                           appointment.status === 'confirmed' ? 'Appointment confirmed' :
                           appointment.status === 'completed' ? 'Appointment completed' :
                           'Appointment cancelled'}
                        </h4>
                        <span className="text-xs text-gray-500">{formatDate(appointment.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Patient <span className="font-medium">{appointment.patientName}</span> {
                          appointment.status === 'pending' ? 'requested an appointment' :
                          appointment.status === 'confirmed' ? 'has a confirmed appointment' :
                          appointment.status === 'completed' ? 'completed their appointment' :
                          'had their appointment cancelled'
                        } for {appointment.appointmentDate} at {appointment.appointmentTime}.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {appointments.length > 5 && (
              <div className="mt-6 text-center">
                <button 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => setActiveSection('appointments')}
                >
                  View All Activity <i className="fa-solid fa-arrow-right ml-1"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;