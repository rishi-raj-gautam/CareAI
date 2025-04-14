import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DocUI from './components/DocUI'
import Pat_dashboard from './components/Pat_dashboard'
import PatUI from './components/PatUI'


function App() {
  

  return (
    <HashRouter>
    
        <div className="app-container">
          <Routes>
          <Route path="/" element={<DocUI />} />
          <Route path="/patients/:patientId" element={<PatUI/>} />
            
          </Routes>
        </div>
  
    </HashRouter>
  )
}

export default App
