import { GET_ERRORS } from './types'
import axios from 'axios'

export const editReviews = (reviewsData) => dispatch => {
  axios
    .post('/api/reviews/edit-reviews', reviewsData)
    .then(res => console.log('Success Edited reviews'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
