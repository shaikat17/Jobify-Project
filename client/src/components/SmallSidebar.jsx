import Wrapper from "../assets/wrappers/SmallSidebar"
import { FaTimes } from "react-icons/fa"
import { NavLink } from 'react-router-dom'
import Logo from "./Logo"
import { useAppContext } from "../context/AppContext"
import links from "../utils/links"

const SmallSidebar = () => {
  const { toggleSideBar, showSidebar } = useAppContext()
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <button className="close-btn" onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {links.map((link) => {
              const { text, path, id, icon } = link
              return <NavLink to={path} key={id} onClick={toggleSideBar} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}><span className="icon">{icon}</span>{text}</NavLink>
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default SmallSidebar