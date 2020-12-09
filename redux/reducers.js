import { saveEntriesOnLocalDB } from '../src/api/localStorage';
import {
  ADD_ADDICTIONS,
  SET_ADDICTIONS,
  UPDATE_ADDICTIONS,
  SET_USER,
  SAVE_ENTRY,
  EDIT_ENTRY,
  SET_ENTRIES,
} from './constants';

const initialState = {
  addictions: [],
  user: {},
  entries: [],
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
    case SAVE_ENTRY:
      const tempEntries = [...state.entries];
      tempEntries.push(action.entry);
      return {
        ...state,
        entries: tempEntries,
      };
    case EDIT_ENTRY:
      const newEntries = [...state.entries];
      console.log(action.index);
      // Object.assign()
      newEntries[action.index] = action.entry;
      return {
        ...state,
        entries: newEntries,
      };
    case SET_ENTRIES:
      return {
        ...state,
        entries: action.entries,
      };
    default:
      return state;
  }
};
