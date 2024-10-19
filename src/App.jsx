import Header from "./Components/Header"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./Components/Dashboard"
import Recommendation from "./Components/Recommendation"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/recommendation" element={<Recommendation />}></Route>
      </Routes>
    </>
  )
}

export default App