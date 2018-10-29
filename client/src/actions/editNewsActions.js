import { GET_ERRORS } from './types'
import axios from 'axios'

export const editNews = (newsData) => dispatch => {
  axios
    .post('/api/news/edit-news', newsData)
    .then(res => console.log('Success Edited news'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
