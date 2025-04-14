import React, { useState } from 'react';
import Navbar_doc from './Navbar_doc';
import Sidebar_doc from './Sidebar_doc';
import Pateints from './Pateints';
import Appointment from './Appointment';

function DocUI(patId) {
  const [activeSection, setActiveSection] = useState('patients');
  
  return (
    <>
      <Navbar_doc setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar: Stays at the top on smaller screens */}
        <Sidebar_doc setActiveSection={setActiveSection} activeSection={activeSection} />
        {activeSection === 'patients' ? <Pateints /> : <Appointment />}
      </div>
    </>
  );
}

export default DocUI;