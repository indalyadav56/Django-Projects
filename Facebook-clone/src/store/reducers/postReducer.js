import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  data: [],
  postData: null,
  likeData: null,
};

const registerSuccess = (state, action) => {
  return updateObject(state, {
    data: action.payload,
  });
};
const createPost = (state, action) => {
  return updateObject(state, {
    data: action.payload,
  });
};
const getPostData = (state, action) => {
  return updateObject(state, {
    postData: action.payload,
  });
};
const getLikeData = (state, action) => {
  return updateObject(state, {
    likeData: action.payload,
  });
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_POST:
      return registerSuccess(state, action);
    case actionType.USER_POST_DATA:
      return getPostData(state, action);
    case actionType.CREATE_USER_POST:
      return createPost(state, action);
    case actionType.GET_LIKE:
      return getLikeData(state, action);
    default:
      return state;
  }
};

export default postReducer;
