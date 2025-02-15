import React from 'react';
import Navbar_doc from './Navbar_doc';
import Sidebar_doc from './Sidebar_doc';
import Pateints from './Pateints';
import Appointment from './Appointment';

function DocUI() {
  return (
    <>
      <Navbar_doc />
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar: Stays at the top on smaller screens */}
        <Sidebar_doc />
        <Pateints />
        {/* <Appointment/> */}
      </div>
    </>
  );
}

export default DocUI;
