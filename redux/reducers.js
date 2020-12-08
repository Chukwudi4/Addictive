import {
  ADD_ADDICTIONS,
  SET_ADDICTIONS,
  UPDATE_ADDICTIONS,
  SET_USER,
} from './constants';

const initialState = {
  addictions: [],
  user: {},
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDICTIONS:
      const newAddictions = [...state.addictions, action.addiction];
      console.log(action.addiction);
      return {
        ...state,
        addictions: newAddictions,
      };
    case SET_USER:
      console.log(action.user);
      return {
        ...state,
        user: action.user,
      };
    case UPDATE_ADDICTIONS:
      return state;
    case SET_ADDICTIONS:
      return {
        ...state,
        addictions: action.addictions,
      };
    default:
      return state;
  }
};
