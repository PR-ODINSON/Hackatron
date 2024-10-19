import SideBarDash from "./SideBarDash"
import Tests from "./Tests"

const Dashboard = () => {
  return (
    <>
      <div className="w-[100vw] h-[100vh] montserrat flex">
        <SideBarDash />
        <div className="flex flex-col">
          <Tests />
        </div>
      </div>
    </>
  )
}

export default Dashboard