import { AnyAction, Reducer } from 'redux'

const modeReducer: Reducer = (state = 'TRAIN', action: AnyAction) => {
  switch(action.type) {
    case 'TRAIN': 
      return state = 'GAME';

    case 'GAME': 
      return state = 'TRAIN';

    default: 
      return state;
  }
}

export default modeReducer;