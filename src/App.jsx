import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskLog from './components/Tasklog'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/task-log" element={<TaskLog />} />
      </Routes>
    </>
  )
}

export default App
