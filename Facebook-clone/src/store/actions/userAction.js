import * as actionType from "./actionType";
import axios from "axios";
import { API } from "../../server/server";

export const user = (data) => {
  return {
    type: actionType.USER,
    payload: data,
  };
};
export const userData = (data) => {
  return {
    type: actionType.GET_USER,
    payload: data,
  };
};

export const getUser = () => {
  return async (dispatch) => {
    await axios
      .get(`${API}/account/all/user/`)
      .then((res) => {
        dispatch(user(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getUserData = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${API}/account/all/user/${id}`)
      .then((res) => {
        dispatch(userData(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
