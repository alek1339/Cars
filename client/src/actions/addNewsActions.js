import { GET_ERRORS } from './types'
import axios from 'axios'

export const addNews = (newsData) => dispatch => {
  axios
    .post('/api/news/add-news', newsData)
    .then(res => console.log('Success Added news'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
