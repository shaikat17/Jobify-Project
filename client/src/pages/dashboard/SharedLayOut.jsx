import { Link, Outlet } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"
import { BigSidebar, Navbar, SmallSidebar } from "../../components"
import { useThemeContext } from "../../context/ThemeContext"

const SharedLayOut = () => {
    const { lightMode } = useThemeContext()
  return (
      <Wrapper className={`${lightMode === 'dark' ? 'dark' : 'dashboard-color'}`}>
          <main className='dashboard'>
              <SmallSidebar />
              <BigSidebar />
              <div>
                  <Navbar />
                  <div className="dashboard-page">
                  <Outlet />
                  </div>
              </div>
          </main>
          
      </Wrapper>
  )
}
export default SharedLayOut