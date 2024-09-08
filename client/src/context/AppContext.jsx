import { useReducer, useContext, createContext } from 'react';
import axios from 'axios'

import reducer from './reducer';
import { CLEAR_ALERT, DISPLAY_ALERT, LOGOUT_USER, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS, TOGGLE_SIDEBAR, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from './actions';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const location = localStorage.getItem('location')


export const initialState = {
  isLoading: false,
  showAlert: true,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: location || '',
  jobLocation: location || '',
  showSidebar: false,
};


const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: 'http://localhost:5000/api/v1'
  })

  // axios request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // axios response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error);
    }
  );

    // functions
    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT
            })
        }, 3000);
    }
  
  // local storage functionality
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }


  // Register and login user functionality
  const setUpUser = async ({currentUser, endPoint, alertText}) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const {data} = await axios.post(`http://localhost:5000/api/v1/auth/${endPoint}`, currentUser)
      
      const { user, token, location } = data
      
      dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token, alertText } })
      
      // local storage
      addUserToLocalStorage({user, token, location: user?.location})
    } catch (error) {
      console.log(error.response)
      dispatch({type: SETUP_USER_ERROR, payload: {msg: error.response.data.msg}})
    }
    clearAlert()
  }

  // user logout functionality
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  // Side bar toggle functionality
  const toggleSideBar = () => {
    dispatch({ type: TOGGLE_SIDEBAR})
  }

  // Update user
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    
    try {
      const { data } = await authFetch.patch('/auth/update', currentUser)

      const { user, location, token } = data

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location, token } })
      
      addUserToLocalStorage({ user, token, location})
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert()
  }

  return (
    <AppContext.Provider
      value={{
              ...state,
        displayAlert,
        setUpUser,
        toggleSideBar,
        logoutUser,
        updateUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };