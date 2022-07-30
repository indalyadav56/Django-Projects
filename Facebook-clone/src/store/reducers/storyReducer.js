import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  data: [],
};

const getStory = (state, action) => {
  return updateObject(state, {
    data: action.payload,
  });
};
const createPost = (state, action) => {
  return updateObject(state, {
    data: action.payload,
  });
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_STORY:
      return getStory(state, action);

    default:
      return state;
  }
};

export default postReducer;
