import axios from 'axios'
import {
    REGISTER_USER, REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN_USER, LOGIN_FAIL, LOGIN_SUCCESS, GET_PROFILE_USER,
    GET_PROFILE_SUCCESS, GET_PROFILE_FAIL, LOGOUT
} from '../const/actionTypes'


export const register = (newUser) => async dispatch => {
    // newUser = {email,name,lastName,password}
    dispatch({
        type: REGISTER_USER
    })
    try {
        const { data } = await axios.post('/api/auth/register', newUser);
        localStorage.setItem("token", data.token)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: { err: error.response.data, id: "register" }
        });
        //  alert(error.response.data[0].msg)
    }
}

export const login = (User) => async dispatch => {
    // User = {email,password}
    dispatch({
        type: LOGIN_USER
    })
    try {
        const { data } = await axios.post('/api/auth/login', User);
        localStorage.setItem("token", data.token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: { err: error.response.data, id: "login" }
        });
        // alert(error.response.data[0].msg)
    }
}

export const getProfile = () => async dispatch => {
    // User = {email,password}
    dispatch({
        type: GET_PROFILE_USER
    })
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: token
            }
        }
        console.log(config)
        const { data } = await axios.get('/api/auth/current_user', config)
        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_PROFILE_FAIL,
            payload: error.response.data
        })
    }
};
export const logout = () => dispatch => {
    localStorage.removeItem("token")
    dispatch({
        type: LOGOUT
    })
}


