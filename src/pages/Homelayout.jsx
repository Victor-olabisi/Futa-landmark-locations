import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar"

const Homelayout = () => {
  return (
      <section>
          <Navbar />
          <div className="max-w-[1200px] mx-auto px-6">
          <Outlet/>
          </div> 
    </section>
  )
}
export default Homelayout