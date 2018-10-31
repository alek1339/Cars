import { FETCH_CARS } from './types'
import axios from 'axios'

export const fetchCars = () => dispatch => {
  axios.get('/api/cars/edit-cars')
    .then(res => dispatch({
      type: FETCH_CARS,
      payload: res.data
    }))
    .catch(err => console.log(err)
    )
}
