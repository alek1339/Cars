import { FETCH_NEWS } from '../actions/types'

const initial = { header: '', text: '', author: '', imgUrl: '' }
const initialState = []
initialState.push(initial)
initialState.push(initial)
initialState.push(initial)
initialState.push(initial)

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS:
      return action.payload
    default:
      return state
  }
}
