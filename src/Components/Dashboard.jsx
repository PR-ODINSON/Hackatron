// import { Route, Routes } from "react-router-dom"
import SideBarDash from "./SideBarDash"
import Tests from "./Tests"

const Dashboard = () => {
  return (
    <>
      <div className="w-[100vw] h-[100vh] montserrat flex">
        <SideBarDash />
        <Tests />
      </div>
    </>
  )
}

export default Dashboard