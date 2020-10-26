import { ADD_ADDICTIONS, SET_ADDICTIONS, UPDATE_ADDICTIONS } from "./constants";

const initialState = {
    addictions: [],
  };
  
  export const app = (state = initialState, action) => {
    // if ( === ADD_ADDICTIONS) {
    //     const newAddictions = state.addictions;
    //     newAddictions.push(action.addictions)
    //     return {
    //       ...state,
    //       addictions: newAddictions,
    //     };
    // } else {
    //     return state;
    // }
    switch (action.type) {
        case ADD_ADDICTIONS:
            const newAddictions = [...state.addictions, action.addiction];
            console.log(action.addiction);
            return {
                ...state,
                addictions: newAddictions,
            };

        case UPDATE_ADDICTIONS:
            return state
        case SET_ADDICTIONS:
            return {
                ...state,
                addictions: action.addictions
            }    
        default:
            return state
    }
  };
  