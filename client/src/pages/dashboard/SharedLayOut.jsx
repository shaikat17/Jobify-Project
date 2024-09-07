import { Link, Outlet } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"

const SharedLayOut = () => {
  return (
      <Wrapper>
          <nav>
              <Link to='all-jobs'>all jobs</Link>
          </nav>
          <Outlet />
      </Wrapper>
  )
}
export default SharedLayOut