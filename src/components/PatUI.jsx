import React, { useState } from "react";
import Navbar_pat from "./Navbar_pat";
import Pat_dashboard from "./Pat_dashboard";
import PatEdit from "./PatEdit";
import Pat_history from "./Pat_history";
import { useLocation } from "react-router-dom";

const PatUI = () => {
  const location = useLocation(); 
  const [activeTab, setActiveTab] = useState("dashboard");
  const { patientId } = location.state || {}; // fallback for undefined
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        console.log(patientId)
        return <Pat_dashboard id={patientId}  />;
      case "edit":
        return <PatEdit id={patientId} />;
      case "history":
        return <Pat_history id={patientId}  />;
      default:
        return <Pat_dashboard id={patientId} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar_pat />
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <nav className="bg-gradient-to-b from-indigo-900 to-blue-900 md:w-20 p-3 flex md:flex-col justify-center md:justify-start items-center space-x-4 md:space-x-0 md:space-y-8 overflow-x-auto md:overflow-x-visible shadow-lg">
          <div className="md:mt-20 flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`rounded-full h-12 w-12 flex justify-center items-center transition-all duration-300 shadow-md ${
                activeTab === "dashboard" 
                ? "bg-white text-blue-700 scale-110 shadow-blue-300" 
                : "bg-blue-800 text-white hover:bg-blue-700"
              }`}
            >
              <i className="fa-regular fa-id-card fa-lg"></i>
            </button>
            
            <button
              onClick={() => setActiveTab("edit")}
              className={`rounded-full h-12 w-12 flex justify-center items-center transition-all duration-300 shadow-md ${
                activeTab === "edit" 
                ? "bg-white text-blue-700 scale-110 shadow-blue-300" 
                : "bg-blue-800 text-white hover:bg-blue-700"
              }`}
            >
              <i className="fa-solid fa-user fa-lg"></i>
            </button>
            
            <button
              onClick={() => setActiveTab("history")}
              className={`rounded-full h-12 w-12 flex justify-center items-center transition-all duration-300 shadow-md ${
                activeTab === "history" 
                ? "bg-white text-blue-700 scale-110 shadow-blue-300" 
                : "bg-blue-800 text-white hover:bg-blue-700"
              }`}
            >
              <i className="fa-solid fa-file fa-lg"></i>
            </button>
            
            <button
              onClick={() => setActiveTab("stats")}
              className={`rounded-full h-12 w-12 flex justify-center items-center transition-all duration-300 shadow-md ${
                activeTab === "stats" 
                ? "bg-white text-blue-700 scale-110 shadow-blue-300" 
                : "bg-blue-800 text-white hover:bg-blue-700"
              }`}
            >
              <i className="fa-solid fa-chart-simple fa-lg"></i>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-3">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PatUI;