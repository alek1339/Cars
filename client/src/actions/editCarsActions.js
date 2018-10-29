import { GET_ERRORS } from './types'
import axios from 'axios'

export const editCars = (carData) => dispatch => {
  axios
    .post('/api/cars/edit-cars', carData)
    .then(res => console.log('Success Edited car'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const deleteCar = () => {
  axios
    .post('/api/cars/edit-cars/delete')
    .then(res => console.log('Car is deleted'))
}
