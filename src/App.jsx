import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DocUI from './components/DocUI'
import Pat_dashboard from './components/Pat_dashboard'
import PatUI from './components/PatUI'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <DocUI/> */}
      {/* <Pat_dashboard/> */}
      <PatUI/>
    </>
  )
}

export default App
