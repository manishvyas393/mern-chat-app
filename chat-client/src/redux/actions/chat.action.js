import {
      CHATS_LOADING,
      CHATS_FAILED,
      CHATS_SUCCESS,

      SEARCH_USERS_LOADING,
      SEARCH_USERS_SUCCESS,
      SEARCH_USERS_FAILED,

      CREATE_CHAT_LOADING,
      CREATE_CHAT_SUCCESS,
      CREATE_CHAT_FAILED
} from "../constants/chat.constants"
import Axios from "../../axios"
export const allChatsAction = () => async (dispatch) => {
      try {
            dispatch({ type: CHATS_LOADING })
            const { data } = await Axios.get("/api/chat/allchat")
            console.log(data.chats)
            dispatch({ type: CHATS_SUCCESS, payload: data.chats })
      } catch (error) {
            console.log(error)
            dispatch({ type: CHATS_FAILED, payload: error })
      }
}

export const searchUserAction = (search) => async (dispatch) => {
      try {
            dispatch({ type: SEARCH_USERS_LOADING })
            const { data } = await Axios.get(`/api/chat/searchusers?search=${search}`)
            dispatch({ type: SEARCH_USERS_SUCCESS, payload: data.users })
      } catch (error) {
            console.log(error)
            dispatch({ type: SEARCH_USERS_FAILED, payload: error })
      }
}

export const createChatAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: CREATE_CHAT_LOADING })
            const { data } = await Axios.post(`/api/chat/newchat/${id}`)
            console.log(data)
            dispatch({ type: CREATE_CHAT_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: CREATE_CHAT_FAILED, payload: error })
      }
}