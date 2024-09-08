import { useState } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/AppContext'
import { Alert, InputFrom } from '../../components'

const Profile = () => {
  // Global values
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()
  
  const userInformation = {
    name: user?.name,
    email: user?.email,
    lastName: user?.lastName,
    location: user?.location
  }

  const [values, setValues] = useState(userInformation);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, email, lastName, location } = values;

    // checking if the input field are empty or not
    if (!email || !name || !lastName || !location) {
      displayAlert();
      return;
    }

    updateUser({name, email, lastName, location})
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className="form-center">
          <InputFrom type="text" labelText="name" name='name' value={userInformation.name} handleChange={handleChange} />

          <InputFrom type="text" labelText="last name" name='lastName' value={userInformation.lastName} handleChange={handleChange} />
          <InputFrom type="email" labelText="email" name='email' value={userInformation.email} handleChange={handleChange} />

          <InputFrom type="text" labelText="location" name='location' value={userInformation.location} handleChange={handleChange} />

          <button className="btn btn-block" type='submit' disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? 'Please Wait...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default Profile