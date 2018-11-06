import { FETCH_REVIEWS } from './types'
import axios from 'axios'

export const fetchReviews = () => dispatch => {
  axios.get('/api/reviews/')
    .then(res => dispatch({
      type: FETCH_REVIEWS,
      payload: res.data
    }))
    .catch(err => console.log(err)
    )
}
