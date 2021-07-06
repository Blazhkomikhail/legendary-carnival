import { AnyAction, Reducer } from 'redux';

const modeReducer: Reducer = (state = 'TRAIN', action: AnyAction) => {
  switch (action.type) {
    case 'TRAIN':
      return 'GAME';

    case 'GAME':
      return 'TRAIN';

    default:
      return state;
  }
};

export default modeReducer;
