import {
    REGISTER_USER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_USER,
    USER_LOADED,
    USER_LOADED_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    LOGOUT
} from "../actions/types";

const initialSettingsState = {
    token:localStorage.getItem("token"),
    isAuthenticated:false,
    loading:false,
    user:null,
    error:null
}

const auth = (state = initialSettingsState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token",action.payload)
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                token: action.payload
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem("token")
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null,
                error: action.payload
            };
        case LOGIN_USER:
            return {
                ...state,
            }
        default:
            return state
    }
}

export default auth
