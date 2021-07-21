import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import LoginReducer from './reducers/LoginReducer'
import MentorReducer from './reducers/MentorReducer'
import MessageReducer from './reducers/MessageReducer'

const store = createStore(
  combineReducers({
    loginState: LoginReducer,
    mentorState: MentorReducer,
    messageState: MessageReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
