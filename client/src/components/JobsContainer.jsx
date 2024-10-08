import { useEffect } from 'react'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAppContext } from '../context/AppContext'
import Loading from './Loading'
import Job from './Job'
import PageButtonContainer from './PageBtnContainer'

const JobsContainer = () => {
    const { getJobs, jobs, isLoading, page, totalJobs, search, searchStatus, searchType, sort, numOfPages } = useAppContext()

    useEffect(() => {
        getJobs()
    }, [page, search, searchStatus, searchType, sort])
    
    if (isLoading) {
        return <Loading center />
    }

    if (jobs?.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }
  return (
      <Wrapper>
          <h5>{totalJobs} job{jobs?.length > 1 && 's'} </h5>
          <div className="jobs">
              {jobs?.map(job => {
                  return <Job key={job._id} {...job} />
              })}
          </div>
          {numOfPages > 1 && <PageButtonContainer />}
    </Wrapper>
  )
}
export default JobsContainer