import { FETCH_CARS } from '../actions/types'

const initialState =
    [{
      make: '',
      model: '',
      year: '',
      engine: '',
      hp: '',
      mpg: '',
      realMpg: '',
      carClassification: '',
      averagRepairCosts: '',
      averageYearRepairs: ''
    }]

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CARS:
      return action.payload
    default:
      return state
  }
}
