import { GET_ERRORS } from './types'
import axios from 'axios'

export const addCar = (carData) => dispatch => {
  console.log(carData)
  axios
    .post('/api/cars/add-car', carData)
    .then(res => console.log('Success Added cars'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
