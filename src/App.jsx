import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskLog from './components/Tasklog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline">Employee Productivity Tracker</h1>
      <TaskLog/>
    </>
  )
}

export default App
