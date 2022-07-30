import * as actionType from "./actionType";
import axios from "axios";
import { API } from "../../server/server";

export const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const authFail = (error) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionType.AUTH_SUCCESS,
    token: token,
  };
};

export const authLogin = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${API}/token/`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);
          const token = localStorage.getItem("access");
          dispatch(authSuccess(token));
          window.location.replace("/");
        }
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const registerSuccess = (data) => {
  return {
    type: actionType.REGISTER_SUCCESS,
    data: data,
  };
};

export const createUser = (username, email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${API}/account/user/create/`, {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          dispatch(registerSuccess(response.data));
          window.location.replace("/login");
        }
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  return {
    type: actionType.AUTH_LOGOUT,
  };
};
