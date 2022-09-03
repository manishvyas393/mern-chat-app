import {
      SIGN_UP_FAILED,
      SIGN_UP_LOADING,
      SIGN_UP_SUCCESS,

      LOGIN_LOADING,
      LOGIN_SUCCESS,
      LOGIN_FAILED,

      USER_PROFILE_FAILED,
      USER_PROFILE_LOADING,
      USER_PROFILE_SUCCESS,
      LOGOUT_SUCCESS,
      LOGOUT_FAILED
} from "../constants/user.constants"
import Axios from "../../axios"
export const userSignUpAction = (email, name, password) => async (dispatch) => {
      try {
            dispatch({ type: SIGN_UP_LOADING })
            const { data } = await Axios.post("/api/auth/signup", { email, password, name })
            localStorage.setItem("user", JSON.stringify(data._id))
            dispatch({ type: SIGN_UP_SUCCESS, payload: data })
      } catch (error) {
            console.log(error)
            dispatch({ type: SIGN_UP_FAILED, payload: error })
      }
}
export const userLoginAction = (email, password) => async (dispatch) => {
      try {
            dispatch({ type: LOGIN_LOADING })
            const { data } = await Axios.post("/api/auth/login", { email, password })
            localStorage.setItem("user", JSON.stringify(data._id))
            dispatch({ type: LOGIN_SUCCESS, payload: data })
      } catch (error) {
            console.log(error)
            dispatch({ type: LOGIN_FAILED, payload: error })
      }
}
export const userProfileAction = () => async (dispatch) => {
      try {
            dispatch({ type: USER_PROFILE_LOADING })
            const { data } = await Axios.get("/api/auth/getprofile")
            localStorage.setItem("user", JSON.stringify(data._id))
            dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: USER_PROFILE_FAILED, payload: error })
            localStorage.clear()
      }
}
export const userLogOutAction = () => async (dispatch) => {
      try {
            const { data } = await Axios.post("/api/auth/logout")
            console.log(data)
            dispatch({ type: LOGOUT_SUCCESS, payload: data.msg })
            localStorage.clear()
      } catch (error) {
            dispatch({ type: LOGOUT_FAILED, payload: error })
           
      }
}