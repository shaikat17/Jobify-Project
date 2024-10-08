import { useReducer, useContext, createContext, useEffect } from 'react';
import axios from 'axios'

import reducer from './reducer';
import { CHANGE_PAGE, CLEAR_ALERT, CLEAR_FILTERS, CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_ERROR, CREATE_JOB_SUCCESS, DELETE_JOB_BEGIN, DELETE_JOB_ERROR, DISPLAY_ALERT, EDIT_JOB_BEGIN, EDIT_JOB_ERROR, EDIT_JOB_SUCCESS, GET_JOBS_BEGIN, GET_JOBS_SUCCESS, HANDLE_CHANGE, LOGOUT_USER, SET_EDIT_JOB, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, TOGGLE_SIDEBAR, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from './actions';

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
  isEditing: false,
  editJobId: '',
  company: '',
  position: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
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

  // handle change
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: {name, value}
    })
  }

  // clear field values
  const clearValues = () => {
    dispatch({type: CLEAR_VALUES})
  }

  // create job function
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })
    try {
      const { position, company, jobLocation, jobType, status } = state
      
      await authFetch.post('/jobs', {
        company,
        position,
        jobLocation,
        jobType,
        status
      })

      dispatch({ type: CREATE_JOB_SUCCESS })
      
      dispatch({ type: CLEAR_VALUES})
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({ type: CREATE_JOB_ERROR, payload: { msg: error.response.data.msg }})
    }
    clearAlert()
  }

  // get job functionality
  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`

    if (search) {
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_JOBS_BEGIN })
    
    try {
      const { data } = await authFetch(url)
      const { jobs, totalJobs, numOfPages } = data

      dispatch({
        type: GET_JOBS_SUCCESS, payload: {
        jobs, totalJobs, numOfPages
      }})
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  useEffect(() => {
    getJobs()
  }, [])
  
  // edit and delete job function
  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } })
  }

  const deleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN })

    try {
      await authFetch.delete(`/jobs/${id}`)
      getJobs()
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response.data.msg}
      })
    }
    clearAlert()
  }

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN })
    
    try {
      const { position, company, jobLocation, jobType, status } = state

      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company, position, jobLocation, jobType, status
      })

      dispatch({ type: EDIT_JOB_SUCCESS})
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({
          type: EDIT_JOB_ERROR,
          payload: { msg: error.response.data.msg}
        })
      }
    }
    clearAlert()
  }

  // show stats function
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })

    try {
      const { data } = await authFetch('/jobs/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications
        }
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  // clear filters
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  // pagination function
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }

  return (
    <AppContext.Provider
      value={{
              ...state,
        displayAlert,
        setUpUser,
        toggleSideBar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
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