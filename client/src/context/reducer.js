import { CLEAR_ALERT, DISPLAY_ALERT, LOGOUT_USER, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS, TOGGLE_SIDEBAR, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from "./actions"
import { initialState } from "./AppContext"

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values.'
        }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: ''
        }
    }
    if (action.type === SETUP_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.user.location,
            jobLocation: action.payload.user.location,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText
        }
    }
    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            showAlert: true,
            isLoading: false,
            alertType: 'danger',
            alertText: action.payload.msg
        }
        
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return {...state, showSidebar: !state.showSidebar}
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: null,
            jobLocation: null
        }
    }
    if (action.type === UPDATE_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.user.location,
            jobLocation: action.payload.user.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated'
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            showAlert: true,
            isLoading: false,
            alertType: 'danger',
            alertText: action.payload.msg
        }
        
    }
    
    throw new Error(`No such action: ${action.type}`)
}

export default reducer