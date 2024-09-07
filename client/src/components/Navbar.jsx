import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaCaretDown, FaUserCircle } 
    from "react-icons/fa";
    import { TbLogout } from "react-icons/tb";
import Logo from './Logo';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

const Navbar = () => {
const [showLogout, setShowLogout] = useState(false)

    // global context value
    const {toggleSideBar, user, logoutUser} = useAppContext()
  return (
      <Wrapper>
          <div className="nav-center">
              <button className="toggle-btn" onClick={toggleSideBar}>
              <FaAlignLeft />
              </button>
              <div>
                  <Logo />
                  <h3 className="logo-text">Dashboard</h3>
              </div>
              <div className="btn-container">
                  <button className="btn" onClick={() => setShowLogout(!showLogout)}>
                      <FaUserCircle />
                      {user?.name}
                      <FaCaretDown />
                  </button>
                  <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
                      <button className="dropdown-btn" onClick={logoutUser}>
                          <span>logout
                          <TbLogout /></span>
                      </button>
                  </div>
              </div>
          </div>
    </Wrapper>
  )
}
export default Navbar