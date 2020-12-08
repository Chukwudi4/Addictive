import {
  ADD_ADDICTIONS,
  SET_ADDICTIONS,
  UPDATE_ADDICTIONS,
  SET_USER,
} from './constants';

export const addAddictions = (addiction) => ({
  type: ADD_ADDICTIONS,
  addiction,
});

export const updateAddictions = (index) => ({
  type: UPDATE_ADDICTIONS,
  index,
});

export const setAddictions = (addictions) => ({
  type: SET_ADDICTIONS,
  addictions,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});
