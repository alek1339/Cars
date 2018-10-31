import { SET_CURRENT_NEWS } from './types'

export function setCurrentNews(id) {
    return {
        type: SET_CURRENT_NEWS,
        payload: id
    }
}
