import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import newsReducer from './newsReducer'
import carReducer from './carReducer'
import setCurrentNewsReducer from './setCurrentNewsReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  news: newsReducer,
  cars: carReducer,
  currentNewsId: setCurrentNewsReducer
})
