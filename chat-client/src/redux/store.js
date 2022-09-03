import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import { userReducer } from "./reducers/user.reducers";
import { chatsReducer, createChatReducer, searchUserReducer } from "./reducers/chat.reducer";
import { messagesReducer, sendMessageReducer } from "./reducers/messages.reducer";
const reducer = combineReducers({
      user: userReducer,
      chats: chatsReducer,
      users: searchUserReducer,
      newChat: createChatReducer,
      messages: messagesReducer,
      send:sendMessageReducer
})
const middleware = [thunk]
let initialState={}
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store