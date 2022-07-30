import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import storyReducer from "./storyReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
  user: userReducer,
  story: storyReducer,
});

export default rootReducer;
