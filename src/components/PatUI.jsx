import React, { useState } from "react";
import Navbar_pat from "./Navbar_pat";
import Pat_dashboard from "./Pat_dashboard";
import PatEdit from "./PatEdit";
import Pat_history from "./Pat_history";

const PatUI = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Pat_dashboard />;
      case "edit":
        return <PatEdit />;
      case "history":
        return <Pat_history />;
      default:
        return <Pat_dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar_pat />
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <nav className="bg-slate-800 md:w-16 p-3 flex md:flex-col justify-center md:justify-start items-center space-x-4 md:space-x-0 md:space-y-6 overflow-x-auto md:overflow-x-visible">
          <div className="md:mt-20 flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-6">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`rounded-full h-10 w-10 flex justify-center items-center transition-colors ${
                activeTab === "dashboard" ? "bg-green-300 hover:bg-green-400" : "hover:bg-slate-700"
              }`}
            >
              <i className="fa-regular fa-id-card fa-lg text-white"></i>
            </button>
            
            <button
              onClick={() => setActiveTab("edit")}
              className={`rounded-full h-10 w-10 flex justify-center items-center transition-colors ${
                activeTab === "edit" ? "bg-green-300 hover:bg-green-400" : "hover:bg-slate-700"
              }`}
            >
              <i className="fa-solid fa-user fa-lg text-white"></i>
            </button>
            
            <button
              onClick={() => setActiveTab("history")}
              className={`rounded-full h-10 w-10 flex justify-center items-center transition-colors ${
                activeTab === "history" ? "bg-green-300 hover:bg-green-400" : "hover:bg-slate-700"
              }`}
            >
              <i className="fa-solid fa-file fa-lg text-white"></i>
            </button>
            
            <button
              onClick={() => setActiveTab("stats")}
              className={`rounded-full h-10 w-10 flex justify-center items-center transition-colors ${
                activeTab === "stats" ? "bg-green-300 hover:bg-green-400" : "hover:bg-slate-700"
              }`}
            >
              <i className="fa-solid fa-chart-simple fa-lg text-white"></i>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PatUI;