import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import newsReducer from './newsReducer'
import carReducer from './carReducer'
import reviewsReducer from './reviewsReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  news: newsReducer,
  cars: carReducer,
  reviews: reviewsReducer
})
