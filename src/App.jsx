import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskLog from './components/Tasklog'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import LoginSignup from './components/Auth'
import Auth from './components/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/task-log" element={<TaskLog />} />
        <Route path="/register" element={<Auth/>} />
        

      </Routes>
    </>
  )
}

export default App
