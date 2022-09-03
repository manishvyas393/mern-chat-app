import {
      CHATS_LOADING,
      CHATS_FAILED,
      CHATS_SUCCESS,

      SEARCH_USERS_LOADING,
      SEARCH_USERS_SUCCESS,
      SEARCH_USERS_FAILED,
      SEARCH_USERS_RESET,

      CREATE_CHAT_LOADING,
      CREATE_CHAT_SUCCESS,
      CREATE_CHAT_FAILED,
      CREATE_CHAT_RESET,
} from "../constants/chat.constants"

let initialState = {
      chats: [],
      error: null,
      loading: null,
      created: null
}
export const chatsReducer = (state = initialState, action) => {
      const { type, payload } = action
      switch (type) {
            case CHATS_LOADING:
                  return {
                        ...state,
                        loading: true
                  }
            case CHATS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        chats: payload
                  }
            case CHATS_FAILED:
                  return {
                        ...state,
                        error: payload
                  }
            default:
                  return state
      }
}
export const createChatReducer = (state = {}, action) => {
      const { type, payload } = action
      switch (type) {
            case CREATE_CHAT_LOADING:
                  return {
                        ...state,
                        loading: true,
                        done: false,
                  }
            case CREATE_CHAT_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        msg: payload.msg,
                        chat: payload.chat,
                        done: payload.msg ? false : true
                  }
            case CREATE_CHAT_FAILED:
                  return {
                        ...state,
                        error: payload
                  }
            case CREATE_CHAT_RESET:
                  return {
                        ...state,
                        error: null,
                        loading: null,
                        msg: null,
                        chat: {},
                        done: null
                  }
            default:
                  return state
      }
}
export const searchUserReducer = (state = { users: [] }, action) => {
      const { type, payload } = action
      switch (type) {
            case SEARCH_USERS_LOADING:
                  return {
                        ...state,
                        loading: true
                  }
            case SEARCH_USERS_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        users: payload
                  }
            case SEARCH_USERS_FAILED:
                  return {
                        ...state,
                        error: payload
                  }
            case SEARCH_USERS_RESET:
                  return {
                        ...state,
                        users: []
                  }
            default:
                  return state
      }
}