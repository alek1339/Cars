import { GET_ERRORS, FETCH_COMMENTS } from './types'
import axios from 'axios'

export const addComments = (commentData) => dispatch => {
  console.log(commentData)
  axios
    .post('/api/comments/add-comments', commentData)
    .then(res => console.log('Sucess added comment'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const fetchComments = () => dispatch => {
  axios.get('/api/comments')
    .then(res => dispatch({
      type: FETCH_COMMENTS,
      payload: res.data
    }))
    .catch(err => console.log(err))
}
