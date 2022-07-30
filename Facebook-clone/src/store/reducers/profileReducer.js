import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  data: null,
  profileData: null,
};

const userProfile = (state, action) => {
  return updateObject(state, {
    data: action.payload,
  });
};
const userProfileData = (state, action) => {
  return updateObject(state, {
    profileData: action.payload,
  });
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_PROFILE:
      return userProfile(state, action);
    case actionType.USER_PROFILE_DATA:
      return userProfileData(state, action);
    default:
      return state;
  }
};

export default profileReducer;
