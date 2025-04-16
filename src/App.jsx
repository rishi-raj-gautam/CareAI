import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';
import DocUI from './components/DocUI';
import PatUI from './components/PatUI';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PatientScheduling from './components/PatientScheduling';
import DoctorDashboard from './components/DoctorDashboard';

// Protected route component
function ProtectedRoute({ children }) {
  const doctorId = Cookies.get('doctorId');
  
  if (!doctorId) {
    // Redirect to login if no doctorId cookie exists
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/schedule" element={<PatientScheduling />} />
      {/* <Route path="/docdashboard" element={<DoctorDashboard/>} /> */}
      <Route 
        path="/doctors" 
        element={
          <ProtectedRoute>
            <DocUI />
          </ProtectedRoute>
        } 
      />
      <Route path="/patients/:patientId" element={<PatUI />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="app-container">
          <AppRoutes />
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;