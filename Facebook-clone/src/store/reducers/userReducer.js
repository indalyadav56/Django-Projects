import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  data: null,
  userData: null,
};

const user = (state, action) => {
  return updateObject(state, {
    data: action.payload,
  });
};
const userData = (state, action) => {
  return updateObject(state, {
    userData: action.payload,
  });
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER:
      return user(state, action);
    case actionType.GET_USER:
      return userData(state, action);
    default:
      return state;
  }
};

export default userReducer;
