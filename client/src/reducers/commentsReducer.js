import { FETCH_COMMENTS } from '../actions/types'

const initialState = [{ author: '', text: '', authorId: '', newsId: '' }]

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload
    default:
      return state
  }
}
