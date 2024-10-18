import Header from "./Components/Header"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./Components/Dashboard"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  )
}

export default App