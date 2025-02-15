import React from 'react'

function Navbar_doc() {
  return (
    <>
      <div className='Navbar flex justify-between items-center p-5 bg-slate-900 text-white'>
        <div className='logo'> logo</div>
        <div className='middle flex gap-3'>
          <span>Patients</span>
          <span>Appointments</span>
        </div>
        <div className='profile flex gap-3'>
          <span>pic</span>
          <span>Ravi</span>
        </div>
      </div>
    </>
  )
}

export default Navbar_doc