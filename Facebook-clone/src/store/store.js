import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import Thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(Thunk))
);

export default store;
