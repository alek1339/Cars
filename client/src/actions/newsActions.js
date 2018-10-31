import { FETCH_NEWS } from './types'
import axios from 'axios'

export const fetchNews = () => dispatch => {
  axios.get('/api/news/')
    .then(res => dispatch({
      type: FETCH_NEWS,
      payload: res.data
    }))
    .catch(err => console.log(err)
    )
}
