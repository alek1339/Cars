import { FETCH_CARS } from '../actions/types'

const initial = []

const initialState =
{
  make: '',
  model: '',
  year: '',
  engine: '',
  hp: '',
  mpg: '',
  realMpg: '',
  carClassification: '',
  averagRepairCosts: '',
  reliability: '',
  imgUrl: ''
}

initial.push(initialState)
initial.push(initialState)
initial.push(initialState)
initial.push(initialState)

export default function (state = initial, action) {
  switch (action.type) {
    case FETCH_CARS:
      return action.payload
    default:
      return state
  }
}
