import {
      MESSAGES_FAILED,
      MESSAGES_LOADING,
      MESSAGES_SUCCESS,

      SEND_MESSAGE_LOADING,
      SEND_MESSAGE_SUCCESS,
      SEND_MESSAGE_FAILED
} from "../constants/messages.constants"
import Axios from "../../axios/index"

export const fetchAllmessagesAction = (chatId) => async (dispatch) => {
      try {
            dispatch({ type: MESSAGES_LOADING })
            const { data } = await Axios.get(`/api/messages/allmessages/${chatId}`)
            dispatch({ type: MESSAGES_SUCCESS, payload: data, chatId })
      } catch (error) {
            dispatch({ type: MESSAGES_FAILED, payload: error })
      }
}
export const sendMessageAction = (id, msg) => async (dispatch) => {
      try {
            dispatch({ type: SEND_MESSAGE_LOADING })
            const { data } = await Axios.post(`/api/messages/newmessage/${id}`, { msg })
            console.log(data)
            dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data.newMessage })
            return data.newMessage
      } catch (error) {
            dispatch({ type: SEND_MESSAGE_FAILED, payload: error })
      }
}