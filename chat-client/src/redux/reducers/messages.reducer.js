import {
      MESSAGES_FAILED,
      MESSAGES_LOADING,
      MESSAGES_SUCCESS,

      SEND_MESSAGE_LOADING,
      SEND_MESSAGE_FAILED,
      SEND_MESSAGE_SUCCESS,
      UPDATE_MESSAGES
} from "../constants/messages.constants"

let initialState = {
      messages: [],
      error: null,
      loading: null,
      selectedChat: null
}
export const messagesReducer = (state = initialState, action) => {
      const { type, payload, chatId } = action
      switch (type) {
            case MESSAGES_LOADING:
                  return {
                        ...state,
                        loading: true,
                  }
            case MESSAGES_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        messages: payload,
                        selectedChat: chatId
                  }
            case UPDATE_MESSAGES:
                  return {
                        ...state,
                        messages:[...state.messages,payload]
                  }
            case MESSAGES_FAILED:
                  return {
                        ...state,
                        error: payload
                  }
            default:
                  return state
      }
}
export const sendMessageReducer = (state = { msg: {} }, action) => {
      const { type, payload } = action
      switch (type) {
            case SEND_MESSAGE_LOADING:
                  return {
                        ...state,
                        loading: true,
                  }
            case SEND_MESSAGE_SUCCESS:
                  return {
                        ...state,
                        loading: false,
                        msg: payload,
                  }
            case SEND_MESSAGE_FAILED:
                  return {
                        ...state,
                        error: payload
                  }
            default:
                  return state
      }
}