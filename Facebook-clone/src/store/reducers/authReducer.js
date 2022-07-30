import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  data: null,
  token: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

const registerSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    error: null,
    loading: false,
    token: null,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return authStart(state, action);

    case actionType.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionType.AUTH_FAIL:
      return authFail(state, action);

    case actionType.AUTH_LOGOUT:
      return authLogout(state, action);

    case actionType.REGISTER_SUCCESS:
      return registerSuccess(state, action);

    default:
      return state;
  }
};

export default authReducer;
