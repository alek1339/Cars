import { GET_ERRORS } from './types'
import axios from 'axios'

export const addReview = (reviewData) => dispatch => {
  axios
    .post('/api/reviews/add-reviews', reviewData)
    .then(res => console.log('Success Added reviews'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
