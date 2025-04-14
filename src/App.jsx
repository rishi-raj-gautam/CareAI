import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DocUI from './components/DocUI'
import Pat_dashboard from './components/Pat_dashboard'
import PatUI from './components/PatUI'


function App() {
  

  return (
    <BrowserRouter>
    
        <div className="app-container">
          <Routes>
          <Route path="/" element={<DocUI />} />
          <Route path="/patients/:patientId" element={<PatUI/>} />
            
          </Routes>
        </div>
  
    </BrowserRouter>
  )
}

export default App
