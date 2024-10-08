import { useEffect } from "react"
import { ChartsContainer, StatsContainer, Loading } from "../../components"
import { useAppContext } from "../../context/AppContext"

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext()

  useEffect(() => {
    showStats()
  }, [])
  
  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications?.length > 0 && <ChartsContainer />}
    </>
  )
}
export default Stats