import * as actionTypes from "./types";
import axios from "axios"
import setAuthToken from "../../utils/setAuthToken"


//Register
export const asyncRegisterUser = (username, email, password) => {
    return async dispatch => {
        if (localStorage.token){
            setAuthToken(localStorage.token)
        }

        const request = {
            username,
            email,
            password,
            portal: "mafia",
            role: "USER"
        }

        try {
            const response = await axios.post('https://users.sammyshehter.com/registration', request)
            console.log("response.data",response.data)
            dispatch(registerSuccess(response.data.token))
            dispatch(asyncLoadUser())
        } catch (error) {
            dispatch(failRegister(error.message))
        }
    }
};

export const registerSuccess = (data) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload: data
    }
};

export const failRegister = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        payload: error
    }
};


//Load User
export const asyncLoadUser = () => {
    return async dispatch => {
        try {
            const response = await axios.get('https://users.sammyshehter.com/loadUser')
            dispatch(loadSuccess(response.data))
        } catch (error) {
            dispatch(failLoad(error.message))
        }
    }
};

export const loadSuccess = (data) => {
    return {
        type: actionTypes.USER_LOADED,
        payload: data
    }
};

export const failLoad = (error) => {
    return {
        type: actionTypes.USER_LOADED_FAIL,
        payload: error
    }
};


//Login User
export const login = (username,password) => {

    return async dispatch => {
        if (localStorage.token){
            setAuthToken(localStorage.token)
        }

        const request = {
            username,
            password
        }
        console.log(request)

        try {
            const response = await axios.post('https://users.sammyshehter.com/login', request)
            console.log("response.data",response.data)
            dispatch(loginSuccess(response.data.token))
            dispatch(asyncLoadUser())
        } catch (error) {
            dispatch(loginFail(error.message))
        }
    }
};

export const loginSuccess = (data) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: data
    }
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        payload: error
    }
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    }
};
