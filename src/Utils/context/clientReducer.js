import { db } from '../../firebase-config.js'

import {
    SEND_CALL_REQUEST,
    SEND_POINTS
} from './types'
  
const clientReducer = (state, action) => {
    switch (action.type) {
        case SEND_CALL_REQUEST:
            return {
                ...state,
                room: action.data,

            }
        case SEND_POINTS:
            return {
                ...state,
                currentSong: action.data,
                playing: true
            }
        default:
            return state
    }
}

export default clientReducer;