import { Link, Outlet } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"
import { BigSidebar, Navbar, SmallSidebar } from "../../components"

const SharedLayOut = () => {
  return (
      <Wrapper>
          <main className="dashboard">
              <SmallSidebar />
              <BigSidebar />
              <div>
                  <Navbar />
                  <div className="dashboard-page">
                      
                  </div>
              </div>
          </main>
          <Outlet />
      </Wrapper>
  )
}
export default SharedLayOut