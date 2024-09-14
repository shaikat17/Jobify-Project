import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/AppContext'
import {Alert, InputFrom} from '../../components'
import InputSelectForm from '../../components/InputSelectForm'

const AddJob = () => {

  const { isEditing, showAlert, displayAlert, position, company, jobLocation, isLoading, jobType, jobTypeOptions, status, statusOptions, handleChange, clearValues, createJob, editJob } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || !jobLocation) {
      
      displayAlert()
      return;
    }
    if (isEditing) {
      editJob()
      return
    }
    
    createJob()
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    handleChange({name, value})
  }
  return (
    <Wrapper className=''>
      <form className="form">
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        {showAlert && <Alert />}
        
        <div className="form-center">
          {/* position */}
        <InputFrom
          type={'text'}
          name={'position'}
          value={position}
          handleChange={handleJobInput}
          labelText={'Position'} />
        
        {/* company */}
        <InputFrom
          type={'text'}
          name={'company'}
          value={company}
          handleChange={handleJobInput}
          labelText={'Company'} />
          
          {/* location */}
          <InputFrom
          type={'text'}
          name={'jobLocation'}
          value={jobLocation}
          handleChange={handleJobInput}
            labelText={'location'} />
          
          {/* job type */}
          <InputSelectForm name={'status'}
            value={status}
            handleChange={handleJobInput}
          list={statusOptions}/>

          {/* job status */}
          <InputSelectForm labelText={'type'}
            name={'jobType'}
            value={jobType}
            handleChange={handleJobInput}
          list={jobTypeOptions}/>

          <div className="btn-container">
            <button className="btn btn-block submit-btn"
              type='submit'
              onClick={handleSubmit} disabled={isLoading}>
              
submit
            </button>
            <button
      className='btn btn-block clear-btn'
      onClick={(e) => {
        e.preventDefault();
        clearValues();
      }}
    >
      clear
    </button>
          </div>
        </div>

      </form>
    </Wrapper>
  )
}
export default AddJob