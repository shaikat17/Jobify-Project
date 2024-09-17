import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa"
import { useAppContext } from "../context/AppContext"
import Wrapper from "../assets/wrappers/StatsContainer"
import StatsItem from "./StatsItem"

const StatsContainer = () => {
    
    const { stats } = useAppContext()

    const defaultStats = [
        {
            title: 'pending application',
            count: stats?.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: '#e9b949',
            bcg: '#fcefc7'
        },
        {
            title: 'interview scheduled',
            count: stats?.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8fc'
        },
        {
            title: 'jobs declined',
            count: stats?.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee'
        }
    ]
  return (
      <Wrapper>
          {defaultStats?.map((item, index) => {
              return <StatsItem key={index} {...item} />
          })}
    </Wrapper>
  )
}
export default StatsContainer