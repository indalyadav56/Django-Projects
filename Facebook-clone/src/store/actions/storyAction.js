import * as actionType from "./actionType";
import axios from "axios";
import { API } from "../../server/server";

export const userStory = (data) => {
  return {
    type: actionType.GET_STORY,
    payload: data,
  };
};

export const getStory = () => {
  return async (dispatch) => {
    await axios
      .get(`${API}/user/stories/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      })
      .then((res) => {
        dispatch(userStory(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createUserStory = (data) => {
  return {
    type: actionType.CREATE_STORY,
    payload: data,
  };
};

export const createStory = (formData) => {
  return async (dispatch) => {
    await axios
      .post(`${API}/user/stories/`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          dispatch(getStory());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
