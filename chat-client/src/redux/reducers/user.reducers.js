import {
      SIGN_UP_FAILED,
      SIGN_UP_LOADING,
      SIGN_UP_SUCCESS,

      LOGIN_LOADING,
      LOGIN_SUCCESS,
      LOGIN_FAILED,

      USER_PROFILE_LOADING,
      USER_PROFILE_SUCCESS,
      USER_PROFILE_FAILED,
      LOGOUT_LOADING,
      LOGOUT_SUCCESS,
      LOGOUT_FAILED,
      LOGOUT_RESET
} from "../constants/user.constants"
let initialState = {
      user: null,
      loading: null,
      error: null,
      loggedOut:false,
}
export const userReducer = (state = initialState, action) => {
      const { type, payload } = action
      switch (type) {
            case SIGN_UP_LOADING:
            case LOGIN_LOADING:
            case USER_PROFILE_LOADING:
                  return {
                        ...state,
                        loading: true
                  }
            case SIGN_UP_SUCCESS:
            case LOGIN_SUCCESS:
            case USER_PROFILE_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        user: payload
                  }
            case SIGN_UP_FAILED:
            case LOGIN_FAILED:
            case USER_PROFILE_FAILED:
                  return {
                        ...state,
                        error: payload
                  }
            case LOGOUT_SUCCESS:
                  return {
                        ...state,
                        user: null,
                        loading: null,
                        error: null,
                        msg:payload,
                        loggedOut: true,
                  }
            case LOGOUT_FAILED:
                  return {
                        ...state,
                        error:payload
                  }
            case LOGOUT_RESET:
                  return {
                        ...state,
                        user: null,
                        msg: null,
                        loggedOut:null
                  }
            default:
                  return state
      }
}