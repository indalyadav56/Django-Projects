import * as actionType from "./actionType";
import axios from "axios";
import { API } from "../../server/server";

export const userProfile = (data) => {
  return {
    type: actionType.USER_PROFILE,
    payload: data,
  };
};
export const userProfileData = (data) => {
  return {
    type: actionType.USER_PROFILE_DATA,
    payload: data,
  };
};

export const getProfile = () => {
  return async (dispatch) => {
    await axios
      .get(`${API}/user/profile/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      })
      .then((res) => {
        dispatch(userProfile(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getProfileData = (user_id) => {
  return async (dispatch) => {
    await axios
      .get(`${API}/user/profile/${user_id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      })
      .then((res) => {
        dispatch(userProfileData(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateCoverImage = (image) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("user_bgImage", image);
    await axios
      .put(`${API}/user/profile/`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          dispatch(userProfile(res.data));
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
