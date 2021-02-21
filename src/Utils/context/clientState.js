import React, { useReducer } from 'react';
import clientContext from './clientContext';
import clientReducer from './clientReducer';

import {
  SEND_CALL_REQUEST,
  SEND_POINTS
} from './types'

const ClientState = props => {
  const initialState = {
    user: {
        "id": "",
        "email": "",
        "level": 0,
        "name": "",
        "points": 0,
        "quest": [],
        "type": ""
    },
    rooms:{
        "id": "",
        "description": "",
        "name": "",
        "studentsIds": [],
        "teacherId": ""
    },
    quests: {
        "id": "",
        "creatorId": "",
        "description": "",
        "name": "",
        "reward": {
            "type": "",
            "description": "",
            "points": 0
        },
        "roomId": ""
    }
  }

  const [state, dispatch] = useReducer(clientReducer, initialState);

  
  const sendCallRequest = () => dispatch({ type: SEND_CALL_REQUEST, data: nuestros_id })
  
  const sendPoints = id => dispatch({ type: SEND_POINTS, data: state.user })


  return <clientContext.Provider
    value={{
      user: state.user,
      rooms: state.rooms,
      quests: state.quest,
      sendCallRequest,
      sendPoints
    }}>

    {props.children}

  </clientContext.Provider>
}

export default ClientState;

