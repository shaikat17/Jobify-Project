
import Wrapper from "../assets/wrappers/BigSidebar"
import { FaTimes } from "react-icons/fa"
import Logo from "./Logo"
import NavLinks from "./NavLinks"
import { useAppContext } from "../context/AppContext"

const BigSidebar = () => {
  const { showSidebar } = useAppContext()
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}
export default BigSidebar